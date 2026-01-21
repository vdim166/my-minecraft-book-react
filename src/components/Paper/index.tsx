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

  const [tempIndexBack, setTempIndexBack] = useState(false);

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

      document.body.style.cursor = "grab";
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isAddListener?.type === "FRONT") {
        if (degrees < -180 / 2) {
          setDegrees(-180);

          if (flippedFn) {
            flippedFn();
          }
        } else {
          setDegrees(0);
        }
      }

      if (isAddListener?.type === "BACK") {
        if (degrees > -180 / 2) {
          setDegrees(0);

          if (flippedBackFn) {
            flippedBackFn();
          }
        } else {
          setDegrees(-180);
        }
      }

      setIsAddListener(null);
      setTempIndexBack(false);
      document.body.style.cursor = "auto";
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
      className="paper"
      style={{
        zIndex: tempIndexBack ? 51 : zIndex,
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
      >
        <div className="front-content">{frontContent}</div>

        <div
          onMouseDown={(e) => {
            setX(e.clientX);
            setIsAddListener({ type: "FRONT" });
          }}
          className="front-grab-end"
        >
          <div className="edge"></div>
          <div className="other-page-end"></div>
        </div>
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
      >
        <div className="back-content">{backContent}</div>

        <div
          onMouseDown={(e) => {
            setX(e.clientX);
            setIsAddListener({ type: "BACK" });

            setTempIndexBack(true);
          }}
          className="back-grab-end"
        >
          <div className="edge"></div>
          <div className="other-page-end"></div>
        </div>
      </div>
    </div>
  );
};
