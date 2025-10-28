import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export function Card({
  children,
  className = ''
}: CardProps) {
  return <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>;
}
export function CardHeader({
  children,
  className = ''
}: CardProps) {
  return <div className={`px-4 py-5 border-b border-gray-200 ${className}`}>
      {children}
    </div>;
}
export function CardContent({
  children,
  className = ''
}: CardProps) {
  return <div className={`px-4 py-5 ${className}`}>{children}</div>;
}
export function CardFooter({
  children,
  className = ''
}: CardProps) {
  return <div className={`px-4 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg ${className}`}>
      {children}
    </div>;
}