import React, { useState, useEffect, useMemo } from 'react';
import { MathOperation, operationTypes, operations } from './MathOperation';
import DigitButton from './DigitButton';

/**
 * A basic switch calcuation function
 * @param {*} operation The name or type of the operation used, for ex. : "sqrt" / "+"
 * @param {*} num1 The first num to use in the calculation
 * @param {*} num2 The second num to use in the calculation
 */



function calculate(operation, num1, num2 = 0) {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        return 'Error';
      }
      return num1 / num2;
    case '%':
      if (num2 === 0) {
        return 'Error';
      }
      return num1 % num2;
    case 'x²':
      return Math.pow(num1, 2);
    case '√':
      return Math.sqrt(num1);
  }
}

function Calc() {
  /**
   * Add (0-9) to <DigitButton /> with value and onClick function as exlplained in the requirements
   * Add the correct types to MathOperation, if you are having problem make sure its written correctly compared to operationTypes array
   * This is a state machine, you'll need to work wisely with React.js State and Lifecycle functionality
   * You can use calculate function for your aid
   */

const digits = Array(10).fill('');
const [result, setResult] = useState(0);
const [chosenOperator, setChosenOperator] = useState();
const [firstNumber, setFirstNumber] = useState(0);
const [secondNumber, setSecondNumber] = useState(0);


const setNumber = (clickedDigit) => {
  if (!chosenOperator) setFirstNumber(firstNumber * 10 + clickedDigit);
  else setSecondNumber(secondNumber * 10 + clickedDigit);
}

// const operatorNob = (operator) => {
//   if (operator === "AC") {
//     setResult(0);
//     setFirstNumber(0);
//     setSecondNumber(0);
//     setChosenOperator();
//   } else if (operator === "=") {
//     let calculatedNumber = calculate(chosenOperator, firstNumber, secondNumber);
//     setFirstNumber(calculatedNumber);
//     setSecondNumber(0);
//     setChosenOperator();
//   } else {
//     setChosenOperator(operator);
//   }
// };

const operatorNob = (operator) => {
  switch (operator) {
    case 'AC':
      setResult(0);
      setFirstNumber(0);
      setSecondNumber(0);
      setChosenOperator();
      break;
    
    case '=':
      let calculatedNumber = calculate(chosenOperator, firstNumber, secondNumber);
      setFirstNumber(calculatedNumber);
      setSecondNumber(0);
      setChosenOperator();
      break;

    default:
      setChosenOperator(operator);
  }
};

useEffect(() => {
  console.log('First: ', firstNumber);
  console.log('Second: ', secondNumber);
  console.log('Opr: ', chosenOperator);
  setResult(firstNumber);
  if (chosenOperator && !secondNumber) setResult(firstNumber + ' ' + chosenOperator);
  if (chosenOperator && secondNumber) setResult(firstNumber + ' ' + chosenOperator + ' ' + secondNumber);
}, [firstNumber, secondNumber, chosenOperator]);

  return (
    <div className='calculator'>
      <div className='result'>
        { /* Print the result of the calculation here */ }
        {result}
      </div>
      <div className='calculator-digits'>
         { /* Enter here all of the MathOperation and DigitButton components */ }
         {digits.map((elem, i) => {
           return (
            <DigitButton
              key={`Digit_${i}`} 
              value={i} 
              onClick={() => setNumber(i)} 
            />
             )
         })}
         {operationTypes.map(opr => {
            return (  
              <MathOperation 
                key={`Operator_${opr}`} 
                type={opr} 
                onClick={() => {
                  operatorNob(operations[opr].value);  
                }}
              />
            )
         })}
      </div>
    </div>
  );
}

export default Calc;
