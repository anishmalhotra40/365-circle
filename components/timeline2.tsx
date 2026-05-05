import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const timelineData = [
  { id: 1, date: "2018 – 2019", title: "EazyDiner", position: "Assistant Sales Manager" },
  { id: 2, date: "2019 – 2020", title: "Smytten", position: "Marketing Associate" },
  { id: 3, date: "2020 - 2021", title: "Trinity College Dublin", position: "Master's in Marketing" },
  { id: 4, date: "2021 – 2025", title: "YOUniversal Next", position: "Business Development Specialist" },
  { id: 5, date: "2025 – Present", title: "365", position: "Co-Founder" },
];

const logoMap: Record<string, string> = {
  EazyDiner: "/eazydiner.png",
  Smytten: "/smytten.png",
  "Trinity College Dublin": "/tcd.png",
  "YOUniversal Next": "/uninxt.png",
  "365": "/footerlogo.png",
};

export default function Timeline2() {
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
    if (position.includes("(Hons)")) {
      const [before, after] = position.split("(Hons)");
      return (
        <>
          {before.trim()}
          <br />(Hons)
          {after ? <><br />{after.trim()}</> : null}
        </>
      );
    }
    if (position.includes("Trainer")) {
      const [before, after] = position.split("Trainer");
      return (
        <>
          {before.trim()}
          <br />Trainer
          {after ? <><br />{after.trim()}</> : null}
        </>
      );
    }
    if (position.includes("->")) {
      const [from, to] = position.split("->");
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span>{to.trim()}</span>
          <span style={{ fontSize: 18, lineHeight: 1, color: "#2563eb", fontWeight: 700 }}>↑</span>
          <span>{from.trim()}</span>
        </div>
      );
    }
    return position;
  };

  return (
    <>
      {/* ─── DESKTOP (≥641px) ─── */}
      <div
        ref={timelineRef}
        className="tl2-desktop"
        style={{ width: "100%", maxWidth: 1200, margin: "64px auto 0 auto", padding: 20 }}
      >
        <h2 className="pb-8 font-bold text-2xl">Shrey Anand – Co-Founder, The 365 Circle</h2>
        <div className="tl2-content">
          {/* DATES */}
          <div className="tl2-row tl2-dates">
            {timelineData.map((step) => (
              <div key={step.id} className="tl2-cell">
                <div className="tl2-date">{step.date}</div>
              </div>
            ))}
          </div>

          {/* DOTS + LINE */}
          <div className="tl2-row tl2-dots-wrapper">
            <div className="tl2-line-container">
              <div
                className={`tl2-gradient-bar${animateLine ? " tl2-gradient-bar-animate" : ""}`}
                style={{ width: animateLine ? "100%" : "0%" }}
              />
            </div>
            {timelineData.map((step, idx) => (
              <div key={step.id} className="tl2-cell tl2-dot-cell">
                <div className="tl2-dot">{idx + 1}</div>
              </div>
            ))}
          </div>

          {/* LABELS */}
          <div className="tl2-row tl2-labels">
            {timelineData.map((step) => {
              const is365 = step.title === "365";
              return (
                <div key={step.id} className="tl2-cell tl2-label-cell">
                  <div style={{ marginBottom: 8, display: "flex", justifyContent: "center", position: "relative" }}>
                    {is365 && (
                      <span style={{
                        position: "absolute", left: "50%", top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 60, height: 60, borderRadius: "50%",
                        background: "rgba(96,165,250,0.25)", zIndex: 0,
                        animation: "tl2-pulse-blue 1.5s infinite",
                      }} />
                    )}
                    <Image
                      src={logoMap[step.title] || "/logo.png"}
                      alt={`${step.title} company logo`}
                      width={70}
                      height={70}
                      style={{ objectFit: "contain", width: 70, height: 70, background: "transparent", position: "relative", zIndex: 1 }}
                    />
                  </div>
                  <div className="tl2-position" style={{ marginTop: 8, lineHeight: 1.5, fontSize: 13, minHeight: 24 }}>
                    {getPositionNode(step.position)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── MOBILE (≤640px) ─── */}
      <div ref={mobileRef} className="tl2-mobile">
        <h2 className="tl2-mobile-heading">Shrey Anand – Co-Founder, The 365 Circle</h2>

        <div className="tl2-mobile-track">
          <div
            className="tl2-mobile-vline"
            style={{ height: mobileVisible ? "calc(100% - 28px)" : "0%" }}
          />

          {timelineData.map((step, idx) => {
            const is365 = step.title === "365";
            return (
              <div
                key={step.id}
                className={`tl2-mobile-step${mobileVisible ? " tl2-mobile-step-visible" : ""}`}
                style={{ transitionDelay: `${idx * 0.12}s` }}
              >
                {/* Dot — in normal flex flow, not absolute */}
                <div className="tl2-mobile-dot-col">
                  <div className={`tl2-mobile-dot${is365 ? " tl2-mobile-dot-active" : ""}`}>
                    {idx + 1}
                  </div>
                </div>

                {/* Card */}
                <div className={`tl2-mobile-card${is365 ? " tl2-mobile-card-active" : ""}`}>
                  <div className="tl2-mobile-card-date">{step.date}</div>
                  <div className="tl2-mobile-card-logo-wrap">
                    {is365 && <span className="tl2-mobile-pulse-ring" />}
                    <Image
                      src={logoMap[step.title] || "/logo.png"}
                      alt={`${step.title} company logo`}
                      width={44}
                      height={44}
                      style={{ objectFit: "contain", width: 44, height: 44, borderRadius: 8, position: "relative", zIndex: 1 }}
                    />
                  </div>
                  <div className="tl2-mobile-card-company">{step.title}</div>
                  <div className="tl2-mobile-card-role">{getPositionNode(step.position)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Breakpoints ── */
        .tl2-desktop { display: block; }
        .tl2-mobile  { display: none;  }

        @media (max-width: 640px) {
          .tl2-desktop { display: none !important; }
          .tl2-mobile  { display: block; padding: 28px 16px 40px; }
        }

        /* ── Desktop ── */
        .tl2-content { min-height: 160px; width: 100%; }
        .tl2-row { display: flex; justify-content: center; align-items: flex-end; width: 100%; }
        .tl2-dates { margin-bottom: 10px; }
        .tl2-labels { margin-top: 28px; }
        .tl2-cell { flex: 1; min-width: 60px; text-align: center; }
        .tl2-date { font-size: 12px; color: #2563eb; font-weight: 600; margin-bottom: 2px; }
        .tl2-dots-wrapper { position: relative; align-items: center; min-height: 60px; }
        .tl2-line-container {
          position: absolute; left: 0; right: 0; top: 50%;
          transform: translateY(-50%); height: 7px; z-index: 1;
          border-radius: 6px; overflow: hidden;
        }
        .tl2-dot-cell { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
        .tl2-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: #fff; border: 4px solid #2563eb;
          box-shadow: 0 2px 10px rgba(37,99,235,0.10);
          display: flex; align-items: center; justify-content: center;
          color: #2563eb; font-weight: 800; font-size: 16px; z-index: 2;
        }
        .tl2-gradient-bar {
          background: linear-gradient(270deg, #2563eb, #fff, #2563eb, #60a5fa, #fff, #2563eb);
          background-size: 400% 400%; height: 100%; border-radius: 6px;
          transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .tl2-gradient-bar-animate { animation: tl2-gradientMove 3s linear infinite; }
        @keyframes tl2-gradientMove {
          0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; }
        }
        .tl2-label-cell {
          display: flex; flex-direction: column; align-items: center;
          justify-content: flex-start; gap: 4px; min-height: 48px;
        }
        .tl2-position { font-size: 12px; color: #2563eb; font-weight: 500; }
        @keyframes tl2-pulse-blue {
          0%   { box-shadow: 0 0 0 0   rgba(96,165,250,0.25); }
          70%  { box-shadow: 0 0 0 16px rgba(96,165,250,0.05); }
          100% { box-shadow: 0 0 0 0   rgba(96,165,250,0.25); }
        }

        /* ── Mobile ── */
        .tl2-mobile-heading {
          font-size: 16px; font-weight: 700; color: #0f172a;
          margin-bottom: 32px; line-height: 1.5;
        }
        .tl2-mobile-track { position: relative; }

        .tl2-mobile-vline {
          position: absolute;
          left: 15px; top: 14px;
          width: 3px; border-radius: 4px;
          background: linear-gradient(180deg, #2563eb 0%, #60a5fa 50%, #2563eb 100%);
          background-size: 100% 400%;
          animation: tl2-lineFlow 3s linear infinite;
          transition: height 1.4s cubic-bezier(0.4,0,0.2,1);
          z-index: 0;
        }
        @keyframes tl2-lineFlow {
          0% { background-position: 0 0; } 100% { background-position: 0 400%; }
        }

        .tl2-mobile-step {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateX(-14px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .tl2-mobile-step-visible { opacity: 1; transform: translateX(0); }

        /* Dot column: fixed 32px, in normal flex flow (NOT absolute) */
        .tl2-mobile-dot-col {
          flex: 0 0 32px;
          width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 10px;
          position: relative;
          z-index: 2;
        }
        .tl2-mobile-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: #fff; border: 3px solid #2563eb;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800; color: #2563eb;
          box-shadow: 0 2px 8px rgba(37,99,235,0.15);
          flex-shrink: 0; position: relative; z-index: 2;
        }
        .tl2-mobile-dot-active {
          background: #2563eb; color: #fff;
          animation: tl2-dotPulse 1.5s infinite;
        }
        @keyframes tl2-dotPulse {
          0%,100% { box-shadow: 0 0 0 4px  rgba(96,165,250,0.2);  }
          50%      { box-shadow: 0 0 0 12px rgba(96,165,250,0.06); }
        }

        /* Card: takes all remaining width */
        .tl2-mobile-card {
          flex: 1; min-width: 0;
          background: #fff; border-radius: 14px;
          padding: 12px 14px 14px;
          box-shadow: 0 2px 14px rgba(37,99,235,0.08);
          border: 1px solid #e8efff;
        }
        .tl2-mobile-card-active {
          border-color: #bfdbfe;
          background: linear-gradient(135deg, #eff6ff 0%, #fff 100%);
        }
        .tl2-mobile-card-date {
          font-size: 10px; font-weight: 700; color: #2563eb;
          letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 8px;
        }
        .tl2-mobile-card-logo-wrap {
          position: relative; display: inline-flex;
          align-items: center; justify-content: center; margin-bottom: 6px;
        }
        .tl2-mobile-pulse-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          background: rgba(96,165,250,0.2);
          animation: tl2-pulse-blue 1.5s infinite; z-index: 0;
        }
        @keyframes tl2-pulse-blue {
          0%   { box-shadow: 0 0 0 0   rgba(96,165,250,0.25); }
          70%  { box-shadow: 0 0 0 16px rgba(96,165,250,0.05); }
          100% { box-shadow: 0 0 0 0   rgba(96,165,250,0.25); }
        }
        .tl2-mobile-card-company {
          font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 3px;
        }
        .tl2-mobile-card-active .tl2-mobile-card-company { color: #2563eb; }
        .tl2-mobile-card-role {
          font-size: 12px; color: #64748b; font-weight: 500; line-height: 1.5;
        }
      `}</style>
    </>
  );
}