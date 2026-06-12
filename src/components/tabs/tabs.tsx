import React, { useState } from 'react';
import { ITTabsProps } from './tabs.props';
import { clsx } from 'clsx';
import ITText from "@/components/text/text";

const ITTabs: React.FC<ITTabsProps> = ({
  items,
  defaultActiveId,
  onChange,
  variant = 'line',
  className = '',
  containerClassName = ''
}) => {
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id);

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    setActiveId(id);
    if (onChange) onChange(id);
  };

  const activeContent = items.find(item => item.id === activeId)?.content;

  return (
    <div className={clsx("w-full", containerClassName)}>
      {/* HEADER */}
      <div className={clsx(
        "flex border-gray-200 mb-4",
        variant === 'line' ? "border-b" : "gap-2 p-1 bg-gray-100 rounded-lg w-fit",
        className
      )}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id, item.disabled)}
              disabled={item.disabled}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 outline-none",
                // LINE VARIANT
                variant === 'line' && [
                  "border-b-2 -mb-[2px]",
                  isActive 
                    ? "border-primary-500 text-primary-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                ],
                // PILL VARIANT
                variant === 'pill' && [
                  "rounded-md",
                  isActive 
                    ? "bg-white text-primary-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700",
                ],
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <ITText as="span">{item.label}</ITText>
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="tab-content animate-fadeIn">
        {activeContent}
      </div>
    </div>
  );
};

export default ITTabs;
