import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

type IconType = React.ReactNode;

interface Step {
  label: string;
  content: React.ReactNode;
  icon?: IconType;
}

interface ITStepperProps {
  steps: Step[];
  currentStep: number;
  onFinish?: () => void;
  onStepChange?: (step: number) => void;
  allowClickToJump?: boolean;
  useIcons?: boolean;
  disableNext?: boolean;
  containerClassName?: string;
  stepClassName?: string;
  scrollableContent?: boolean;
  maxContentHeight?: string;
}

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
}: ITStepperProps) {
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Effect for notifying parent of step change
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  // Effect for animation and focus management
  useEffect(() => {
    const pct = (currentStep / Math.max(1, steps.length - 1)) * 100;

    if (progressRef.current) {
      progressRef.current.style.width = `${pct}%`;
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

    // Only focus if the step strictly changed, to avoid stealing focus from inputs on re-renders
    // We check if we are NOT in the initial render ideally, but here we just rely on deps.
    // However, to be safe against prop updates (like steps changing internal content), we should be careful.
    // The previous issue was onStepChange triggering this. Now it's removed from deps.
    contentRef.current?.focus();
  }, [currentStep, direction, steps.length]);


  const nextStep = () => {
    if (disableNext) return;
    if (currentStep < steps.length - 1) {
      setDirection("next");
      onStepChange?.(currentStep + 1); // 👈 Notificar al padre
    } else {
      onFinish?.();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection("prev");
      onStepChange?.(currentStep - 1); // 👈 Notificar al padre
    }
  };

  const jumpTo = (index: number) => {
    if (!allowClickToJump) return;
    if (index <= currentStep) {
      setDirection(index > currentStep ? "next" : "prev");
      onStepChange?.(index); // 👈 Notificar al padre
    }
  };

  const renderStepContent = (
    index: number,
    isCompleted: boolean,
    isActive: boolean
  ) => {
    const step = steps[index];

    if (isCompleted) {
      return (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
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
          className="absolute left-6 top-5 h-1 bg-slate-400 rounded-full z-10 transition-all duration-500 ease-in-out"
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
                    className={`flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 transform ${
                      isCompleted
                        ? "bg-slate-400 border-slate-400 text-white scale-100 shadow"
                        : isActive
                        ? "bg-teal-500 border-teal-500 text-white scale-110 shadow-lg"
                        : "bg-white border-gray-300 text-gray-400"
                    } ${hasIcon ? "p-2" : ""}`}
                  >
                    {renderStepContent(idx, isCompleted, isActive)}
                  </div>

                  <span
                    className={`mt-2 text-xs sm:text-sm font-medium transition-colors text-center ${
                      isActive
                        ? "text-teal-500"
                        : isCompleted
                        ? "text-slate-400"
                        : "text-gray-400"
                    }`}
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
          "bg-white border border-gray-100 rounded-2xl shadow-lg min-h-[280px] transition-transform duration-400 no-scrollbar",
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
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          type="button"
          disabled={currentStep === 0}
          className={`px-5 py-2 rounded-xl text-sm font-medium border transition-all duration-200 flex items-center ${
            currentStep === 0
              ? "border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
              : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm"
          }`}
        >
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Atrás
        </button>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 mr-2 hidden sm:block">
            Paso {currentStep + 1} de {steps.length}
          </div>
          <button
            onClick={nextStep}
            type="button"
            disabled={disableNext}
            className={`px-6 py-2 rounded-xl text-sm font-medium flex items-center transition-all duration-200 ${
              disableNext
                ? "bg-gray-300 text-gray-600 cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-teal-500 to-slate-400 text-white hover:shadow-lg transform hover:scale-[1.02]"
            }`}
          >
            {currentStep === steps.length - 1 ? (
              <>
                Finalizar
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </>
            ) : (
              <>
                Siguiente
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
