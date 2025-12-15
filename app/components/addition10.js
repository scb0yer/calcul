import { useEffect, useState } from "react";

const Addition10 = ({ setOperation, setAnswer, index }) => {
  const [nb1, setNb1] = useState();
  const [nb2, setNb2] = useState();

  useEffect(() => {
    const number1 = Math.floor(Math.random() * 8) + 1;
    const number2 = Math.floor(Math.random() * 8) + 1;
    setNb1(number1);
    setNb2(number2);
    let calcul = `${number1} + ${number2}`;
    setOperation(calcul);
    const answer = number1 + number2;
    setAnswer(answer);
  }, [index]);
};

export default Addition10;
