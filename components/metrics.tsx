'use client';

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Users, Star, BookOpen, Briefcase, Users2 } from 'lucide-react';

const metrics = [
  {
    title: 'Strong Member Community',
    value: 650,
    suffix: '+',
    icon: <Users className="w-8 h-8 text-blue-600 animate-bounce" />,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Featured Stories',
    value: 250,
    suffix: '+',
    icon: <Star className="w-8 h-8 text-yellow-400 animate-bounce" />,
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    title: 'Stories Captured of CXOs',
    value: 50,
    suffix: '%',
    icon: <BookOpen className="w-8 h-8 text-purple-500 animate-bounce" />,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Worth Business Opportunities Generated',
    value: 3,
    suffix: 'cr+',
    prefix: '₹',
    icon: <Briefcase className="w-8 h-8 text-green-500 animate-bounce" />,
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    title: 'New Age Networking Events Conducted',
    value: 5,
    suffix: '',
    icon: <Users2 className="w-8 h-8 text-blue-500 animate-bounce" />,
    gradient: 'from-blue-400 to-cyan-500',
  },
];

const Metrics = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="w-full py-20 bg-white dark:bg-blue-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 dark:from-blue-800 dark:to-blue-900 backdrop-blur-xl rounded-3xl p-8 h-52 hover:scale-110 transform transition-all duration-500 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600 relative overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"
                   style={{
                     background: `linear-gradient(135deg, ${metric.gradient.includes('blue') ? '#3B82F6' : metric.gradient.includes('yellow') ? '#F59E0B' : metric.gradient.includes('purple') ? '#8B5CF6' : metric.gradient.includes('green') ? '#10B981' : '#06B6D4'}, transparent)`
                   }}>
              </div>
              
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <div className="mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
                {metric.icon}
              </div>
              
              <h2 className="text-4xl font-extrabold text-blue-900 dark:text-white drop-shadow-md relative z-10 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                {inView ? (
                  <CountUp
                    start={0}
                    end={metric.value}
                    duration={2.5}
                    suffix={metric.suffix}
                    prefix={metric.prefix || ''}
                  />
                ) : (
                  '0' + metric.suffix
                )}
              </h2>
              
              <p className="mt-3 text-center text-sm font-medium text-blue-800 dark:text-blue-200 opacity-90 leading-snug relative z-10 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors duration-300">
                {metric.title}
              </p>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
