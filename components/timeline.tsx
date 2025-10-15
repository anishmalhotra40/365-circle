import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const timelineData = [
  { id: 1, date: "1999 – 2015", title: "D.P.S", position: "Student" },
  { id: 2, date: "2015 – 2018", title: "Symbiosis SOE", position: "B.Sc. Eco(Hons)" },
  { id: 3, date: "2016", title: "NTPC", position: "Vocational Trainer" },
  { id: 4, date: "2017", title: "HDFC Bank", position: "Management Trainee" },
  { id: 5, date: "2018 – 2019", title: "Ken Research", position: "Research Associate" },
  { id: 6, date: "2019 – 2021", title: "Nielsen", position: "Project Co-ordinator" },
  { id: 7, date: "2021", title: "Rakuten Insight", position: "Associate Project Manager" },
  { id: 8, date: "2021 – 2023", title: "EY", position: "Associate Consultant -> Consultant" },
  { id: 9, date: "2023 – 2025", title: "EY-P", position: "Consultant -> Sr. Consultant" },
  { id: 10, date: "2025 – Present", title: "365", position: "Founder" },
];

// Add a mapping from title to logo file
const logoMap: Record<string, string> = {
  'D.P.S': '/dps.png',
  'Symbiosis SOE': '/SSE.png',
  'NTPC': '/ntpc.png',
  'HDFC Bank': '/hdfc.png',
  'Ken Research': '/ken.png',
  'Nielsen': '/neilsen.png',
  'Rakuten Insight': '/rakuten.svg',
  'EY': '/ey.png',
  'EY-P': '/eyp.png',
  '365': '/logo.png',
};

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [animateLine, setAnimateLine] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateLine(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.3 }
    );
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={timelineRef}
      className="timeline-root"
      style={{ width: "100%", maxWidth: 1200, margin: "64px auto 0 auto", padding: 20 }}
    >
      <div className="timeline-content">
        {/* DATES above dots */}
        <div className="timeline-row timeline-dates">
          {timelineData.map((step) => (
            <div key={step.id} className="timeline-cell">
              <div className="timeline-date">{step.date}</div>
            </div>
          ))}
        </div>
        {/* DOTS + LINE (line is absolutely centered behind dots) */}
        <div className="timeline-row timeline-dots-wrapper">
          <div className="timeline-line-container">
            <div
              className={`timeline-gradient-bar${animateLine ? " timeline-gradient-bar-animate" : ""}`}
              style={{ width: animateLine ? "100%" : "0%" }}
            />
          </div>
          {timelineData.map((step, idx) => (
            <div key={step.id} className="timeline-cell timeline-dot-cell">
              <div className="timeline-dot" title={step.title}>
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
        {/* TITLES and POSITIONS below dots */}
        <div className="timeline-row timeline-labels">
          {timelineData.map((step, idx) => {
            // Pulsating shadow only for 365
            const is365 = step.title === '365';
            // Position line break logic
            let positionNode: React.ReactNode = step.position;
            if (step.position.includes('(Hons)')) {
              const [before, after] = step.position.split('(Hons)');
              positionNode = <>{before.trim()}<br/>(Hons){after ? <><br/>{after.trim()}</> : null}</>;
            } else if (step.position.includes('Trainer')) {
              const [before, after] = step.position.split('Trainer');
              positionNode = <>{before.trim()}<br/>Trainer{after ? <><br/>{after.trim()}</> : null}</>;
            } else if (step.position.includes('->')) {
              const [from, to] = step.position.split('->');
              positionNode = <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                <span>{to.trim()}</span>
                <span style={{fontSize:18, lineHeight:1, color:'#2563eb', fontWeight:700}}>&uarr;</span>
                <span>{from.trim()}</span>
              </div>;
            }
            return (
              <div key={step.id} className="timeline-cell timeline-label-cell">
                <div className="timeline-logo" style={{ marginBottom: 8, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                  {is365 && (
                    <span className="ey-pulse" style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: idx < 7 ? 60 : 48,
                      height: idx < 7 ? 60 : 48,
                      borderRadius: '50%',
                      background: 'rgba(96, 165, 250, 0.25)',
                      zIndex: 0,
                      animation: 'pulse-blue 1.5s infinite',
                    }} />
                  )}
                  <Image
                    src={logoMap[step.title] || '/logo.png'}
                    alt={step.title}
                    width={
                      step.title === 'EY-P'
                        ? 48
                        : idx < 7 ? 48 : 36
                    }
                    height={
                      step.title === 'EY-P'
                        ? 48
                        : idx < 7 ? 48 : 36
                    }
                    style={{
                      objectFit: 'contain',
                      width:
                        step.title === 'EY-P'
                          ? 48
                          : idx < 7 ? 48 : 36,
                      height:
                        step.title === 'EY-P'
                          ? 48
                          : idx < 7 ? 48 : 36,
                      boxShadow:
                        step.title === '365'
                          ? 'none'
                          : 'none',
                      borderRadius: step.title === 'EY' ? 0 : 12,
                      background: step.title === '365' ? 'transparent' : 'transparent',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </div>
                <div className="timeline-position" style={{ marginTop: 8, lineHeight: 1.5, fontSize: 13, minHeight: 24 }}>
                  {positionNode}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .timeline-root { display: none !important; }
        }
        .timeline-content {
          min-height: 160px;
          width: 100%;
        }
        .timeline-row {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          width: 100%;
        }
        .timeline-dates {
          margin-bottom: 10px;
        }
        .timeline-labels {
          margin-top: 28px;
        }
        .timeline-cell {
          flex: 1;
          min-width: 60px;
          text-align: center;
        }
        .timeline-date {
          font-size: 12px;
          color: #2563eb;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .timeline-dots-wrapper {
          position: relative;
          align-items: center;
          margin-bottom: 0;
          min-height: 60px;
        }
        .timeline-line-container {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 7px;
          z-index: 1;
          border-radius: 6px;
          overflow: hidden;
          width: 100%;
        }
        .timeline-dot-cell {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .timeline-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #fff;
          border: 4px solid #2563eb;
          margin: 0 auto;
          box-shadow: 0 2px 10px 0 rgba(37,99,235,0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
          font-weight: 800;
          font-size: 16px;
          position: relative;
          z-index: 2;
          transition: box-shadow 0.2s;
        }
        .timeline-gradient-bar {
          background: linear-gradient(270deg, #2563eb, #fff, #2563eb, #60a5fa, #fff, #2563eb);
          background-size: 400% 400%;
          height: 100%;
          border-radius: 6px;
          transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .timeline-gradient-bar-animate {
          animation: gradientMove 3s linear infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .timeline-label-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 4px;
          min-height: 48px;
        }
        .timeline-title {
          font-size: 13px;
          color: #0f172a;
          font-weight: 700;
          margin-bottom: 2px;
          line-height: 1.2;
        }
        .timeline-position {
          font-size: 12px;
          color: #2563eb;
          font-weight: 500;
        }
        @keyframes pulse-blue {
          0% { box-shadow: 0 0 0 0 rgba(96,165,250,0.25); }
          70% { box-shadow: 0 0 0 16px rgba(96,165,250,0.05); }
          100% { box-shadow: 0 0 0 0 rgba(96,165,250,0.25); }
        }
      `}</style>
    </div>
  );
}
