import React from 'react';
import { Clock } from 'lucide-react';

export const Timeline = ({ children }) => (
  <ol className="relative border-l ml-4 border-gray-200">
    {children}
  </ol>
);

export const TimelineItem = ({ children, index }) => (
  <li className="mb-10 ml-6 scroll-reveal" style={{ animationDelay: `${index * 0.15}s` }}>
    {children}
  </li>
);

export const TimelineTime = ({ children }) => (
  <span
    className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-8 ring-white text-white shadow-lg`}
    style={{ backgroundColor: '#6495ED', borderColor: '#FAFAFA' }}
  >
    <Clock className="w-4 h-4" />
  </span>
);

export const TimelineContent = ({ children }) => (
  <div className="flex-1">
    {children}
  </div>
);

export const TimelineTitle = ({ children }) => (
  <h4 className={`font-bold text-lg mb-1`} style={{ color: '#333333' }}>{children}</h4>
);

export const TimelineDescription = ({ children }) => (
  <p className="text-base font-normal text-gray-700 mt-1">{children}</p>
);