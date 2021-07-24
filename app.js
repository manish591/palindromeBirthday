const DOB = document.querySelector('.enteryourdate');
const checkBtn = document.querySelector('.check');
const output = document.querySelector('.output');
  

  
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
    let dateThree = new Date(date3, date2 - 1, date1);
    //forword
    while (!isPalindrome(formDateStr(dateTwo))) {

        dateTwo.setDate(dateTwo.getDate() + 1);
    }
   
    while (!isPalindrome(formDateStr(dateThree))) {

        dateThree.setDate(dateThree.getDate() - 1);
    }

    return [dateTwo, dateThree];

}

function checkAllFormat (y, m, d) {

    const dateFormat1 = yyyy+mm+dd;
    const dateFormat2 = dd+mm+yyyy;
    const dateFormat3 = mm+dd+yyyy.substring(2);
    const dateFormat4 = Number(mm)+dd+yyyy;
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

        if(!findPalindrome) {
            findPalindrome = isPalindrome(inputYear + inputMonth + inputDate);
        }
        console.log(findPalindrome)
        if (!findPalindrome) {
            findPalindrome = isPalindrome(inputMonth + inputDate + inputYear)
        }
        console.log(findPalindrome)
        if (!findPalindrome) {
            findPalindrome = isPalindrome(Number(inputMonth) + inputDate + inputYear)
        }
        console.log(findPalindrome);

        if (findPalindrome) {
            output.innerText = 'Your birthday is a palindrome date.';
        } else {
            let nextPalindromeDate = findNextPalindrome(inputDate, inputMonth, inputYear);
            let userDate = new Date(inputYear, inputMonth - 1, inputDate);
            console.log(userDate);
            console.log(nextPalindromeDate);

            let dateTwoDiffrence = nextPalindromeDate[0].getTime() - userDate.getTime();
            let dateThreeDiffrence = nextPalindromeDate[1].getTime() - userDate.getTime();

            function addZeros(index) {
                if (nextPalindromeDate[index].getMonth() < 10) {
                    month = `0${nextPalindromeDate[index].getMonth() + 1}`;
                  } else {
                    month = `${nextPalindromeDate[index].getMonth() + 1}`;
                  }
                  if (nextPalindromeDate[index].getDate() < 10) {
                    day = `0${nextPalindromeDate[index].getDate()}`;
                  } else {
                    day = `${nextPalindromeDate[index].getDate()}`;
                  }

                  return `The Nearest Palindrome date is ${day}/${month}/${nextPalindromeDate[index].getFullYear()}`
            }

            if (dateTwoDiffrence < dateThreeDiffrence) {
                let daysToNextPalindrome = dateTwoDiffrence / (1000 * 3600 * 24);
                output.innerText = `Your birthday is not a palindrome date. You have missed it by ${daysToNextPalindrome} days. ${addZeros(0)}`;
            } 
            
            else if (dateThreeDiffrence < dateTwoDiffrence) {
                let daysToNextPalindrome = -(dateThreeDiffrence / (1000 * 3600 * 24));
                output.innerText = `Your birthday is not a palindrome date. You have missed it by ${daysToNextPalindrome} days. ${addZeros(1)}`;
            }

        }

    }, 3000)
}

checkBtn.addEventListener('click', setDisplay);