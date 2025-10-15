'use client';

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Users, Star, BookOpen, Briefcase, Users2 } from 'lucide-react';

const metrics = [
  {
    title: 'Strong Member Community',
    value: 2000,
    suffix: '+',
    icon: <Users className="w-6 h-6 text-blue-600 animate-float" />,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Featured Posts',
    value: 1500,
    suffix: '+',
    icon: <Star className="w-6 h-6 text-yellow-400 animate-float" />,
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    title: 'Stories Captured of CXOs',
    value: 90,
    suffix: '%',
    icon: <BookOpen className="w-6 h-6 text-purple-500 animate-float" />,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Worth Business Opportunities Generated',
    value: 10,
    suffix: 'cr+',
    prefix: '₹',
    icon: <Briefcase className="w-6 h-6 text-green-500 animate-float" />,
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    title: 'New Age Networking Events Conducted',
    value: 10,
    suffix: '',
    icon: <Users2 className="w-6 h-6 text-blue-500 animate-float" />,
    gradient: 'from-blue-400 to-cyan-500',
  },
];

const Metrics = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="w-full py-10 sm:py-12 bg-white dark:bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 dark:from-blue-800 dark:to-blue-900 backdrop-blur-xl rounded-xl p-4 sm:p-5 h-32 sm:h-36 hover:scale-100 transition-all duration-500 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600 relative overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Gradient overlay on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${
                    metric.gradient.includes('blue')
                      ? '#3B82F6'
                      : metric.gradient.includes('yellow')
                      ? '#F59E0B'
                      : metric.gradient.includes('purple')
                      ? '#8B5CF6'
                      : metric.gradient.includes('green')
                      ? '#10B981'
                      : '#06B6D4'
                  }, transparent)`,
                }}
              ></div>

              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              <div className="mb-2 relative z-10">
                <div className="w-6 h-6">
                  {React.cloneElement(metric.icon, {
                    className: `w-full h-full ${metric.icon.props.className.replace('w-6 h-6', 'w-full h-full')}`,
                  })}
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-blue-900 dark:text-white drop-shadow-md relative z-10 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
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

              <p className="mt-1 text-center text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200 opacity-90 leading-snug relative z-10 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors duration-300 px-1">
                {metric.title}
              </p>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
