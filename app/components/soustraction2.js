import { useEffect } from "react";

const Soustraction2 = ({ setOperation, setAnswer, index }) => {
  useEffect(() => {
    const number1 = Math.floor(Math.random() * 19) + 2;
    let calcul = `${number1} - 2`;
    setOperation(calcul);
    const answer = number1 - 2;
    setAnswer(answer);
  }, [index]);
};

export default Soustraction2;
