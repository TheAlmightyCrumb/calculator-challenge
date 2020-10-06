import React, { useState, useEffect } from 'react';
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

const digits = Array(10).fill('');
const [result, setResult] = useState(0);
const [chosenOperator, setChosenOperator] = useState();
const [firstNumber, setFirstNumber] = useState(false);
const [secondNumber, setSecondNumber] = useState(false);
const [decimal, setDecimal] = useState(0);
const [isDecimal, setIsDecimal] = useState(false);

const setNumber = (clickedDigit) => {
  if (firstNumber === false) setFirstNumber(clickedDigit);
  else if (isDecimal && !secondNumber) setFirstNumber(firstNumber + clickedDigit / 10);
  else if (isDecimal && secondNumber !== false) setSecondNumber(secondNumber + clickedDigit / 10);
  else if (!chosenOperator) setFirstNumber(firstNumber * 10 + clickedDigit);
  else if (secondNumber === false) setSecondNumber(clickedDigit);
  else setSecondNumber(secondNumber * 10 + clickedDigit);
}

const currentOperator = (operator) => {

  // if (isDecimal) {
  //   let digitsAfterPoint = decimal.toString().length;
  //   if (secondNumber > 0) { 
  //     setSecondNumber(calculate('+', secondNumber, decimal/Math.pow(10, digitsAfterPoint)));
  //   }
  //   else {
  //     setFirstNumber(calculate('+', firstNumber, decimal/Math.pow(10, digitsAfterPoint)));
  //   }
  // }

  switch (operator) {
    case 'AC':
      setResult(0);
      setFirstNumber(0);
      setSecondNumber(0);
      setDecimal(0);
      setIsDecimal(false);
      setChosenOperator();
      break;
    
    case '=':
      let calculatedNumber = calculate(chosenOperator, firstNumber, secondNumber);
      setFirstNumber(calculatedNumber);
      setSecondNumber(0);
      setIsDecimal(false);
      setChosenOperator();
      break;

    case '√':
      setFirstNumber(calculate(operator, firstNumber));
      setSecondNumber(0);
      setIsDecimal(false);
      setChosenOperator();
      break;

    case 'x²':
      setFirstNumber(calculate(operator, firstNumber));
      setSecondNumber(0);
      setIsDecimal(false);
      setChosenOperator();
      break;

    case '.':
      setIsDecimal(true);
      break;

    default:
      setIsDecimal(false);
      setDecimal(0);
      setChosenOperator(operator);
  }
};

useEffect(() => {
  console.log('First: ', firstNumber);
  console.log('Second: ', secondNumber);
  console.log('Decimal: ', decimal);
  console.log('Opr: ', chosenOperator);
  setResult(firstNumber);
  // if (chosenOperator === '.') { setResult(firstNumber + chosenOperator + decimal); return }
  if (chosenOperator && !secondNumber) setResult(firstNumber + ' ' + chosenOperator);
  if (chosenOperator && secondNumber) setResult(firstNumber + ' ' + chosenOperator + ' ' + secondNumber);
}, [firstNumber, secondNumber, chosenOperator, decimal]);

  return (
    <div className='calculator'>
      <div className='result'>
        {result}
      </div>
      <div className='calculator-digits'>
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
                  currentOperator(operations[opr].value);  
                }}
              />
            )
         })}
      </div>
    </div>
  );
}

export default Calc;
