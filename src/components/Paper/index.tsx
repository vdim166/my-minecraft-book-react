import { useEffect, useState } from "react";
import "./styles.css";

type PaperProps = {
  frontContent: string;
  backContent: string;
  zIndex: number;
  degrees?: number;
  flippedFn?: () => void;
  flippedBackFn?: () => void;
};

export const Paper = ({
  frontContent,
  backContent,
  zIndex,
  flippedFn,
  flippedBackFn,
}: PaperProps) => {
  const [isAddListener, setIsAddListener] = useState<{
    type: "FRONT" | "BACK";
  } | null>(null);

  const [degrees, setDegrees] = useState<number>(0);

  const [x, setX] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!x) return;

      const mul = 0.7;
      let result: number;

      if (isAddListener?.type === "FRONT") {
        result = x * mul - e.clientX * mul;
      } else {
        result = 180 - (e.clientX * mul - x * mul);
      }

      if (result < 0) {
        result = 0;
      }

      result = result > 180 ? 180 : result;
      setDegrees(-result);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isAddListener?.type === "FRONT") {
        if (flippedFn && degrees === -180) {
          flippedFn();
        }
      }

      if (isAddListener?.type === "BACK") {
        if (flippedBackFn && degrees === 0) {
          flippedBackFn();
        }
      }

      setIsAddListener(null);
    };

    if (isAddListener !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isAddListener, x, degrees]);

  return (
    <div
      className={`paper `}
      style={{
        zIndex,
      }}
    >
      <div
        className="front"
        style={
          degrees
            ? {
                transform: `rotateY(${degrees}deg)`,
              }
            : {}
        }
        onMouseDown={(e) => {
          setX(e.clientX);
          setIsAddListener({ type: "FRONT" });
        }}
      >
        <div className="front-content">{frontContent}</div>
      </div>
      <div
        className="back"
        style={
          degrees
            ? {
                transform: `rotateY(${degrees}deg)`,
              }
            : {}
        }
        onMouseDown={(e) => {
          setX(e.clientX);
          setIsAddListener({ type: "BACK" });
        }}
      >
        <div className="back-content">{backContent}</div>
      </div>
    </div>
  );
};
