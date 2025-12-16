import { useEffect } from "react";

const Doubles10 = ({ setOperation, setAnswer, index }) => {
  useEffect(() => {
    const number1 = Math.floor(Math.random() * 9) + 1;
    let calcul = `${number1} + ${number1}`;
    setOperation(calcul);
    const answer = number1 * 2;
    setAnswer(answer);
  }, [index]);
};

export default Doubles10;
