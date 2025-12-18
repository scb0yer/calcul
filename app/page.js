"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState, useRef } from "react";
import Addition10 from "./components/addition10";
import Doubles10 from "./components/doubles10";
import DoublesD50 from "./components/doublesD50";
import Complements10 from "./components/complements10";
import Soustraction2 from "./components/soustraction2";
import Soustraction10 from "./components/soustraction10";

export default function Home() {
  const [index, setIndex] = useState();
  const [sonicPosition, setSonicPosition] = useState({ x: 0, y: 0 });
  const [knucklesPosition, setKnucklesPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [response, setResponse] = useState(null);
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(22);
  const startTimeRef = useRef(null);
  const [points, setPoints] = useState({
    right: 0,
    wrong: 0,
    time: 0,
    total: 0,
  });

  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        if (gameOver) return;
        setResponse(null);
        newCalcul();
      }, 2000); // 5000ms = 5 secondes
      // cleanup pour éviter des timers multiples
      return () => clearTimeout(timer);
    }
  }, [response]);

  useEffect(() => {
    console.log("1", points);
    if (gameOver && points.time >= 0) {
      console.log("2", points);
      const timePerCalcul = points.time / points.right;
      let totalPoints = points.right * 2 - points.wrong;
      for (let s = 6; s < 22; s++) {
        if (timePerCalcul < s) {
          totalPoints += 22 - s;
          setPoints((prev) => ({
            ...prev,
            total: totalPoints,
          }));

          break;
        }
      }
      if (score === 12) {
        setResponse(
          <>
            BRAVO ! 🏆
            <br />
            TU AS GAGNÉ !
            <br />
            SCORE : {totalPoints} ⭐️
          </>
        );
      } else {
        setResponse(
          <>
            KNUCKLES A GAGNÉ. 😢
            <br />
            SCORE : {totalPoints} ⭐️
          </>
        );
        console.log(points);
      }
    }
  }, [points.time]);

  useEffect(() => {
    if (start) {
      startTimeRef.current = Date.now();
      const interval = setInterval(() => {
        setKnucklesPosition((prev) => ({
          ...prev,
          y: prev.y - 42, // monte Knuckles
        }));
      }, time * 1000);
      return () => clearInterval(interval);
    }
  }, [start]);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        if (gameOver) return;
        setGameOver(true);
        setStart(false);
        setPoints((prev) => ({
          ...prev,
          time: time * 12,
        }));
      }, time * 12000);
      return () => clearInterval(interval);
    }
  }, [start]);

  const newCalcul = () => {
    if (!gameOver) {
      setAnswer(null);
      let alea = Math.floor(Math.random() * strategies.length);
      setIndex(alea);
    }
  };

  const checkResult = () => {
    console.log("answer", answer);
    console.log("result", result);
    if (result.toString() === answer.toString()) {
      if (score === 11) {
        setStart(false);
        setScore((prev) => prev + 1);
        const elapsedMs = Date.now() - startTimeRef.current;
        const elapsedSeconds = Math.floor(elapsedMs / 1000);
        setGameOver(true);
        setPoints((prev) => ({
          ...prev,
          time: elapsedSeconds,
          right: prev.right + 1,
        }));
        return;
      } else {
        setScore((prev) => prev + 1);
        setSonicPosition((prev) => ({
          ...prev,
          y: prev.y - 42,
        }));
        setPoints((prev) => ({
          ...prev,
          right: prev.right + 1,
        }));
        setResponse("CONTINUE ! 🚀");
      }
    } else {
      setPoints((prev) => ({
        ...prev,
        wrong: prev.wrong + 1,
      }));
      setResponse(
        <>
          {operation} = {answer}.<br />
          ESSAIE ENCORE ! 💪
        </>
      );
      if (score > 0) {
        setScore((prev) => prev - 1);
        setSonicPosition((prev) => ({
          ...prev,
          y: prev.y + 42,
        }));
      }
    }
    setResult("");
    setIndex(null);
  };

  const strategies = [
    "Addition < 10",
    "Doubles < 10",
    "Doubles Dizaines < 60",
    "Compléments à 10",
    "Soustraction par 2",
    "Soustraction de nombres < 10",
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.game}>
          <div className={styles.layer}>
            <div className={styles.options}>
              <div
                className={styles.option}
                style={{
                  backgroundColor: time === 22 ? "yellow" : "#fff3e2",
                }}
                onClick={() => {
                  if (!start) {
                    setTime(22);
                  }
                }}
              >
                🐢
              </div>
              <div
                className={styles.option}
                style={{
                  backgroundColor: time === 17 ? "yellow" : "#fff3e2",
                }}
                onClick={() => {
                  if (!start) {
                    setTime(17);
                  }
                }}
              >
                🫏
              </div>
              <div
                className={styles.option}
                style={{
                  backgroundColor: time === 12 ? "yellow" : "#fff3e2",
                }}
                onClick={() => {
                  if (!start) {
                    setTime(12);
                  }
                }}
              >
                🐅
              </div>
            </div>
            {gameOver && score === 12 && (
              <Image
                src="/fire.gif"
                alt="Gagné"
                width={350}
                height={350}
                style={{
                  position: "absolute",
                  top: 120,
                  left: 10,
                }}
              />
            )}
            <div className={styles.box}>
              {operation && !response && (
                <div className={styles.operation}>{operation}</div>
              )}
              {response && <div className={styles.response}>{response}</div>}
              {!gameOver && !start && (
                <div className={styles.consigne}>
                  AVANT DE COMMENCER,
                  <br />
                  CHOISIS TA VITESSE :<br /> 🐢 🫏 🐅
                </div>
              )}
            </div>
            {start && !gameOver && (
              <Image
                src="/sonic.png"
                alt="Sonic"
                width={100}
                height={100}
                style={{
                  position: "absolute",
                  top: 560,
                  left: 100,
                  transform: `translate(${sonicPosition.x}px, ${sonicPosition.y}px)`,
                }}
              />
            )}
            {!start && !gameOver && (
              <Image
                src="/start.gif"
                alt="Sonic"
                width={100}
                height={100}
                style={{
                  position: "absolute",
                  top: 560,
                  left: 100,
                  transform: `translate(${sonicPosition.x}px, ${sonicPosition.y}px)`,
                }}
              />
            )}
            {gameOver && score === 12 && (
              <Image
                src="/win.gif"
                alt="Sonic"
                width={100}
                height={100}
                style={{
                  position: "absolute",
                  top: 560,
                  left: 100,
                  transform: `translate(${sonicPosition.x}px, ${sonicPosition.y}px)`,
                }}
              />
            )}
            {gameOver && score < 12 && (
              <Image
                src="/gameover.gif"
                alt="Sonic"
                width={100}
                height={100}
                style={{
                  position: "absolute",
                  top: 560,
                  left: 100,
                  transform: `translate(${sonicPosition.x}px, ${sonicPosition.y}px)`,
                }}
              />
            )}
            <Image
              src="/knuckles.png"
              alt="Knuckles"
              width={100}
              height={100}
              style={{
                position: "absolute",
                top: 560,
                left: 200,
                transform: `translate(${knucklesPosition.x}px, ${knucklesPosition.y}px)`,
              }}
            />
            {!gameOver && (
              <Image
                src="/ring.png"
                alt="Anneau"
                width={70}
                height={70}
                style={{
                  position: "absolute",
                  top: 70,
                  left: 165,
                }}
              />
            )}
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 600,
                left: 184,
                backgroundColor: score <= 0 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 558,
                left: 184,
                backgroundColor: score <= 1 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 516,
                left: 184,
                backgroundColor: score <= 2 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 474,
                left: 184,
                backgroundColor: score <= 3 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 432,
                left: 184,
                backgroundColor: score <= 4 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 390,
                left: 184,
                backgroundColor: score <= 5 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 348,
                left: 184,
                backgroundColor: score <= 6 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 306,
                left: 184,
                backgroundColor: score <= 7 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 264,
                left: 184,
                backgroundColor: score <= 8 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 222,
                left: 184,
                backgroundColor: score <= 9 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 180,
                left: 184,
                backgroundColor: score <= 10 ? "white" : "yellow",
              }}
            ></div>
            <div
              className={styles.dot}
              style={{
                position: "absolute",
                top: 138,
                left: 184,
                backgroundColor: score <= 11 ? "white" : "yellow",
              }}
            ></div>
          </div>
        </div>
        {!operation && (
          <button
            className={styles.btn}
            onClick={() => {
              newCalcul();
              setStart(true);
            }}
          >
            COMMENCER
          </button>
        )}
        {gameOver && (
          <button
            className={styles.btn}
            onClick={() => {
              window.location.reload();
            }}
          >
            REJOUER
          </button>
        )}
        {operation && (
          <div>
            {!gameOver && (
              <div className={styles.actionboard}>
                <div className={styles.result}>{result}</div>

                <div
                  className={styles.key}
                  onClick={() => {
                    if (result) {
                      setResult((prev) => prev.slice(0, -1));
                    }
                  }}
                >
                  ⌫
                </div>

                <div className={styles.validate} onClick={() => checkResult()}>
                  ✅
                </div>
              </div>
            )}

            {!gameOver && (
              <div className={styles.keyboard}>
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev + "1")}
                >
                  1
                </div>
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev + "2")}
                >
                  2
                </div>
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev + "3")}
                >
                  3
                </div>
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev + "4")}
                >
                  4
                </div>
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev + "5")}
                >
                  5
                </div>
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev + "6")}
                >
                  6
                </div>
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev + "7")}
                >
                  7
                </div>
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev + "8")}
                >
                  8
                </div>
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev + "9")}
                >
                  9
                </div>
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev + "0")}
                >
                  0
                </div>
              </div>
            )}
          </div>
        )}
        {!gameOver && strategies[index] === "Addition < 10" && (
          <Addition10
            setOperation={setOperation}
            setAnswer={setAnswer}
            index={index}
          />
        )}
        {!gameOver && strategies[index] === "Doubles < 10" && (
          <Doubles10
            setOperation={setOperation}
            setAnswer={setAnswer}
            index={index}
          />
        )}
        {!gameOver && strategies[index] === "Doubles Dizaines < 60" && (
          <DoublesD50
            setOperation={setOperation}
            setAnswer={setAnswer}
            index={index}
          />
        )}
        {!gameOver && strategies[index] === "Compléments à 10" && (
          <Complements10
            setOperation={setOperation}
            setAnswer={setAnswer}
            index={index}
          />
        )}
        {!gameOver && strategies[index] === "Soustraction par 2" && (
          <Soustraction2
            setOperation={setOperation}
            setAnswer={setAnswer}
            index={index}
          />
        )}
        {!gameOver && strategies[index] === "Soustraction de nombres < 10" && (
          <Soustraction10
            setOperation={setOperation}
            setAnswer={setAnswer}
            index={index}
          />
        )}
      </main>
    </div>
  );
}
