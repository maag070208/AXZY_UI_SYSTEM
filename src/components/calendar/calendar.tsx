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
  minDate,
  maxDate,
  className,
}) => {
  // Determine mode: if onChange provided, assume picker (month) unless specialized
  const mode = modeProp || (onChange ? 'month' : 'week');
  
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [view, setView] = useState<'calendar' | 'years'>('calendar');

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
        className={cn("flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden select-none", className)}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
            setDragStart(null);
            setDragCurrent(null);
        }}
    >
      
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-2 border-b border-gray-200 bg-white">
        <h2 
            className="text-sm font-bold text-gray-800 capitalize cursor-pointer hover:text-primary-600 transition-colors select-none px-2 py-1 rounded hover:bg-gray-50 bg-transparent"
             onClick={() => setView(view === 'calendar' ? 'years' : 'calendar')}
        >
          {view === 'years' 
            ? `${years[0]} - ${years[years.length - 1]}` 
            : format(currentDate, 'MMMM yyyy', { locale: es })
          }
        </h2>
        <div className="flex items-center gap-1">
          <button onClick={handlePrev} type="button" className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600">
            <FaChevronLeft size={14} />
          </button>
          <button onClick={handleToday} type="button" className="text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors">
            Hoy
          </button>
          <button onClick={handleNext} type="button" className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600">
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto relative bg-white">
        
        {view === 'years' ? (
              <div className="p-4 grid grid-cols-4 gap-2">
                  {years.map(year => (
                      <button
                          key={year}
                          type="button"
                          className={cn(
                              "h-10 rounded-md text-sm font-medium transition-colors border border-transparent",
                              year === currentDate.getFullYear() 
                                ? "bg-primary-600 text-white" 
                                : "hover:bg-primary-50 text-gray-700 hover:text-primary-700"
                          )}
                          onClick={() => {
                              setCurrentDate((d) => {
                                  const newDate = new Date(d);
                                  newDate.setFullYear(year);
                                  return newDate;
                              });
                              setView('calendar');
                          }}
                      >
                          {year}
                      </button>
                  ))}
              </div>
        ) : mode === 'month' ? (
           <div className="p-4">
             {/* Weekday Headers */}
             <div className="grid grid-cols-7 mb-2">
               {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                 <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase py-1">
                   {day}
                 </div>
               ))}
             </div>
             {/* Days Grid */}
             <div className="grid grid-cols-7 gap-1">
               {monthDays.map((day) => {
                 const isDisabled = isDateDisabled(day);
                 const isSelected = value && isSameDay(day, value);
                 const isCurrentMonth = isSameMonth(day, currentDate);
                 
                 return (
                   <button
                     key={day.toISOString()}
                     type="button"
                     disabled={isDisabled}
                     onClick={() => onChange && onChange(day)}
                     className={cn(
                       "h-10 w-full flex items-center justify-center rounded-md text-sm transition-colors relative",
                       !isCurrentMonth && "text-gray-300",
                       isDisabled && "opacity-50 cursor-not-allowed",
                       isSelected ? "bg-primary-600 text-white font-medium hover:bg-primary-700" : "hover:bg-gray-100 text-gray-700",
                       isToday(day) && !isSelected && "text-primary-600 font-bold bg-primary-50"
                     )}
                   >
                     {format(day, 'd')}
                   </button>
                 );
               })}
             </div>
           </div>
        ) : (
          /* Week/Day View (Scheduler) */
          <div className={cn("flex h-full", mode === 'week' ? "min-w-[800px]" : "w-full")}>
            {/* Time Sidebar */}
            <div className="flex-none w-16 border-r border-gray-100 bg-gray-50 pt-10 select-none">
              {TIME_SLOTS.map((hour) => (
                hour < END_HOUR && (
                  <div key={hour} className="h-20 relative text-right pr-2">
                    <span className="text-xs text-gray-400 -mt-2 inline-block transform -translate-y-1/2">
                      {format(new Date().setHours(hour, 0), 'HH:mm')}
                    </span>
                  </div>
                )
              ))}
            </div>

            {/* Days Columns */}
            <div className="flex flex-1">
              {viewDays.map((day) => (
                <div key={day.toISOString()} className="flex-1 border-r border-gray-100 min-w-[120px] relative">
                  
                  {/* Day Header */}
                  <div className={cn(
                    "h-10 border-b border-gray-200 flex flex-col items-center justify-center sticky top-0 bg-white z-10",
                    isToday(day) && "bg-primary-50"
                  )}>
                    <span className={cn("text-xs font-semibold uppercase", isToday(day) ? "text-primary-600" : "text-gray-500")}>
                      {format(day, 'EEE', { locale: es })}
                    </span>
                    <span className={cn(
                      "text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full mt-0.5",
                      isToday(day) ? "bg-primary-600 text-white" : "text-gray-800"
                    )}>
                      {format(day, 'd')}
                    </span>
                  </div>

                  {/* Slots Grid */}
                  <div className="relative">
                    {TIME_SLOTS.map((hour) => (
                      hour < END_HOUR && (
                        <div 
                          key={hour} 
                          className="h-20 border-b border-gray-100 border-dashed relative group"
                        >
                           {/* Slot 00 */}
                           <div 
                            className="absolute inset-x-0 top-0 h-10 border-b border-transparent hover:border-primary-100 hover:bg-primary-50/30 transition-colors cursor-pointer z-0"
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
                            className="absolute inset-x-0 bottom-0 h-10 hover:border-primary-100 hover:bg-primary-50/30 transition-colors cursor-pointer z-0"
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
                                    className="absolute left-1 right-1 bg-primary-500/30 border border-primary-500 rounded z-10 pointer-events-none"
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
                              !event.color && "bg-primary-100 text-primary-700 border-primary-500"
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
                            <div className="font-semibold truncate">{event.title}</div>
                            <div className="opacity-80 truncate">
                              {format(typeof event.start === 'string' ? parseISO(event.start) : event.start, 'HH:mm')} - 
                              {format(typeof event.end === 'string' ? parseISO(event.end) : event.end, 'HH:mm')}
                            </div>
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
