const units: string[] = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const teens: string[] = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens: string[] = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const thousands: string[] = ['', 'Thousand', 'Million', 'Billion'];

function convertHundreds(num: number): string {
  let result = '';

  if (num > 99) {
    result += units[Math.floor(num / 100)] + ' Hundred ';
    num = num % 100;
  }

  if (num > 10 && num < 20) {
    result += teens[num - 11] + ' ';
  } else {
    result += tens[Math.floor(num / 10)] + ' ';
    result += units[num % 10] + ' ';
  }

  return result.trim();
}

export function numberToWords(num: number): string {
  if (num === 0) return 'Zero';

  let result = '';
  let thousandCounter = 0;

  while (num > 0) {
    const hundreds = num % 1000;
    if (hundreds > 0) {
      const hundredsInWords = convertHundreds(hundreds);
      result = hundredsInWords + ' ' + thousands[thousandCounter] + ' ' + result;
    }
    num = Math.floor(num / 1000);
    thousandCounter++;
  }

  return result.trim().replace(/\s+/g, ' ');
}
