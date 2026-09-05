import { useEffect, useRef, useState } from "react";

interface HouseNode {
  id: string;
  name: string;
  type: "residential" | "commercial" | "institutional";
  meterNo: string;
  initialReading: number;
  flowMultiplier: number;
  icon: string;
  x: number;
  y: number;
}

const houses: HouseNode[] = [
  {
    id: "h1",
    name: "Caadlawon Residence",
    type: "residential",
    meterNo: "WM-2026-0814",
    initialReading: 124.5,
    flowMultiplier: 1.0,
    icon: "🏡",
    x: 320,
    y: 80,
  },
  {
    id: "h2",
    name: "Bagamanoc Gold Bakery",
    type: "commercial",
    meterNo: "WM-2026-0192",
    initialReading: 489.2,
    flowMultiplier: 2.8,
    icon: "🥖",
    x: 620,
    y: 80,
  },
  {
    id: "h3",
    name: "Central Elem. School",
    type: "institutional",
    meterNo: "WM-2026-0441",
    initialReading: 312.8,
    flowMultiplier: 2.2,
    icon: "🏫",
    x: 320,
    y: 270,
  },
  {
    id: "h4",
    name: "AquaPure Water Refilling",
    type: "commercial",
    meterNo: "WM-2026-0905",
    initialReading: 840.1,
    flowMultiplier: 3.5,
    icon: "💧",
    x: 620,
    y: 270,
  },
];

export default function WaterGridSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<"normal" | "peak" | "leak" | "night">("normal");
  const [selectedHouse, setSelectedHouse] = useState<HouseNode>(houses[0]);
  const [readings, setReadings] = useState<Record<string, number>>({
    h1: 124.5,
    h2: 489.2,
    h3: 312.8,
    h4: 840.1,
  });

  const modeRef = useRef(mode);
  modeRef.current = mode;

  // Live consumption ticking loop
  useEffect(() => {
    const interval = setInterval(() => {
      const speed =
        modeRef.current === "peak"
          ? 0.08
          : modeRef.current === "night"
          ? 0.005
          : modeRef.current === "leak"
          ? 0.15
          : 0.02;

      setReadings((prev) => {
        const next = { ...prev };
        houses.forEach((h) => {
          const leakBonus = modeRef.current === "leak" && h.id === "h2" ? 0.35 : 0;
          next[h.id] = Number((next[h.id] + h.flowMultiplier * speed + leakBonus).toFixed(2));
        });
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Water particle flow canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    // Particle pool for water flow along pipes
    interface Particle {
      pathIndex: number;
      progress: number;
      speed: number;
      size: number;
      alpha: number;
    }

    const paths = [
      // From tank (80, 190) -> Junction (220, 190)
      { from: { x: 90, y: 190 }, to: { x: 220, y: 190 } },
      // Junction -> Top spine (220, 110)
      { from: { x: 220, y: 190 }, to: { x: 220, y: 110 } },
      // Junction -> Bottom spine (220, 300)
      { from: { x: 220, y: 190 }, to: { x: 220, y: 300 } },
      // Top spine -> House 1 (320, 110)
      { from: { x: 220, y: 110 }, to: { x: 320, y: 110 } },
      // House 1 -> House 2 (620, 110)
      { from: { x: 370, y: 110 }, to: { x: 620, y: 110 } },
      // Bottom spine -> House 3 (320, 300)
      { from: { x: 220, y: 300 }, to: { x: 320, y: 300 } },
      // House 3 -> House 4 (620, 300)
      { from: { x: 370, y: 300 }, to: { x: 620, y: 300 } },
    ];

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      pathIndex: Math.floor(Math.random() * paths.length),
      progress: Math.random(),
      speed: 0.006 + Math.random() * 0.008,
      size: 2 + Math.random() * 2.5,
      alpha: 0.4 + Math.random() * 0.6,
    }));

    let wavePhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isPeak = modeRef.current === "peak";
      const isLeak = modeRef.current === "leak";
      const isNight = modeRef.current === "night";

      const speedMult = isPeak ? 2.5 : isNight ? 0.35 : isLeak ? 1.8 : 1.0;

      // Draw Pipe Network Lines
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.strokeStyle = isLeak ? "rgba(225, 29, 72, 0.4)" : "rgba(2, 132, 199, 0.25)";

      paths.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.from.x, p.from.y);
        ctx.lineTo(p.to.x, p.to.y);
        ctx.stroke();
      });

      // Inner glowing core
      ctx.lineWidth = 2;
      ctx.strokeStyle = isLeak ? "#f43f5e" : "#38bdf8";
      paths.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.from.x, p.from.y);
        ctx.lineTo(p.to.x, p.to.y);
        ctx.stroke();
      });

      // Animate and draw water particles
      particles.forEach((pt) => {
        pt.progress += pt.speed * speedMult;
        if (pt.progress >= 1) {
          pt.progress = 0;
          pt.pathIndex = Math.floor(Math.random() * paths.length);
        }

        const path = paths[pt.pathIndex];
        const px = path.from.x + (path.to.x - path.from.x) * pt.progress;
        const py = path.from.y + (path.to.y - path.from.y) * pt.progress;

        ctx.fillStyle = isLeak ? "rgba(244, 63, 94, " + pt.alpha + ")" : "rgba(56, 189, 248, " + pt.alpha + ")";
        ctx.shadowColor = isLeak ? "#f43f5e" : "#38bdf8";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // If leak mode, draw bursting pulse effect at Bakery junction (480, 110)
      if (isLeak) {
        wavePhase += 0.08;
        const pulseR = 12 + Math.sin(wavePhase * 3) * 8;
        ctx.strokeStyle = "rgba(225, 29, 72, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(480, 110, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#e11d48";
        ctx.font = "bold 10px monospace";
        ctx.fillText("⚠️ BURST LEAK (+360% SPIKE)", 420, 90);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: "radial-gradient(ellipse at center, rgba(15, 23, 42, 0.95) 0%, #090e17 100%)",
        border: "1px solid rgba(56, 189, 248, 0.2)",
        borderRadius: "16px",
        padding: "24px",
        color: "#f8fafc",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 50px -10px rgba(2, 132, 199, 0.15)",
      }}
    >
      {/* Header bar with controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#38bdf8", textTransform: "uppercase" }}>
            Municipal SCADA & Pressure Grid Simulator
          </span>
          <h3 style={{ margin: "2px 0 0", fontSize: "17px", fontWeight: 800 }}>
            Bagamanoc Waterworks Live Distribution Grid
          </h3>
        </div>

        {/* Mode Selector Buttons */}
        <div style={{ display: "flex", gap: "6px", background: "rgba(255,255,255,0.05)", padding: "4px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            type="button"
            onClick={() => setMode("normal")}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: 0,
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              background: mode === "normal" ? "#0284c7" : "transparent",
              color: mode === "normal" ? "#fff" : "#94a3b8",
            }}
          >
            💧 Normal Flow
          </button>
          <button
            type="button"
            onClick={() => setMode("peak")}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: 0,
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              background: mode === "peak" ? "#3b82f6" : "transparent",
              color: mode === "peak" ? "#fff" : "#94a3b8",
            }}
          >
            ⚡ Morning Peak (7 AM)
          </button>
          <button
            type="button"
            onClick={() => setMode("leak")}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: 0,
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              background: mode === "leak" ? "#e11d48" : "transparent",
              color: mode === "leak" ? "#fff" : "#fca5a5",
            }}
          >
            🔴 Simulate Leak Anomaly
          </button>
        </div>
      </div>

      {/* Main Grid Viewport */}
      <div style={{ position: "relative", minHeight: "380px", width: "100%" }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
        />

        {/* Elevated Water Reservoir Station */}
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "130px",
            zIndex: 2,
            background: "rgba(15, 23, 42, 0.85)",
            border: "1.5px solid #0284c7",
            borderRadius: "12px",
            padding: "14px",
            width: "120px",
            textAlign: "center",
            boxShadow: "0 0 20px rgba(2, 132, 199, 0.3)",
          }}
        >
          <div style={{ fontSize: "28px" }}>🏰</div>
          <strong style={{ fontSize: "11px", display: "block", color: "#38bdf8", marginTop: "4px" }}>
            CENTRAL TANK
          </strong>
          <span style={{ fontSize: "10px", color: "#94a3b8" }}>Elev. 50,000L</span>
          <div style={{ marginTop: "6px", height: "4px", background: "#1e293b", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: mode === "peak" ? "55%" : "85%", height: "100%", background: "#38bdf8", transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Household Meter Cards */}
        {houses.map((h) => {
          const isSelected = selectedHouse.id === h.id;
          const isLeaking = mode === "leak" && h.id === "h2";

          return (
            <div
              key={h.id}
              onClick={() => setSelectedHouse(h)}
              style={{
                position: "absolute",
                left: h.x + "px",
                top: h.y + "px",
                zIndex: 3,
                width: "210px",
                background: isSelected
                  ? "rgba(30, 41, 59, 0.95)"
                  : "rgba(15, 23, 42, 0.8)",
                border: isLeaking
                  ? "2px solid #e11d48"
                  : isSelected
                  ? "2px solid #38bdf8"
                  : "1px solid rgba(255,255,255,0.12)",
                borderRadius: "12px",
                padding: "12px",
                cursor: "pointer",
                transition: "all 0.18s ease",
                boxShadow: isLeaking
                  ? "0 0 25px rgba(225, 29, 72, 0.4)"
                  : isSelected
                  ? "0 0 20px rgba(56, 189, 248, 0.3)"
                  : "none",
                transform: isSelected ? "scale(1.03)" : "scale(1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "18px" }}>{h.icon}</span>
                <span
                  style={{
                    fontSize: "9.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    background: isLeaking ? "rgba(225, 29, 72, 0.2)" : "rgba(2, 132, 199, 0.2)",
                    color: isLeaking ? "#f87171" : "#38bdf8",
                  }}
                >
                  {isLeaking ? "FLAGGED LEAK" : h.type}
                </span>
              </div>

              <strong style={{ fontSize: "12px", display: "block", color: "#f8fafc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {h.name}
              </strong>
              <span style={{ fontSize: "10px", color: "#94a3b8" }}>{h.meterNo}</span>

              <div style={{ marginTop: "8px", padding: "6px 8px", background: "rgba(0,0,0,0.3)", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "#64748b" }}>Live Index:</span>
                <strong style={{ fontSize: "13px", color: isLeaking ? "#f43f5e" : "#38bdf8", fontFamily: "monospace" }}>
                  {readings[h.id]} m³
                </strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Household Detail Ribbon */}
      <div style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>{selectedHouse.icon}</span>
          <div>
            <strong style={{ fontSize: "13px" }}>{selectedHouse.name}</strong>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#94a3b8" }}>
              Meter: <strong>{selectedHouse.meterNo}</strong> • Category: <strong>{selectedHouse.type.toUpperCase()}</strong>
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "10px", color: "#94a3b8", display: "block" }}>Cumulative Volume</span>
            <strong style={{ fontSize: "14px", color: "#38bdf8" }}>{readings[selectedHouse.id]} m³</strong>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "10px", color: "#94a3b8", display: "block" }}>Current Status</span>
            <strong style={{ fontSize: "12px", color: mode === "leak" && selectedHouse.id === "h2" ? "#f43f5e" : "#10b981" }}>
              {mode === "leak" && selectedHouse.id === "h2" ? "⚠️ Anomaly Flagged" : "✓ Telemetry Online"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
