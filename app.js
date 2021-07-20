const DOB = document.querySelector('.enteryourdate');
const checkBtn = document.querySelector('.check');
const output = document.querySelector('.output');


checkBtn.addEventListener('click', CheckYourBirthIsPalindrome);

function CheckYourBirthIsPalindrome() {
    let dateOfBirth = DOB.value;
    const dateArray= DOB.split("-");
    const inputYear = dateArray[0];
    const inputMonth = dateArray[1];
    const inputDate = dateArray[2];

    if (isPalindrome(dateOfBirth)) {
        output.innerText = 'Your birthday is palindrome.'
    } else if (!isPalindrome(dateOfBirth)) {
        output.innerText = 'Your birthday is not palindrome.'
    }
    
  }

  
function isPalindrome(m) {
     m = m.split("").reverse().join("");
}

// function findNearestPalindromeDate(date, month, year) {
//     let ddNo1= Number(date);
//     let mmNo1= Number(month);
//     let yyNo1=Number(year);
//     let ddNo2= Number(date);
//     let mmNo2= Number(month);
//     let yyNo2=Number(year);

//     for(let i=1; i>0; i++) {

//      }
// }