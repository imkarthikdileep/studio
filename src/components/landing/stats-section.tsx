"use client";

import { useEffect, useRef, useState } from 'react';
import { Users, Calendar, Briefcase } from 'lucide-react';

const stats = [
  {
    icon: <Calendar className="h-12 w-12 text-accent" />,
    value: 15,
    label: "Years of Experience",
    suffix: "+",
  },
  {
    icon: <Users className="h-12 w-12 text-accent" />,
    value: 210,
    label: "Skilled Technicians",
    suffix: "+",
  },
  {
    icon: <Briefcase className="h-12 w-12 text-accent" />,
    value: 500,
    label: "Projects Completed",
    suffix: "+",
  },
];

const Counter = ({ value, suffix }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const frameRate = 60;
    const totalFrames = duration / (1000 / frameRate);
    const increment = value / totalFrames;

    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      const newCount = Math.min(value, Math.ceil(increment * currentFrame));
      setCount(newCount);
      if (newCount >= value) {
        clearInterval(counter);
      }
    }, 1000 / frameRate);

    return () => clearInterval(counter);
  }, [value]);

  return <span className="text-4xl md:text-5xl font-extrabold text-primary">{count}{suffix}</span>;
};

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="achievements" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Achievements</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              Decades of experience and a track record of success.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-background rounded-lg shadow-lg">
              {stat.icon}
              <div className="mt-4">
                {isVisible ? <Counter value={stat.value} suffix={stat.suffix} /> : <span className="text-4xl md:text-5xl font-extrabold text-primary">0{stat.suffix}</span>}
              </div>
              <p className="mt-2 text-lg font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
