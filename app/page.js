"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Addition10 from "./components/addition10";
import Doubles10 from "./components/doubles10";
import DoublesD50 from "./components/doublesD50";
import Complements10 from "./components/complements10";

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

  const time = 17;

  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        setResponse(null);
        newCalcul();
      }, 2000); // 5000ms = 5 secondes
      // cleanup pour éviter des timers multiples
      return () => clearTimeout(timer);
    }
  }, [response]);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setKnucklesPosition((prev) => ({
          ...prev,
          y: prev.y - 42, // monte Sonic
        }));
      }, time * 1000);
      return () => clearInterval(interval);
    }
  }, [start]);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setResponse(
          <>
            KNUCKLES A GAGNÉ. 😢
            <br />
            RETENTE TA CHANCE ! 💪
          </>
        );
        setGameOver(true);
        setStart(false);
      }, time * 12000);
      return () => clearInterval(interval);
    }
  }, [start]);

  useEffect(() => {
    if (gameOver) {
      const interval = setInterval(() => {
        window.location.reload();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameOver]);

  const newCalcul = () => {
    setAnswer(null);
    let alea = Math.floor(Math.random() * strategies.length);
    setIndex(alea);
  };

  const checkResult = () => {
    console.log("answer", answer);
    console.log("result", result);
    if (result.toString() === answer.toString()) {
      setScore((prev) => prev + 1);
      setSonicPosition((prev) => ({
        ...prev,
        y: prev.y - 42,
      }));
      if (score === 11) {
        setResponse(
          <>
            "BRAVO ! 🏆
            <br />
            TU AS GAGNÉ !
          </>
        );
        setStart(false);
        setGameOver(true);
        return;
      } else {
        setResponse("CONTINUE ! 🚀");
      }
    } else {
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
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.game}>
          <div className={styles.layer}>
            <div className={styles.box}>
              {operation && !response && (
                <div className={styles.operation}>{operation}</div>
              )}
              {response && <div className={styles.response}>{response}</div>}
            </div>
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
        {operation && (
          <div>
            <div className={styles.actionboard}>
              <div className={styles.result}>{result}</div>
              {result && (
                <div
                  className={styles.key}
                  onClick={() => setResult((prev) => prev.slice(0, -1))}
                >
                  ⌫
                </div>
              )}
              <div className={styles.key} onClick={() => checkResult()}>
                ✅
              </div>
            </div>

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
          </div>
        )}
        {strategies[index] === "Addition < 10" && (
          <Addition10
            setOperation={setOperation}
            setAnswer={setAnswer}
            index={index}
          />
        )}
        {strategies[index] === "Doubles < 10" && (
          <Doubles10
            setOperation={setOperation}
            setAnswer={setAnswer}
            index={index}
          />
        )}
        {strategies[index] === "Doubles Dizaines < 60" && (
          <DoublesD50
            setOperation={setOperation}
            setAnswer={setAnswer}
            index={index}
          />
        )}
        {strategies[index] === "Compléments à 10" && (
          <Complements10
            setOperation={setOperation}
            setAnswer={setAnswer}
            index={index}
          />
        )}
      </main>
    </div>
  );
}
