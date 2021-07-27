const DOB = document.querySelector('.enteryourdate');
const checkBtn = document.querySelector('.check');
const output = document.querySelector('.output');
  

  
function isPalindrome(birthday) {
     let reverseStr = birthday.split("").reverse().join("");
     return reverseStr === birthday;
}


function formDateStr(date) {

    let dd = ''

    let d1 = (date.getDate()).toString();
    let m1 = (date.getMonth() + 1).toString();
    let y1 = (date.getFullYear()).toString();

    
    if (date.getDate() < 10) {
        d1 = "0" + String(date.getDate());
    } else {
        d1 = String(date.getDate());
    }

    if (date.getMonth() < 9) {
        m1 = "0" + String(date.getMonth() + 1);
    } else {
        m1 = String(date.getMonth() + 1);
    }
    
    if (isPalindrome(d1 + m1 + y1)) {
        return dd = d1+m1+y1;
    } 
    else if (isPalindrome(y1+m1+d1)) {
        return dd = y1+m1+d1;
    } 
    else if (isPalindrome(m1+d1+y1)) {
        return dd = m1+d1+y1.substring(2);
    } 
    else if (isPalindrome(Number(m1).toString()+d1+y1)) {
        return dd = (Number(m1)).toString()+d1+y1;
    } 
    else {
        return null;
    }

}


function findNextPalindrome(dd, mm, yyyy) {
    let date1 = Number(dd);
    let date2 = Number(mm);
    let date3 = Number(yyyy);

    let dateTwo = new Date(date3, date2 - 1, date1);
    let dateThree = new Date(date3, date2 - 1, date1);
    //forword
    while (!formDateStr(dateTwo)) {

        dateTwo.setDate(dateTwo.getDate() + 1);
    }
   
    while (!formDateStr(dateThree)) {

        dateThree.setDate(dateThree.getDate() - 1);
        // console.log(dateThree)
    }
    return [dateTwo, dateThree];

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
        let format;

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
            let dateThreeDiffrence = userDate.getTime() - nextPalindromeDate[1].getTime();

            console.log(dateTwoDiffrence);
            console.log(dateThreeDiffrence);

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
            console.log(dateThreeDiffrence < dateTwoDiffrence);

            if (dateTwoDiffrence < dateThreeDiffrence) {
                let daysToNextPalindrome = dateTwoDiffrence / (1000 * 3600 * 24);
                output.innerText = `Your birthday is not a palindrome date. You have missed it by ${daysToNextPalindrome} days. ${addZeros(0)}`;
            } 
            
            else if (dateThreeDiffrence < dateTwoDiffrence) {
                let daysToNextPalindrome = (dateThreeDiffrence / (1000 * 3600 * 24));
                output.innerText = `Your birthday is not a palindrome date. You have missed it by ${daysToNextPalindrome} days. ${addZeros(1)}`;
            }

        }

    }, 3000)
}

checkBtn.addEventListener('click', setDisplay);