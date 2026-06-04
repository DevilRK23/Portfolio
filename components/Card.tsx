// components/Card.tsx
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`glass p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow ${className}`}
    >
      {children}
    </div>
  );
}
