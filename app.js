const DOB = document.querySelector('.enteryourdate');
const checkBtn = document.querySelector('.check');
const output = document.querySelector('.output');


    // if (isPalindrome(dateOfBirth)) {
    //     output.innerText = 'Your birthday is palindrome.'
    // } else if (!isPalindrome(dateOfBirth)) {
    //     output.innerText = 'Your birthday is not palindrome.'
    // }
    
  

  
function isPalindrome(birthday) {
     let reverseStr = birthday.split("").reverse().join("");
     return reverseStr === birthday;
}


function formDateStr(date) {
    let dd = '';
    if (date.getDate() < 10) {
        dd = "0" + String(date.getDate());
    } else {
        dd = String(date.getDate());
    }

    if (date.getMonth() < 9) {
        dd = dd + "0" + String(date.getMonth() + 1);
    } else {
        dd = dd + String(date.getMonth() + 1);
    }
    dd += String(date.getFullYear());
    return dd;
}

function findNextPalindrome(dd, mm, yyyy) {
    let date1 = Number(dd);
    let date2 = Number(mm);
    let date3 = Number(yyyy);

    let dateTwo = new Date(date3, date2 - 1, date1);
    while (!isPalindrome(formDateStr(dateTwo))) {

        dateTwo.setDate(dateTwo.getDate() + 1);
    }
    return dateTwo;
}

function setDisplay () {
    let birthStr = DOB.value;

    setTimeout(function() {
        let dateArray = birthStr.split("-");
        const inputYear = dateArray[0];
        const inputMonth = dateArray[1];
        const inputDate = dateArray[2];
        let month;
        let day;

        let findPalindrome = isPalindrome(inputDate + inputMonth + inputYear);
        console.log(findPalindrome);

        if (findPalindrome) {
            output.innerText = 'Your birthday is a palindrome date.';
        } else {
            let nextPalindromeDate = findNextPalindrome(inputDate, inputMonth, inputYear);
            let userDate = new Date(inputYear, inputMonth - 1, inputDate);
            console.log(userDate);
            console.log(nextPalindromeDate);

            let differenceBtnDates = nextPalindromeDate.getTime() - userDate.getTime();
            let daysToNextPalindrome = differenceBtnDates / (1000 * 3600 * 24);

            if (nextPalindromeDate.getMonth() < 10) {
                month = `0${nextPalindromeDate.getMonth()}`;
              } else {
                month = `${nextPalindromeDate.getMonth()}`
              }
              if (nextPalindromeDate.getDate() < 10) {
                day = `0${nextPalindromeDate.getDate()}`;
              } else {
                day = `${nextPalindromeDate.getDate()}`;
              }

            output.innerText = `Your birthday is not a palindrome date. You have missed it by ${daysToNextPalindrome} days. Next palindrome is on ${day}/${month}/${nextPalindromeDate.getFullYear()}.`;
        }

    }, 3000)
}

checkBtn.addEventListener('click', setDisplay);