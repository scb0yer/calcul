import { useEffect } from "react";

const Complements10 = ({ setOperation, setAnswer, index }) => {
  useEffect(() => {
    const number1 = Math.floor(Math.random() * 9) + 1;
    const answer = 10 - number1;
    let calcul = ``;
    let alea = Math.floor(Math.random() * 2);
    if (alea === 0) {
      calcul = `${number1} + ? = 10`;
    }
    if (alea === 1) {
      calcul = `10 - ${number1}`;
    }
    setOperation(calcul);
    setAnswer(answer);
  }, [index]);
};

export default Complements10;
