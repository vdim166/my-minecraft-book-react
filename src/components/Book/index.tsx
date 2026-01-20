import { useEffect, useState } from "react";
import { Paper } from "../Paper";
import "./styles.css";

export const Book = () => {
  const [currentBook, setCurrentBook] = useState(false);

  const [currentPaper, setCurrentPaper] = useState(0);

  // useEffect(() => {
  //   let inter: number;

  //   if (flippedDegrees < 180) {
  //     inter = setInterval(() => {
  //       setFlippedDegrees(flippedDegrees + 5);
  //     }, 200);
  //   }
  //   return () => {
  //     if (inter) clearInterval(inter);
  //   };
  // }, [flippedDegrees]);

  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "5px",
        }}
        onClick={() => {
          setCurrentBook((prev) => !prev);
        }}
      >
        press
      </button>
      <div className="book">
        <Paper
          frontContent="1"
          backContent="2"
          zIndex={currentPaper === 0 ? 50 : 3}
          flippedFn={() => {
            setCurrentPaper(1);
          }}
          flippedBackFn={() => {
            setCurrentPaper(0);
          }}
        />
        <Paper
          frontContent="3"
          backContent="4"
          zIndex={currentPaper === 1 ? 50 : 2}
          flippedFn={() => {
            setCurrentPaper(2);
          }}
          flippedBackFn={() => {
            setCurrentPaper(1);
          }}
        />
        <Paper
          frontContent="5"
          backContent="6"
          zIndex={currentPaper === 2 ? 50 : 1}
          flippedFn={() => {
            setCurrentPaper(3);
          }}
          flippedBackFn={() => {
            setCurrentPaper(2);
          }}
        />
      </div>
    </>
  );
};
