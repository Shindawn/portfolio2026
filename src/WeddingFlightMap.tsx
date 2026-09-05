import { useEffect, useRef, useState } from "react";

interface GuestOrigin {
  id: string;
  city: string;
  country: string;
  flag: string;
  role: string;
  guestCount: number;
  distanceKm: number;
  rsvpStatus: string;
  x: number;
  y: number;
  color: string;
}

const venue = {
  name: "Catanduanes Wedding Destination",
  country: "Philippines",
  x: 480,
  y: 240,
};

const origins: GuestOrigin[] = [
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    role: "Groom's Cousins & Close Family",
    guestCount: 6,
    distanceKm: 3012,
    rsvpStatus: "Confirmed • Flight Booked",
    x: 620,
    y: 80,
    color: "#ec4899",
  },
  {
    id: "sf",
    city: "San Francisco / LA",
    country: "United States",
    flag: "🇺🇸",
    role: "Bride's Aunties & College Circle",
    guestCount: 8,
    distanceKm: 11420,
    rsvpStatus: "Confirmed • Attending",
    x: 800,
    y: 110,
    color: "#f59e0b",
  },
  {
    id: "london",
    city: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    role: "Principal Sponsors (Ninong & Ninang)",
    guestCount: 4,
    distanceKm: 10780,
    rsvpStatus: "Confirmed • Attending",
    x: 160,
    y: 70,
    color: "#3b82f6",
  },
  {
    id: "sydney",
    city: "Sydney",
    country: "Australia",
    flag: "🇦🇺",
    role: "Entourage / Bridesmaids Circle",
    guestCount: 5,
    distanceKm: 6190,
    rsvpStatus: "Confirmed • Attending",
    x: 680,
    y: 330,
    color: "#10b981",
  },
  {
    id: "manila",
    city: "Metro Manila",
    country: "Philippines",
    flag: "🇵🇭",
    role: "High School & Work Colleagues",
    guestCount: 24,
    distanceKm: 380,
    rsvpStatus: "All 24 Confirmed",
    x: 420,
    y: 200,
    color: "#a855f7",
  },
  {
    id: "cebu",
    city: "Cebu City",
    country: "Philippines",
    flag: "🇵🇭",
    role: "Extended Relatives",
    guestCount: 14,
    distanceKm: 420,
    rsvpStatus: "Confirmed • Ferries Booked",
    x: 470,
    y: 290,
    color: "#06b6d4",
  },
];

export default function WeddingFlightMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<GuestOrigin>(origins[0]);
  const [filter, setFilter] = useState<"all" | "intl" | "ph">("all");

  const totalGuests = origins.reduce((acc, o) => acc + o.guestCount, 0);

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

    // Particle photons flying along bezier curves
    interface FlightPhoton {
      originIndex: number;
      progress: number;
      speed: number;
      size: number;
    }

    const photons: FlightPhoton[] = Array.from({ length: 30 }, () => ({
      originIndex: Math.floor(Math.random() * origins.length),
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.006,
      size: 2.5 + Math.random() * 2,
    }));

    let pulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulse += 0.04;

      // Draw subtle background grid dots
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for (let x = 20; x < width; x += 40) {
        for (let y = 20; y < height; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw flight bezier arcs
      origins.forEach((o, index) => {
        const isSelected = selectedOrigin.id === o.id;
        const isHidden =
          (filter === "intl" && o.country === "Philippines") ||
          (filter === "ph" && o.country !== "Philippines");

        if (isHidden) return;

        // Quadratic curve control point for graceful high arc
        const midX = (o.x + venue.x) / 2;
        const midY = (o.y + venue.y) / 2 - Math.min(120, Math.abs(o.x - venue.x) * 0.35);

        // Arc line
        ctx.beginPath();
        ctx.moveTo(o.x, o.y);
        ctx.quadraticCurveTo(midX, midY, venue.x, venue.y);
        ctx.lineWidth = isSelected ? 2.5 : 1.2;
        ctx.strokeStyle = isSelected ? o.color : "rgba(255, 255, 255, 0.2)";
        ctx.stroke();

        // Origin glow pulse
        ctx.fillStyle = o.color;
        ctx.shadowColor = o.color;
        ctx.shadowBlur = isSelected ? 12 : 4;
        ctx.beginPath();
        ctx.arc(o.x, o.y, isSelected ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Animate travelling light photons
      photons.forEach((p) => {
        const o = origins[p.originIndex];
        const isHidden =
          (filter === "intl" && o.country === "Philippines") ||
          (filter === "ph" && o.country !== "Philippines");

        if (isHidden) return;

        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.originIndex = Math.floor(Math.random() * origins.length);
        }

        const midX = (o.x + venue.x) / 2;
        const midY = (o.y + venue.y) / 2 - Math.min(120, Math.abs(o.x - venue.x) * 0.35);

        // Calculate quadratic bezier point at progress t
        const t = p.progress;
        const bx = (1 - t) * (1 - t) * o.x + 2 * (1 - t) * t * midX + t * t * venue.x;
        const by = (1 - t) * (1 - t) * o.y + 2 * (1 - t) * t * midY + t * t * venue.y;

        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = o.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(bx, by, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Destination Venue Pulse (Philippines)
      const venuePulse = 8 + Math.sin(pulse) * 4;
      ctx.strokeStyle = "rgba(236, 72, 153, 0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(venue.x, venue.y, venuePulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#ec4899";
      ctx.shadowColor = "#ec4899";
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(venue.x, venue.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [selectedOrigin, filter]);

  return (
    <div
      style={{
        background: "radial-gradient(ellipse at center, #181824 0%, #0c0d14 100%)",
        border: "1px solid rgba(236, 72, 153, 0.25)",
        borderRadius: "16px",
        padding: "24px",
        color: "#f8fafc",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 60px -12px rgba(236, 72, 153, 0.15)",
      }}
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#f472b6", textTransform: "uppercase" }}>
            Global Guest Flight & Travel Matrix
          </span>
          <h3 style={{ margin: "2px 0 0", fontSize: "17px", fontWeight: 800 }}>
            Wedding Odyssey: Welcoming Guests Across the Globe
          </h3>
        </div>

        {/* Filter buttons */}
        <div style={{ display: "flex", gap: "6px", background: "rgba(255,255,255,0.05)", padding: "4px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            type="button"
            onClick={() => setFilter("all")}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: 0,
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              background: filter === "all" ? "#ec4899" : "transparent",
              color: filter === "all" ? "#fff" : "#94a3b8",
            }}
          >
            🌍 All ({totalGuests} Guests)
          </button>
          <button
            type="button"
            onClick={() => setFilter("intl")}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: 0,
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              background: filter === "intl" ? "#ec4899" : "transparent",
              color: filter === "intl" ? "#fff" : "#94a3b8",
            }}
          >
            ✈️ International (23)
          </button>
          <button
            type="button"
            onClick={() => setFilter("ph")}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: 0,
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              background: filter === "ph" ? "#ec4899" : "transparent",
              color: filter === "ph" ? "#fff" : "#94a3b8",
            }}
          >
            🇵🇭 Philippines (38)
          </button>
        </div>
      </div>

      {/* Interactive Map Viewport */}
      <div style={{ position: "relative", minHeight: "380px", width: "100%" }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
        />

        {/* Destination Pin Marker */}
        <div
          style={{
            position: "absolute",
            left: `${venue.x - 70}px`,
            top: `${venue.y + 16}px`,
            zIndex: 4,
            background: "rgba(236, 72, 153, 0.9)",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 700,
            color: "#fff",
            boxShadow: "0 4px 15px rgba(236, 72, 153, 0.5)",
            pointerEvents: "none",
          }}
        >
          💍 Wedding Venue
        </div>

        {/* Interactive Origin City Markers */}
        {origins.map((o) => {
          const isSelected = selectedOrigin.id === o.id;
          return (
            <div
              key={o.id}
              onClick={() => setSelectedOrigin(o)}
              style={{
                position: "absolute",
                left: `${o.x - 10}px`,
                top: `${o.y - 30}px`,
                zIndex: 3,
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "6px",
                background: isSelected ? "rgba(255, 255, 255, 0.95)" : "rgba(15, 23, 42, 0.75)",
                color: isSelected ? "#0f172a" : "#f8fafc",
                border: isSelected ? `2px solid ${o.color}` : "1px solid rgba(255,255,255,0.15)",
                fontSize: "11px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "4px",
                boxShadow: isSelected ? `0 0 20px ${o.color}` : "none",
                transform: isSelected ? "scale(1.1)" : "scale(1)",
                transition: "all 0.15s ease",
              }}
            >
              <span>{o.flag}</span>
              <span>{o.city}</span>
              <span style={{ fontSize: "10px", opacity: 0.8 }}>({o.guestCount})</span>
            </div>
          );
        })}
      </div>

      {/* Selected Origin Breakdown Card */}
      <div style={{ marginTop: "16px", padding: "14px 18px", background: "rgba(255,255,255,0.04)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "28px" }}>{selectedOrigin.flag}</span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <strong style={{ fontSize: "14px" }}>{selectedOrigin.city}, {selectedOrigin.country}</strong>
              <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "10px", fontWeight: 700, background: "rgba(236, 72, 153, 0.2)", color: "#f472b6" }}>
                {selectedOrigin.guestCount} Guests Confirmed
              </span>
            </div>
            <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#94a3b8" }}>
              {selectedOrigin.role} • Flight Distance: <strong>{selectedOrigin.distanceKm.toLocaleString()} km</strong>
            </p>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "10.5px", color: "#94a3b8", display: "block" }}>RSVP Pipeline Status</span>
          <strong style={{ fontSize: "12.5px", color: "#10b981" }}>✓ {selectedOrigin.rsvpStatus}</strong>
        </div>
      </div>
    </div>
  );
}
