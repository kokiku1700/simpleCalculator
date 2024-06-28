const button = document.querySelectorAll('button');
const operator = document.querySelectorAll('.operator');
const numBtn = document.querySelectorAll('.numBtn');
const process = document.getElementsByClassName('process');
const answer = document.getElementsByClassName('answer');
const result = document.getElementsByClassName('result');

let operatorOn = '';
let firstNum = 0;
let secondNum = 0;

function calculate ( num1, op, num2 ) {
    let nums = 0;

    switch ( op ) {
        case "+": 
            nums = num1 + num2;
            break;
        case "-":
            nums = num1 - num2;
            break;
        case "x":
            nums = num1 * num2;
            break;
        case "/":
            nums = num1 / num2;
            break;
    }

    return nums;
};

function calculator () {
    //연산 과정을 화면에 표시하기 위해 배열을 선언
    let processArr = [];
    //입력한 수를 각각 firstNum과 secondNum에 넘겨 주기 위한 변수
    let numStr = "";

    // 각 버튼 클릭 시 이벤트 발생
    button.forEach(i => {
        i.addEventListener('click', e => {
            answer[0].textContent = "";
            let action = e.target.classList[0];
            let click = e.target.innerText;
            
            // 연산자를 눌렀을 때
            if ( action === "operator" ) {
                // 첫 번째 숫자가 비어있고 입력한 숫자만 있을 때
                // 입력한 숫자를 첫 번째 숫자에 할당
                if ( numStr && !firstNum ) {
                    firstNum = Number(numStr);
                    numStr = "";
                }
                // 첫 번째, 두 번째 숫자가 있을 때 추가 연산 방지
                if ( firstNum && numStr ) return false;
                // 연산자를 연속으로 클릭 시  
                if ( firstNum && operatorOn ) return false;   
                // 아무것도 없는 상태에서 연산자 클릭 방지
                if ( !firstNum ) return false;
                
                operatorOn = click;
                processArr.push(click);
                process[0].innerText = processArr.join('');
                console.log(operatorOn)      
            }
            // 숫자 버튼을 클릭했을 때 
            else if ( action === 'numBtn' ) {
                // 첫 숫자가 0 두 번이 되는 것을 방지
                if ( numStr === "0" && click === "0" ) {

                    return false;
                } 
                processArr.push(click);
                process[0].innerText = processArr.join('');
                numStr += click;
                
            }
            // =을 클릭하였을 때 정보를 초기화하면서 결과 출력
            else if ( action === 'result' ) {
                if ( firstNum ) {
                    secondNum = Number(numStr);
                }
                answer[0].textContent = calculate(firstNum, operatorOn, secondNum);
                process[0].innerText = '';
                operatorOn = '';
                firstNum = 0;
                secondNum = 0;
                processArr = [];
                numStr = "";
            // C를 눌렀을 때 모든 정보 초기화    
            } else if ( action === "clear" ) {
                process[0].innerText = '';
                operatorOn = '';
                firstNum = 0;
                secondNum = 0;
                processArr = [];
                numStr = "";
            }
        });
    })
}

calculator();