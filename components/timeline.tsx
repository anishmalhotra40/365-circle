import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const timelineData = [
  { id: 1, date: "2017", title: "HDFC Bank", position: "Management Trainee" },
  { id: 2, date: "2018 – 2019", title: "Ken Research", position: "Research Associate" },
  { id: 3, date: "2019 – 2021", title: "Nielsen", position: "Project Co-ordinator" },
  { id: 4, date: "2021", title: "Rakuten Insight", position: "Associate Project Manager" },
  { id: 5, date: "2021 – 2025", title: "EY-P", position: "Senior Consultant" },
  { id: 6, date: "2025 – Present", title: "365", position: "Founder" },
];

const logoMap: Record<string, string> = {
  "D.P.S": "/dps.png",
  "Symbiosis SOE": "/SSE.png",
  NTPC: "/ntpc.png",
  "HDFC Bank": "/hdfc.png",
  "Ken Research": "/ken.png",
  Nielsen: "/neilsen.png",
  "Rakuten Insight": "/rakuten.svg",
  EY: "/ey.png",
  "EY-P": "/eyp.png",
  "365": "/footerlogo.png",
};

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [animateLine, setAnimateLine] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setAnimateLine(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMobileVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (mobileRef.current) observer.observe(mobileRef.current);
    return () => observer.disconnect();
  }, []);

  const getPositionNode = (position: string): React.ReactNode => {
    if (position.includes("->")) {
      const [from, to] = position.split("->");
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
          <span>{to.trim()}</span>
          <span style={{ fontSize: 14, color: "#2563eb", fontWeight: 700 }}>↑</span>
          <span>{from.trim()}</span>
        </div>
      );
    }
    return position;
  };

  return (
    <>
      {/* ─── DESKTOP ─── */}
      <div
        ref={timelineRef}
        className="timeline-desktop"
        style={{ width: "100%", maxWidth: 1200, margin: "64px auto 0 auto", padding: 20 }}
      >
        <h2 className="pb-8 font-bold text-2xl">Anish Malhotra – Founder, The 365 Circle</h2>
        <div className="timeline-content">
          <div className="timeline-row timeline-dates">
            {timelineData.map((step) => (
              <div key={step.id} className="timeline-cell">
                <div className="timeline-date">{step.date}</div>
              </div>
            ))}
          </div>

          <div className="timeline-row timeline-dots-wrapper">
            <div className="timeline-line-container">
              <div
                className={`timeline-gradient-bar${animateLine ? " timeline-gradient-bar-animate" : ""}`}
                style={{ width: animateLine ? "100%" : "0%" }}
              />
            </div>
            {timelineData.map((step, idx) => (
              <div key={step.id} className="timeline-cell timeline-dot-cell">
                <div className="timeline-dot">{idx + 1}</div>
              </div>
            ))}
          </div>

          <div className="timeline-row timeline-labels">
            {timelineData.map((step) => {
              const is365 = step.title === "365";
              return (
                <div key={step.id} className="timeline-cell timeline-label-cell">
                  <div className="timeline-logo" style={{ marginBottom: 8, display: "flex", justifyContent: "center", position: "relative" }}>
                    {is365 && (
                      <span style={{
                        position: "absolute", left: "50%", top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 60, height: 60, borderRadius: "50%",
                        background: "rgba(96,165,250,0.25)", zIndex: 0,
                        animation: "pulse-blue 1.5s infinite",
                      }} />
                    )}
                    <Image
                      src={logoMap[step.title] || "/logo.png"}
                      alt={step.title}
                      width={70}
                      height={70}
                      style={{ objectFit: "contain", width: 70, height: 70, borderRadius: 10, position: "relative", zIndex: 1 }}
                    />
                  </div>
                  <div className="timeline-position" style={{ marginTop: 8, lineHeight: 1.5, fontSize: 13, minHeight: 24 }}>
                    {getPositionNode(step.position)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── MOBILE ─── */}
      <div ref={mobileRef} className="timeline-mobile">
        <h2 className="mobile-heading">Anish Malhotra – Founder, The 365 Circle</h2>

        <div className="mobile-track">
          {/* The vertical line sits behind everything */}
          <div className="mobile-vline" style={{ height: mobileVisible ? "calc(100% - 28px)" : "0%" }} />

          {timelineData.map((step, idx) => {
            const is365 = step.title === "365";
            return (
              <div
                key={step.id}
                className={`mobile-step${mobileVisible ? " mobile-step-visible" : ""}`}
                style={{ animationDelay: `${idx * 0.12}s`, transitionDelay: `${idx * 0.12}s` }}
              >
                {/* LEFT COL: dot (in normal flow, not absolute) */}
                <div className="mobile-dot-col">
                  <div className={`mobile-dot${is365 ? " mobile-dot-active" : ""}`}>
                    {idx + 1}
                  </div>
                </div>

                {/* RIGHT COL: card */}
                <div className={`mobile-card${is365 ? " mobile-card-active" : ""}`}>
                  <div className="mobile-card-date">{step.date}</div>
                  <div className="mobile-card-logo-wrap">
                    {is365 && <span className="mobile-pulse-ring" />}
                    <Image
                      src={logoMap[step.title] || "/logo.png"}
                      alt={step.title}
                      width={44}
                      height={44}
                      style={{ objectFit: "contain", width: 44, height: 44, borderRadius: 8, position: "relative", zIndex: 1 }}
                    />
                  </div>
                  <div className="mobile-card-company">{step.title}</div>
                  <div className="mobile-card-role">{getPositionNode(step.position)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Breakpoints ── */
        .timeline-desktop { display: block; }
        .timeline-mobile  { display: none;  }

        @media (max-width: 640px) {
          .timeline-desktop { display: none !important; }
          .timeline-mobile  { display: block; padding: 28px 16px 40px; }
        }

        /* ── Desktop (unchanged) ── */
        .timeline-content { min-height: 160px; width: 100%; }
        .timeline-row { display: flex; justify-content: center; align-items: flex-end; width: 100%; }
        .timeline-dates { margin-bottom: 10px; }
        .timeline-labels { margin-top: 28px; }
        .timeline-cell { flex: 1; min-width: 60px; text-align: center; }
        .timeline-date { font-size: 12px; color: #2563eb; font-weight: 600; margin-bottom: 2px; }
        .timeline-dots-wrapper { position: relative; align-items: center; min-height: 60px; }
        .timeline-line-container {
          position: absolute; left: 0; right: 0; top: 50%;
          transform: translateY(-50%); height: 7px; z-index: 1;
          border-radius: 6px; overflow: hidden;
        }
        .timeline-dot-cell { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
        .timeline-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: #fff; border: 4px solid #2563eb;
          box-shadow: 0 2px 10px rgba(37,99,235,0.10);
          display: flex; align-items: center; justify-content: center;
          color: #2563eb; font-weight: 800; font-size: 16px; z-index: 2;
        }
        .timeline-gradient-bar {
          background: linear-gradient(270deg, #2563eb, #fff, #2563eb, #60a5fa, #fff, #2563eb);
          background-size: 400% 400%; height: 100%; border-radius: 6px;
          transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .timeline-gradient-bar-animate { animation: gradientMove 3s linear infinite; }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; }
        }
        .timeline-label-cell {
          display: flex; flex-direction: column; align-items: center;
          justify-content: flex-start; gap: 4px; min-height: 48px;
        }
        .timeline-position { font-size: 12px; color: #2563eb; font-weight: 500; }
        @keyframes pulse-blue {
          0%   { box-shadow: 0 0 0 0  rgba(96,165,250,0.25); }
          70%  { box-shadow: 0 0 0 16px rgba(96,165,250,0.05); }
          100% { box-shadow: 0 0 0 0  rgba(96,165,250,0.25); }
        }

        /* ══════════════════════════════
           MOBILE  — fixed structure
        ══════════════════════════════ */
        .mobile-heading {
          font-size: 16px; font-weight: 700; color: #0f172a;
          margin-bottom: 32px; line-height: 1.5;
        }

        /* Wrapper: relative so the vline can span its full height */
        .mobile-track {
          position: relative;
        }

        /* Vertical line: sits behind dots, spans track height */
        .mobile-vline {
          position: absolute;
          /* horizontally centered on the 32px dot column (16px center) */
          left: 15px;
          top: 14px;
          width: 3px;
          border-radius: 4px;
          background: linear-gradient(180deg, #2563eb 0%, #60a5fa 50%, #2563eb 100%);
          background-size: 100% 400%;
          animation: mobileLineFlow 3s linear infinite;
          transition: height 1.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }
        @keyframes mobileLineFlow {
          0% { background-position: 0 0; } 100% { background-position: 0 400%; }
        }

        /* Each row: flex, dot on left (in normal flow), card on right */
        .mobile-step {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateX(-14px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .mobile-step-visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Dot column: fixed width, keeps the dot in flex flow */
        .mobile-dot-col {
          flex: 0 0 32px;       /* never shrinks/grows, always 32px wide */
          width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 10px;    /* vertically align dot with card top text */
          position: relative;
          z-index: 2;
        }

        .mobile-dot {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #2563eb;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800; color: #2563eb;
          box-shadow: 0 2px 8px rgba(37,99,235,0.15);
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }
        .mobile-dot-active {
          background: #2563eb;
          color: #fff;
          animation: mobileDotPulse 1.5s infinite;
        }
        @keyframes mobileDotPulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(96,165,250,0.2); }
          50%      { box-shadow: 0 0 0 12px rgba(96,165,250,0.06); }
        }

        /* Card: takes remaining width */
        .mobile-card {
          flex: 1;
          min-width: 0;            /* prevents overflow */
          background: #fff;
          border-radius: 14px;
          padding: 12px 14px 14px;
          box-shadow: 0 2px 14px rgba(37,99,235,0.08);
          border: 1px solid #e8efff;
        }
        .mobile-card-active {
          border-color: #bfdbfe;
          background: linear-gradient(135deg, #eff6ff 0%, #fff 100%);
        }

        .mobile-card-date {
          font-size: 10px; font-weight: 700; color: #2563eb;
          letter-spacing: 0.5px; text-transform: uppercase;
          margin-bottom: 8px;
        }

        .mobile-card-logo-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
        }
        .mobile-pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: rgba(96,165,250,0.2);
          animation: pulse-blue 1.5s infinite;
          z-index: 0;
        }

        .mobile-card-company {
          font-size: 14px; font-weight: 700; color: #0f172a;
          margin-bottom: 3px;
        }
        .mobile-card-active .mobile-card-company { color: #2563eb; }

        .mobile-card-role {
          font-size: 12px; color: #64748b; font-weight: 500;
          line-height: 1.5;
        }
      `}</style>
    </>
  );
}