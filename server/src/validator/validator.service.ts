import { Injectable } from '@nestjs/common';
import { ValidatorDto } from './dto/validator.dto';

function identifyIssuingBank(cardNumber: string): string {
  const firstTwoDigits = parseInt(cardNumber.substring(0, 2));
  const firstFourDigits = parseInt(cardNumber.substring(0, 4));

  if (firstTwoDigits === 34 || firstTwoDigits === 37) {
      return "American Express";
  } else if (firstFourDigits === 6011) {
      return "Discover";
  } else if (firstTwoDigits >= 51 && firstTwoDigits <= 55) {
      return "Mastercard";
  } else if (cardNumber.charAt(0) === '4') {
      return "Visa";
  } else {
      return "";
  }
}

function calculateLuhnChecksum(numStr: string): boolean {

  // Return early if numStr is null or empty
  if(!numStr.length) return false

  // Convert the string to an array of digits
  const digits: number[] = numStr.split('').map(Number);

  // Double every second digit from the right
  for (let i = digits.length - 2; i >= 0; i -= 2) {
    digits[i] *= 2;

    // If doubling results in a number greater than 9, subtract 9
    if (digits[i] > 9) {
      digits[i] -= 9;
    }
  }

  // Sum all the digits
  const sum: number = digits.reduce((acc, val) => acc + val, 0);

  // Find the remainder of the sum
  const remainder: number = sum % 10;

  // If the remainder is not 0, subtract it from 10 to get the checksum
  const checksum: number = remainder !== 0 ? 10 - remainder : 0;

  // Cast to boolean, also takes care of any non number chars that get passed
  return checksum === 0;
}

// CC numbers can be 16 or 19 for most major brands with the exeption of Amex which are 15
const validLength = (ccNumber: string, issuingBank: string): boolean => {
  if(issuingBank !== "American Express" && ccNumber.length === 16 || ccNumber.length === 19) return true
  else if (issuingBank === "American Express"  && ccNumber.length === 15) return true
  else return false
}

@Injectable()
export class ValidatorService {
  validate(validatorDto: ValidatorDto) {
    const {ccNumber} = validatorDto
    const luhnValid = calculateLuhnChecksum(ccNumber)
    const issuingBank = identifyIssuingBank(ccNumber)
    const lengthValid = validLength(ccNumber, issuingBank)

    return {
      isValid: luhnValid && lengthValid,
      issuingBank: issuingBank
    }
  }
}
