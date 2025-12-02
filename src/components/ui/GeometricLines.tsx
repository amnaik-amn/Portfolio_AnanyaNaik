"use client";

import { useEffect, useRef } from "react";

interface GeometricLinesProps {
  variant?: "horizontal" | "vertical" | "diagonal" | "grid";
  animated?: boolean;
  className?: string;
}

export function GeometricLines({ variant = "horizontal", animated = true, className = "" }: GeometricLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Use CSS custom properties that respond to theme via globals.css
  const strokeColor = "currentColor";
  const accentColor = "currentColor";

  useEffect(() => {
    if (animated && svgRef.current) {
      const lines = svgRef.current.querySelectorAll(".geometric-line");
      lines.forEach((line, i) => {
        setTimeout(() => {
          line.classList.add("animate");
        }, i * 200);
      });
    }
  }, [animated]);

  const renderLines = () => {
    switch (variant) {
      case "horizontal":
        return (
          <>
            <line x1="0" y1="20" x2="100%" y2="20" className="geometric-line" stroke={strokeColor} strokeWidth="1" />
            <line x1="0" y1="60" x2="100%" y2="60" className="geometric-line" stroke={accentColor} strokeWidth="2" />
            <line x1="0" y1="100" x2="100%" y2="100" className="geometric-line" stroke={strokeColor} strokeWidth="1" />
          </>
        );
      case "vertical":
        return (
          <>
            <line x1="20%" y1="0" x2="20%" y2="100%" className="geometric-line" stroke={strokeColor} strokeWidth="1" />
            <line x1="50%" y1="0" x2="50%" y2="100%" className="geometric-line" stroke={accentColor} strokeWidth="2" />
            <line x1="80%" y1="0" x2="80%" y2="100%" className="geometric-line" stroke={strokeColor} strokeWidth="1" />
          </>
        );
      case "diagonal":
        return (
          <>
            <line x1="0" y1="0" x2="100%" y2="100%" className="geometric-line" stroke={strokeColor} strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" className="geometric-line" stroke={accentColor} strokeWidth="2" />
          </>
        );
      case "grid":
        return (
          <>
            <line x1="0" y1="33%" x2="100%" y2="33%" className="geometric-line" stroke={strokeColor} strokeWidth="1" />
            <line x1="0" y1="66%" x2="100%" y2="66%" className="geometric-line" stroke={strokeColor} strokeWidth="1" />
            <line x1="33%" y1="0" x2="33%" y2="100%" className="geometric-line" stroke={strokeColor} strokeWidth="1" />
            <line x1="66%" y1="0" x2="66%" y2="100%" className="geometric-line" stroke={accentColor} strokeWidth="2" />
          </>
        );
    }
  };

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      preserveAspectRatio="none"
    >
      {renderLines()}
    </svg>
  );
}
