import { useEffect } from "react";

const Addition10 = ({ setOperation, setAnswer, index }) => {
  useEffect(() => {
    const number1 = Math.floor(Math.random() * 9) + 1;
    const number2 = Math.floor(Math.random() * 9) + 1;
    let calcul = `${number1} + ${number2}`;
    setOperation(calcul);
    const answer = number1 + number2;
    setAnswer(answer);
  }, [index]);
};

export default Addition10;
