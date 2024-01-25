import './Validator.css';
import { useState, useCallback  } from 'react';
import CcLogo from './Logo';
import { Banks } from './types';


type ValidatorResponse = {
  isValid: boolean
  issuingBank: Banks
}

async function postData(ccNumber: string) {
  const data = {
    ccNumber: ccNumber
  }
  const response = await fetch("http://localhost:3100/validator", {
    method: "POST", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return response.json(); 
}



function CreditCardValidator() {
  const [validationRes, setValidationRes] = useState<ValidatorResponse | null>(null);
  const [ccNumber, setCcNumber] = useState<string>('')

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    // removes spaces before setting ccNumber state
    const ccNumberValue = event.target.value.replace(/\s+/g, '')
    setCcNumber(ccNumberValue);

    postData(ccNumberValue).then((data: ValidatorResponse) => {
      setValidationRes(data)
    }); 
  };

  const calculateUiStates = useCallback(() => {
    if (validationRes?.isValid){
      return {
        outline: `green solid`
      }
    } else if (!validationRes?.isValid){
      // checks for correct length before showing error
      const values = validationRes?.issuingBank !== "American Express" ? [16, 19] : [15]
      return {
        outline: values.includes(ccNumber.length) ? `red solid` : ''
      }
    } else return { outline: 'none' }
  },[validationRes])

  return (
    <div className="CreditCardValidator" style={calculateUiStates()}>
      <label htmlFor={"ccNumber"}>Input Credit Card Number</label>
      <div className="Label" style={{margin: '1em 0'}}>
        <input 
          onChange={(v)=>{handleChange(v)}}
          type="text" 
          id="ccNumber" 
          name="ccNumber"
          // adds spaces before showing ccNumber
          value={ccNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim()} 
          // allows for 19 char ccNumbers with 4 additional with spaces
          maxLength={23}
          placeholder="xxxx xxxx xxxx xxxx"
        /> 
        <CcLogo issuingBank={validationRes?.issuingBank}/>
      </div>
      <button  disabled={!validationRes?.isValid}> Pay Now </button>
    </div>
  );
}

export default CreditCardValidator;
