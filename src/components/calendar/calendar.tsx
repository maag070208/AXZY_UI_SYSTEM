import React, { useMemo, useState, useEffect } from 'react';
import {
  format,
  addDays,
  startOfWeek,
  eachDayOfInterval,
  endOfWeek,
  isSameDay,
  isToday,
  startOfDay,
  parseISO,
  differenceInMinutes,
  addMinutes,
  startOfMonth,
  endOfMonth,
  addMonths,
  isSameMonth,
  isBefore,
  isAfter
} from 'date-fns';
import { es } from 'date-fns/locale';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ITCalendarProps, CalendarEvent } from './calendar.props';
import ITText from "@/components/text/text";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ----------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------

const START_HOUR = 6; // 6 AM
const END_HOUR = 22; // 10 PM
const HOURS_COUNT = END_HOUR - START_HOUR;

// Generate time slots
const TIME_SLOTS = Array.from({ length: HOURS_COUNT + 1 }, (_, i) => START_HOUR + i);

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

export const ITCalendar: React.FC<ITCalendarProps> = ({
  events = [],
  mode: modeProp,
  onEventClick,
  onSlotClick,
  onSlotHover,
  onSelectRange,
  value,
  onChange,
  selectionMode = 'single',
  startDate,
  endDate,
  minDate,
  maxDate,
  className,
  variant = 'primary',
}) => {
  // Determine mode: if onChange provided, assume picker (month) unless specialized
  const mode = modeProp || (onChange ? 'month' : 'week');
  
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [view, setView] = useState<'calendar' | 'years'>('calendar');

  // Selection/Accent colors based on variant
  const getVariantStyles = () => {
    const v = variant || 'primary';
    return {
      '--calendar-selected-bg': `var(--color-${v})`,
      '--calendar-range-bg': `var(--color-${v}-50)`,
      '--calendar-today-bg': `var(--color-${v}-100)`,
      '--calendar-today-text': `var(--color-${v})`,
    } as React.CSSProperties;
  };

  // Sync internal state if value changes (for picker)
  useEffect(() => {
    if (value) setCurrentDate(value);
  }, [value]);

  // Navigation handlers
  const handleNext = () => {
    if (view === 'years') {
      setCurrentDate((d) => {
        const newDate = new Date(d);
        newDate.setFullYear(d.getFullYear() + 12);
        return newDate;
      });
    } else if (mode === 'month') {
      setCurrentDate((d) => addMonths(d, 1));
    } else if (mode === 'day') {
      setCurrentDate((d) => addDays(d, 1));
    } else {
      setCurrentDate((d) => addDays(d, 7));
    }
  };

  const handlePrev = () => {
     if (view === 'years') {
      setCurrentDate((d) => {
        const newDate = new Date(d);
        newDate.setFullYear(d.getFullYear() - 12);
        return newDate;
      });
     } else if (mode === 'month') {
      setCurrentDate((d) => addMonths(d, -1));
    } else if (mode === 'day') {
      setCurrentDate((d) => addDays(d, -1));
    } else {
      setCurrentDate((d) => addDays(d, -7));
    }
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
    setView('calendar');
  };

  // ----------------------------------------------------------------------
  // Week / Day View Logic
  // ----------------------------------------------------------------------

  const viewDays = useMemo(() => {
    if (mode === 'day') {
        return [currentDate];
    }
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentDate, mode]);

  const getEventStyle = (event: CalendarEvent) => {
    const start = typeof event.start === 'string' ? parseISO(event.start) : event.start;
    const end = typeof event.end === 'string' ? parseISO(event.end) : event.end;
    
    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const dayStartMinutes = START_HOUR * 60;
    
    const duration = differenceInMinutes(end, start);
    
    return {
      top: `${((startMinutes - dayStartMinutes) / 60) * 80}px`,
      height: `${(duration / 60) * 80}px`,
    };
  };

  const weekEvents = useMemo(() => {
    return events.filter(event => {
      const eventStart = typeof event.start === 'string' ? parseISO(event.start) : event.start;
      return viewDays.some(day => isSameDay(day, eventStart));
    });
  }, [events, viewDays]);


  // ----------------------------------------------------------------------
  // Month View Logic (Picker)
  // ----------------------------------------------------------------------

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const isDateDisabled = (date: Date) => {
    if (minDate && isBefore(date, startOfDay(minDate))) return true;
    if (maxDate && isAfter(date, startOfDay(maxDate))) return true;
    return false;
  };

  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [dragCurrent, setDragCurrent] = useState<Date | null>(null);
  const isDraggingRef = React.useRef(false);

  const handleMouseDown = (date: Date, e: React.MouseEvent) => {
      // Only enable drag if onSelectRange is provided
      if (!onSelectRange) return;
      // We do NOT stopPropagation here completely because we might want other things?
      // Actually for drag we probably want to claim it.
      e.stopPropagation(); 
      e.preventDefault(); // Prevent text selection
      
      isDraggingRef.current = false;
      setDragStart(date);
      setDragCurrent(date);
  };

  const handleMouseEnter = (date: Date) => {
      if (onSlotHover) {
          onSlotHover(date);
      }
      if (dragStart) {
          isDraggingRef.current = true;
          setDragCurrent(date);
      }
  };

  // This handles the end of the drag (assigned to container)
  const handleMouseUp = () => {
      if (dragStart && dragCurrent && onSelectRange && isDraggingRef.current) {
          // Normalize start/end
          let start = dragStart;
          let end = dragCurrent;
          if (isBefore(end, start)) {
              [start, end] = [end, start];
          }
          // End date should include the selected slot duration (add 30 mins)
          const finalEnd = addMinutes(end, 30);
          
          if (!isSameDay(start, finalEnd) && differenceInMinutes(finalEnd, start) > 0) {
              // Ensure we don't accidentally select across days if logic isn't robust
              // But currently `dragCurrent` comes from same view.
              // Just call it.
              onSelectRange(start, finalEnd);
          } else {
             onSelectRange(start, finalEnd);
          }
      }
      
      // We don't reset isDraggingRef.current here immediately if we want to block the subsequent click?
      // But clearing dragStart will be checked by onClick?
      // No, onClick checks !dragStart... but dragStart becomes null here.
      // So onClick needs to check isDraggingRef.
      
      setDragStart(null);
      setDragCurrent(null);
  };
  
  // ----------------------------------------------------------------------
  // Year View Data
  // ----------------------------------------------------------------------
  const startYear = currentDate.getFullYear() - 6;
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

  // ----------------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------------

  return (
    <div 
        className={cn("flex flex-col h-full rounded-lg shadow-sm overflow-hidden select-none", className)}
        style={{
          backgroundColor: 'var(--calendar-bg, #ffffff)',
          border: '1px solid var(--calendar-border, #e2e8f0)',
          ...getVariantStyles(),
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
            setDragStart(null);
            setDragCurrent(null);
        }}
    >
      
      {/* Header */}
      <div 
        className="flex items-center justify-between px-2 py-2 border-b" 
        style={{ 
          backgroundColor: 'var(--calendar-bg, #ffffff)',
          borderBottomColor: 'var(--calendar-border, #e2e8f0)'
        }}
      >
        <ITText
            as="h2"
            className="text-sm font-bold capitalize cursor-pointer transition-colors select-none px-2 py-1 rounded"
            style={{ 
              color: 'var(--calendar-header-text, #1e293b)',
            }}
             onClick={() => setView(view === 'calendar' ? 'years' : 'calendar')}
             onMouseEnter={(e) => {
               e.currentTarget.style.backgroundColor = 'var(--calendar-header-hover, #f1f5f9)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.backgroundColor = 'transparent';
             }}
        >
          {view === 'years' 
            ? `${years[0]} - ${years[years.length - 1]}` 
            : format(currentDate, 'MMMM yyyy', { locale: es })
          }
        </ITText>
        <div className="flex items-center gap-1">
          <button 
            onClick={handlePrev} 
            type="button" 
            className="p-1.5 rounded-md transition-colors"
            style={{ color: 'var(--calendar-days-text, #334155)' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--calendar-header-hover, #f1f5f9)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <FaChevronLeft size={14} />
          </button>
          <button 
            onClick={handleToday} 
            type="button" 
            className="text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
            style={{ color: 'var(--calendar-days-text, #334155)' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--calendar-header-hover, #f1f5f9)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <ITText as="span">Hoy</ITText>
          </button>
          <button 
            onClick={handleNext} 
            type="button" 
            className="p-1.5 rounded-md transition-colors"
            style={{ color: 'var(--calendar-days-text, #334155)' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--calendar-header-hover, #f1f5f9)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div 
        className="flex-1 overflow-auto relative"
        style={{ backgroundColor: 'var(--calendar-bg, #ffffff)' }}
      >
        
        {view === 'years' ? (
              <div className="p-4 grid grid-cols-4 gap-2">
                  {years.map(year => (
                      <button
                          key={year}
                          type="button"
                          className={cn(
                              "h-10 rounded-md text-sm font-medium transition-colors border border-transparent",
                              year === currentDate.getFullYear() 
                                ? "bg-[var(--calendar-selected-bg)] text-[var(--calendar-selected-text)]" 
                                : "hover:bg-[var(--calendar-today-bg)] hover:text-[var(--calendar-today-text)]"
                          )}
                          style={{
                              color: year === currentDate.getFullYear() 
                                ? 'var(--calendar-selected-text, #ffffff)' 
                                : 'var(--calendar-days-text, #334155)'
                          }}
                          onClick={() => {
                              setCurrentDate((d) => {
                                  const newDate = new Date(d);
                                  newDate.setFullYear(year);
                                  return newDate;
                              });
                              setView('calendar');
                          }}
                      >
                          <ITText as="span">{year}</ITText>
                      </button>
                  ))}
              </div>
        ) : mode === 'month' ? (
           <div className="p-4">
             {/* Weekday Headers */}
             <div className="grid grid-cols-7 mb-2">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                  <ITText key={day} as="div" className="text-center text-xs font-semibold text-gray-400 uppercase py-1">
                    {day}
                  </ITText>
                ))}
             </div>
             {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day) => {
                  const isDisabled = isDateDisabled(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  
                  // Selection logic
                  const isSelected = selectionMode === 'single' && value && isSameDay(day, value);
                  const isRangeStart = selectionMode === 'range' && startDate && isSameDay(day, startDate);
                  const isRangeEnd = selectionMode === 'range' && endDate && isSameDay(day, endDate);
                  const isInRange = selectionMode === 'range' && startDate && endDate && isAfter(day, startDate) && isBefore(day, endDate);
                  
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => onChange && onChange(day)}
                      className={cn(
                        "h-10 w-full flex items-center justify-center rounded-md text-sm transition-colors relative",
                        !isCurrentMonth && "opacity-40",
                        isDisabled && "opacity-20 cursor-not-allowed",
                      )}
                      style={{
                        backgroundColor: isSelected || isRangeStart || isRangeEnd 
                          ? 'var(--calendar-selected-bg, #2563eb)' 
                          : isInRange 
                            ? 'var(--calendar-range-bg, #eff6ff)'
                            : isToday(day)
                              ? 'var(--calendar-today-bg, #eff6ff)'
                              : 'transparent',
                        color: isSelected || isRangeStart || isRangeEnd
                          ? 'var(--calendar-selected-text, #ffffff)'
                          : isToday(day)
                            ? 'var(--calendar-today-text, #2563eb)'
                            : 'var(--calendar-days-text, #334155)',
                        fontWeight: isSelected || isRangeStart || isRangeEnd || isToday(day) ? '700' : '400',
                      }}
                    >
                      <ITText as="span">{format(day, 'd')}</ITText>
                      
                      {/* Connection for range selection to make it look continuous */}
                      {selectionMode === 'range' && isRangeStart && endDate && (
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-[var(--calendar-range-bg)] -z-10" />
                      )}
                      {selectionMode === 'range' && isRangeEnd && startDate && (
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[var(--calendar-range-bg)] -z-10" />
                      )}
                    </button>
                  );
                })}
              </div>
           </div>
        ) : (
          /* Week/Day View (Scheduler) */
          <div className={cn("flex h-full", mode === 'week' ? "min-w-[800px]" : "w-full")}>
             {/* Time Sidebar */}
             <div 
               className="flex-none w-16 pt-10 select-none"
               style={{
                 backgroundColor: 'var(--calendar-header-hover, #f1f5f9)',
                 borderRight: '1px solid var(--calendar-border, #e2e8f0)',
               }}
             >
               {TIME_SLOTS.map((hour) => (
                 hour < END_HOUR && (
                   <div key={hour} className="h-20 relative text-right pr-2">
                      <ITText as="span" className="text-xs text-slate-400 dark:text-slate-500 -mt-2 inline-block transform -translate-y-1/2">
                        {format(new Date().setHours(hour, 0), 'HH:mm')}
                      </ITText>
                   </div>
                 )
               ))}
             </div>

            {/* Days Columns */}
            <div className="flex flex-1">
              {viewDays.map((day) => (
                <div 
                  key={day.toISOString()} 
                  className="flex-1 min-w-[120px] relative"
                  style={{ borderRight: '1px solid var(--calendar-border, #e2e8f0)' }}
                >
                  
                  {/* Day Header */}
                  <div 
                    className="h-10 flex flex-col items-center justify-center sticky top-0 z-10"
                    style={{
                      backgroundColor: isToday(day) ? 'var(--calendar-today-bg, #eff6ff)' : 'var(--calendar-bg, #ffffff)',
                      borderBottom: '1px solid var(--calendar-border, #e2e8f0)',
                    }}
                  >
                    <ITText
                      as="span"
                      className="text-xs font-semibold uppercase"
                      style={{
                        color: isToday(day) ? 'var(--calendar-today-text, #2563eb)' : 'var(--calendar-days-text, #334155)',
                        opacity: isToday(day) ? 1 : 0.6,
                      }}
                    >
                      {format(day, 'EEE', { locale: es })}
                    </ITText>
                    <ITText
                      as="span"
                      className="text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full mt-0.5"
                      style={{
                        color: isToday(day) ? 'var(--calendar-selected-text, #ffffff)' : 'var(--calendar-days-text, #334155)',
                        backgroundColor: isToday(day) ? 'var(--calendar-selected-bg, #2563eb)' : 'transparent',
                      }}
                    >
                      {format(day, 'd')}
                    </ITText>
                  </div>

                  {/* Slots Grid */}
                  <div className="relative">
                    {TIME_SLOTS.map((hour) => (
                      hour < END_HOUR && (
                        <div 
                          key={hour} 
                          className="h-20 relative group"
                          style={{ borderBottom: '1px dashed var(--calendar-border, #e2e8f0)' }}
                        >
                           {/* Slot 00 */}
                           <div 
                            className="absolute inset-x-0 top-0 h-10 border-b border-transparent hover:border-[var(--calendar-today-bg)] hover:bg-[var(--calendar-today-bg)] transition-colors cursor-pointer z-0"
                             onMouseDown={(e) => {
                                 const d = new Date(day); d.setHours(hour, 0, 0, 0);
                                 handleMouseDown(d, e);
                             }}
                             onMouseEnter={() => {
                                 const d = new Date(day); d.setHours(hour, 0, 0, 0);
                                 handleMouseEnter(d);
                             }}
                             onClick={() => {
                               if (!isDraggingRef.current) { 
                                   const d = new Date(day); d.setHours(hour, 0, 0, 0);
                                   onSlotClick && onSlotClick(d);
                               }
                             }}
                           />
                           {/* Slot 30 */}
                           <div 
                            className="absolute inset-x-0 bottom-0 h-10 hover:border-[var(--calendar-today-bg)] hover:bg-[var(--calendar-today-bg)] transition-colors cursor-pointer z-0"
                             onMouseDown={(e) => {
                                 const d = new Date(day); d.setHours(hour, 30, 0, 0);
                                 handleMouseDown(d, e);
                             }}
                             onMouseEnter={() => {
                                 const d = new Date(day); d.setHours(hour, 30, 0, 0);
                                 handleMouseEnter(d);
                             }}
                             onClick={() => {
                               if (!isDraggingRef.current) {
                                   const d = new Date(day); d.setHours(hour, 30, 0, 0);
                                   onSlotClick && onSlotClick(d);
                               }
                             }}
                           />
                        </div>
                      )
                    ))}
                    
                    {/* Selection Overlay */}
                    {dragStart && dragCurrent && isSameDay(dragStart, day) && (
                         (() => {
                            let start = dragStart;
                            let end = dragCurrent;
                            if (isBefore(end, start)) [start, end] = [end, start];
                            const finalEnd = addMinutes(end, 30); // Visual end is end of slot

                            const startMinutes = start.getHours() * 60 + start.getMinutes();
                            const dayStartMinutes = START_HOUR * 60;
                            const duration = differenceInMinutes(finalEnd, start);
                            const top = ((startMinutes - dayStartMinutes) / 60) * 80;
                            const height = (duration / 60) * 80;

                             return (
                                 <div 
                                     className="absolute left-1 right-1 bg-[var(--calendar-selected-bg)]/30 border border-[var(--calendar-selected-bg)] rounded z-10 pointer-events-none"
                                     style={{ top: `${top}px`, height: `${height}px` }}
                                 />
                             );
                         })()
                    )}

                    {/* Events */}
                    {weekEvents
                      .filter((event) => isSameDay(typeof event.start === 'string' ? parseISO(event.start) : event.start, day))
                      .map((event) => {
                        const style = getEventStyle(event);
                        return (
                          <div
                            key={event.id}
                             className={cn(
                               "absolute left-1 right-1 rounded px-2 py-1 text-xs cursor-pointer hover:brightness-95 transition-all shadow-sm overflow-hidden z-20 border-l-4",
                               !event.color && "bg-[var(--calendar-today-bg)] text-[var(--calendar-today-text)] border-[var(--calendar-selected-bg)]"
                             )}
                            style={{ 
                              top: style.top, 
                              height: style.height,
                              backgroundColor: event.color ? `${event.color}20` : undefined,
                              borderColor: event.color,
                              color: event.color ? event.color : undefined
                             }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick && onEventClick(event);
                            }}
                          >
                            <ITText as="div" className="font-semibold truncate">{event.title}</ITText>
                            <ITText as="div" className="opacity-80 truncate">
                              {format(typeof event.start === 'string' ? parseISO(event.start) : event.start, 'HH:mm')} - 
                              {format(typeof event.end === 'string' ? parseISO(event.end) : event.end, 'HH:mm')}
                            </ITText>
                          </div>
                        );
                      })}
                  </div>
                  
                  {/* Current Time Line */}
                  {isToday(day) && (
                    <div 
                      className="absolute left-0 right-0 border-t-2 border-danger-500 z-30 pointer-events-none"
                      style={{
                        top: `${((new Date().getHours() * 60 + new Date().getMinutes() - (START_HOUR * 60)) / 60) * 80}px`
                      }}
                    >
                      <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-danger-500 rounded-full" />
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ITCalendar;
