import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { ITStepperProps, Step } from "./stepper.props";
import { theme } from "@/theme/theme";
import ITButton from "../button/button";
import { FaChevronLeft, FaChevronRight, FaCheck } from "react-icons/fa";

export default function ITStepper({
  steps,
  currentStep,
  onFinish,
  onStepChange,
  allowClickToJump = true,
  useIcons = false,
  disableNext = false,
  containerClassName,
  stepClassName,
  scrollableContent = false,
  maxContentHeight = "400px",
  color = "primary",
}: ITStepperProps) {
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Resolve theme color
  const isThemeColor = color in theme.colors;
  const resolvedColor = isThemeColor
    ? theme.colors[color as keyof typeof theme.colors][500]
    : color;

  // Effect for notifying parent of step change
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  // Effect for animation and focus management
  useEffect(() => {
    const pct = (currentStep / Math.max(1, steps.length - 1)) * 100;

    if (progressRef.current) {
      progressRef.current.style.width = `${pct}%`;
      progressRef.current.style.backgroundColor = resolvedColor;
    }

    if (contentRef.current) {
      contentRef.current.classList.remove(
        "animate-slide-in-left",
        "animate-slide-in-right"
      );
      requestAnimationFrame(() => {
        contentRef.current?.classList.add(
          direction === "next"
            ? "animate-slide-in-right"
            : "animate-slide-in-left"
        );
      });
    }

    contentRef.current?.focus();
  }, [currentStep, direction, steps.length, resolvedColor]);


  const nextStep = () => {
    if (disableNext) return;
    if (currentStep < steps.length - 1) {
      setDirection("next");
      onStepChange?.(currentStep + 1);
    } else {
      onFinish?.();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection("prev");
      onStepChange?.(currentStep - 1);
    }
  };

  const jumpTo = (index: number) => {
    if (!allowClickToJump) return;
    if (index <= currentStep) {
      setDirection(index > currentStep ? "next" : "prev");
      onStepChange?.(index);
    }
  };

  const renderStepContent = (
    index: number,
    isCompleted: boolean,
    isActive: boolean
  ) => {
    const step = steps[index];

    if (isCompleted) {
      return <FaCheck className="w-4 h-4" />;
    }

    if (step.icon && useIcons) {
      return (
        <div className="flex items-center justify-center w-5 h-5">
          {step.icon}
        </div>
      );
    }

    return <span className="text-sm font-semibold">{index + 1}</span>;
  };

  return (
    <div className={clsx("w-full max-w-5xl mx-auto px-4", containerClassName)}>
      <div className="relative mb-8">
        <div
          className="absolute left-6 right-6 top-5 h-1 bg-gray-200 rounded-full z-0"
          aria-hidden
        />
        <div
          ref={progressRef}
          className="absolute left-6 top-5 h-1 rounded-full z-10 transition-all duration-500 ease-in-out"
          aria-hidden
        />

        <div className="flex items-start justify-between space-x-2 relative z-20">
          {steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;
            const hasIcon = step.icon && useIcons;

            return (
              <button
                type="button"
                key={idx}
                onClick={() => jumpTo(idx)}
                disabled={!allowClickToJump && idx !== currentStep}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Paso ${idx + 1} ${step.label}`}
                className="flex-1 group"
                title={step.label}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={clsx(
                      "flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 transform",
                      hasIcon && "p-2",
                      isCompleted && "bg-slate-400 border-slate-400 text-white scale-100 shadow",
                      isActive && "text-white scale-110 shadow-lg",
                      !isActive && !isCompleted && "bg-white border-gray-300 text-gray-400"
                    )}
                    style={isActive ? { backgroundColor: resolvedColor, borderColor: resolvedColor } : undefined}
                  >
                    {renderStepContent(idx, isCompleted, isActive)}
                  </div>

                  <span
                    className={clsx(
                      "mt-2 text-xs sm:text-sm font-medium transition-colors text-center",
                      isCompleted ? "text-slate-400" : !isActive && "text-gray-400"
                    )}
                    style={isActive ? { color: resolvedColor } : undefined}
                  >
                    {step.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- CONTENIDO DEL STEP --- */}
      <div
        ref={contentRef}
        tabIndex={-1}
        role="region"
        aria-labelledby={`step-${currentStep}`}
        className={clsx(
          stepClassName,
          "bg-white border border-gray-100 rounded-2xl shadow-lg min-h-[280px] transition-transform duration-400 no-scrollbar p-6",
          scrollableContent && "overflow-y-auto hide-scrollbar"
        )}
        style={
          scrollableContent && maxContentHeight
            ? { maxHeight: maxContentHeight }
            : undefined
        }
      >
        {steps[currentStep].content}
      </div>

      {/* --- BOTONES DE CONTROL --- */}
      <div className="flex justify-between items-center mt-6">
        <ITButton
          variant="outlined"
          color="secondary"
          disabled={currentStep === 0}
          onClick={prevStep}
        >
          <div className="flex items-center gap-2">
            <FaChevronLeft />
            Atrás
          </div>
        </ITButton>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 mr-2 hidden sm:block">
            Paso {currentStep + 1} de {steps.length}
          </div>
          
          <ITButton
            variant="solid"
            color={color as any}
            disabled={disableNext}
            onClick={nextStep}
          >
            <div className="flex items-center gap-2">
              {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              {currentStep === steps.length - 1 ? <FaCheck /> : <FaChevronRight />}
            </div>
          </ITButton>
        </div>
      </div>
    </div>
  );
}
