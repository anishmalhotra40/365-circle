'use client';

import React from 'react';
import CountUp from 'react-countup';
import { Users, Star, Briefcase, Users2, BookOpen } from 'lucide-react';

const metrics = [
  {
    title: 'New Age Networking Events Conducted',
    value: 5,
    suffix: '',
    icon: <Users2 className="w-8 h-8 text-blue-500" />,
  },
  {
    title: 'Featured Stories',
    value: 250,
    suffix: '+',
    icon: <Star className="w-8 h-8 text-yellow-400" />,
  },
  {
    title: 'Worth Business Opportunities Generated',
    value: 3,
    suffix: 'cr+',
    prefix: '₹',
    icon: <Briefcase className="w-8 h-8 text-green-500" />,
  },
  {
    title: 'Strong Member Community',
    value: 650,
    suffix: '+',
    icon: <Users className="w-8 h-8 text-blue-600" />,
  },
  {
    title: 'Stories Captured of CXOs',
    value: 50,
    suffix: '%',
    icon: <BookOpen className="w-8 h-8 text-purple-500" />,
  },
];

const Metrics = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white/70 dark:bg-blue-900/60 backdrop-blur-md rounded-2xl shadow-md p-6 md:p-8 h-48 hover:scale-105 hover:shadow-xl transition-all duration-200 border border-blue-100/40 dark:border-blue-800/40"
            >
              <div className="mb-3">{metric.icon}</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-100">
                <CountUp
                  start={0}
                  end={metric.value}
                  duration={2}
                  suffix={metric.suffix}
                  prefix={metric.prefix || ''}
                />
              </h2>
              <p className="mt-2 text-center text-sm font-medium text-blue-800 dark:text-blue-200 opacity-90">{metric.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
