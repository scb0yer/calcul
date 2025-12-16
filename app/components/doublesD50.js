import { useEffect } from "react";

const DoublesD50 = ({ setOperation, setAnswer, index }) => {
  useEffect(() => {
    const number1 = (Math.floor(Math.random() * 5) + 1) * 10;
    let calcul = `${number1} + ${number1}`;
    setOperation(calcul);
    const answer = number1 * 2;
    setAnswer(answer);
  }, [index]);
};

export default DoublesD50;
