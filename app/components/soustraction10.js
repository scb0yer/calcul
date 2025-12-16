import { useEffect } from "react";

const Soustraction10 = ({ setOperation, setAnswer, index }) => {
  useEffect(() => {
    const number1 = Math.floor(Math.random() * 8) + 2;
    const number2 = Math.floor(Math.random() * number1) + 1;
    let calcul = ``;
    let alea = Math.floor(Math.random() * 2);
    if (alea === 0) {
      calcul = `${number2} + ? = ${number1}`;
    }
    if (alea === 1) {
      calcul = `${number1} - ${number2}`;
    }
    setOperation(calcul);
    const answer = number1 - 2;
    setAnswer(answer);
  }, [index]);
};

export default Soustraction10;
