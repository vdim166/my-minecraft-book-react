import { useState } from "react";
import { Paper } from "../Paper";
import "./styles.css";
import { Cover } from "../Cover";
import { PaperContent } from "../PaperContent";

export const Book = () => {
  const [currentPaper, setCurrentPaper] = useState(0);

  const calcZIndex = (index: number, defaultIndex: number) => {
    if (currentPaper - 1 === index) return 49;

    if (currentPaper === index) return 50;

    if (currentPaper - 2 === index) return 48;

    return defaultIndex;
  };

  const [paperContent, setPaperContent] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const setContentByIndex = (index: number, value: string) => {
    setPaperContent((prev) => {
      const newState = [...prev];
      newState[index] = value;
      return newState;
    });
  };

  return (
    <>
      <div className="book">
        <Cover
          frontContent=""
          backContent=""
          zIndex={calcZIndex(0, 5)}
          flippedFn={() => {
            setCurrentPaper(1);
          }}
          flippedBackFn={() => {
            setCurrentPaper(0);
          }}
        />

        <Paper
          frontContent={
            <PaperContent
              currentPaper={1}
              allPapers={6}
              content={paperContent[0]}
              setContent={(value) => setContentByIndex(0, value)}
              nextPageHandle={(letter) => {
                setPaperContent((prev) => {
                  const newState = [...prev];

                  newState[1] = `${letter}${newState[1]}`;

                  return newState;
                });
              }}
            />
          }
          backContent={
            <PaperContent
              currentPaper={2}
              allPapers={6}
              content={paperContent[1]}
              setContent={(value) => setContentByIndex(1, value)}
              nextPageHandle={(letter) => {
                setPaperContent((prev) => {
                  const newState = [...prev];

                  newState[2] = `${letter}${newState[2]}`;

                  return newState;
                });
              }}
            />
          }
          zIndex={calcZIndex(1, 4)}
          flippedFn={() => {
            setCurrentPaper(2);
          }}
          flippedBackFn={() => {
            setCurrentPaper(1);
          }}
          shouldHideBackEdge={currentPaper === 1}
        />

        <Paper
          frontContent={
            <PaperContent
              currentPaper={3}
              allPapers={6}
              content={paperContent[2]}
              setContent={(value) => setContentByIndex(2, value)}
              nextPageHandle={(letter) => {
                setPaperContent((prev) => {
                  const newState = [...prev];

                  newState[3] = `${letter}${newState[3]}`;

                  return newState;
                });
              }}
            />
          }
          backContent={
            <PaperContent
              currentPaper={4}
              allPapers={6}
              content={paperContent[3]}
              setContent={(value) => setContentByIndex(3, value)}
              nextPageHandle={(letter) => {
                setPaperContent((prev) => {
                  const newState = [...prev];

                  newState[4] = `${letter}${newState[4]}`;

                  return newState;
                });
              }}
            />
          }
          zIndex={calcZIndex(2, 3)}
          flippedFn={() => {
            setCurrentPaper(3);
          }}
          flippedBackFn={() => {
            setCurrentPaper(2);
          }}
          shouldHideBackEdge={currentPaper === 2}
        />

        <Paper
          frontContent={
            <PaperContent
              currentPaper={5}
              allPapers={6}
              content={paperContent[4]}
              setContent={(value) => setContentByIndex(4, value)}
              nextPageHandle={(letter) => {
                setPaperContent((prev) => {
                  const newState = [...prev];

                  newState[5] = `${letter}${newState[5]}`;

                  return newState;
                });
              }}
            />
          }
          backContent={
            <PaperContent
              currentPaper={6}
              allPapers={6}
              content={paperContent[5]}
              setContent={(value) => setContentByIndex(5, value)}
              nextPageHandle={(letter) => {
                setPaperContent((prev) => {
                  const newState = [...prev];

                  newState[6] = `${letter}${newState[6]}`;

                  return newState;
                });
              }}
            />
          }
          zIndex={calcZIndex(3, 2)}
          flippedFn={() => {
            setCurrentPaper(4);
          }}
          flippedBackFn={() => {
            setCurrentPaper(3);
          }}
          shouldHideBackEdge={currentPaper === 3}
        />
        <Cover
          frontContent=""
          backContent=""
          zIndex={calcZIndex(4, 1)}
          flippedFn={() => {
            setCurrentPaper(5);
          }}
          flippedBackFn={() => {
            setCurrentPaper(4);
          }}
        />
      </div>
    </>
  );
};
