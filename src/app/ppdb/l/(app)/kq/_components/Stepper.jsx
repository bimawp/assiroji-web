import React from 'react';

export default function StepItem({ step, currentStatus, isLoading }) {
  const isActive = currentStatus === step.status;
  return (
    <div className="relative flex flex-col items-center z-10">
      <div>
        <div
          className={`
              flex h-10 w-10 items-center  justify-center rounded-full border-2 
              ${
                !isLoading && isActive
                  ? 'border-white text-white  bg-teal-600'
                  : 'bg-white border-teal-600 text-teal-600'
              }
            `}
        >
          {step.id}
        </div>
      </div>
      <span className="mt-2 text-xs md:text-sm  font-medium  text-center">{step.name}</span>
    </div>
  );
}
