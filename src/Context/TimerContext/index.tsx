// src/context/TimerContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimerContextProps {
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [remainingTime, setRemainingTime] = useState<number>(2 * 60 * 60); // 2 hours in seconds

  return (
    <TimerContext.Provider value={{ remainingTime, setRemainingTime }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextProps => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
