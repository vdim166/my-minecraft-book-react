import { useState } from "react";
import { Paper } from "../Paper";
import "./styles.css";

export const Book = () => {
  const [currentPaper, setCurrentPaper] = useState(0);

  const calcZIndex = (index: number, defaultIndex: number) => {
    if (currentPaper - 1 === index) return 49;

    if (currentPaper === index) return 50;

    return defaultIndex;
  };

  return (
    <>
      <div className="book">
        <Paper
          frontContent="1"
          backContent="2"
          zIndex={calcZIndex(0, 3)}
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
          zIndex={calcZIndex(1, 2)}
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
          zIndex={calcZIndex(2, 1)}
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
