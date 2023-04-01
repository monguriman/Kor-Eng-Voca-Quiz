let quizData = [
    { q: '그리다',
      ans: 'draw',
      wrong: 'drawer'},

    { q: '영향을 미치다',
      ans: 'affect',
      wrong: 'effect'},

    { q: '확실히',
      ans: 'definitely',
      wrong: 'defiantly'},

    { q: '임무',
      ans: 'mission',
      wrong: 'emission'},

    { q: '신중한',
      ans: 'discreet',
      wrong: 'discrete'},

    { q: '기도하다',
      ans: 'pray',
      wrong: 'prey'},

    { q: '위도',
        ans: 'latitude',
        wrong: 'altitude'},

    { q: '괜찮은',
        ans: 'decent',
        wrong: 'descent'},

    { q: '(정보를) 끌어내다',
        ans: 'elicit',
        wrong: 'illicit'},

    { q: '장담하다',
        ans: 'assure',
        wrong: 'ensure'},
    
    { q: '보완하다',
        ans: 'complement',
        wrong: 'compliment'},

    { q: '…에 앞서다',
        ans: 'precede',
        wrong: 'proceed'},

    { q: '운문',
        ans: 'rhyme',
        wrong: 'rime'},

    { q: '미망인',
        ans: 'widow',
        wrong: 'window'},

    { q: '고통스러운',
        ans: 'torturous',
        wrong: 'tortuous'}
]


let ProfileAndStart = document.getElementById('ProfileAndStart');
let startButton = document.getElementById('startButton');
let QuizNumber = document.getElementById('QuizNumber');
let QuizSection = document.getElementById('QuizSection');
let QuestionSection = document.getElementById('QuestionSection');
let endPage = document.getElementById('endPage');
let countInEnd = document.getElementById('count2');
let count = 0;
let life = parseInt(quizData.length/2)
let choice_1 = document.getElementById('choice_1');
let choice_2 = document.getElementById('choice_2');
let countInHTML = document.getElementById('count');
let lifeInHTML = document.getElementById('life'); 

var userName = document.getElementById('name').value

startButton.addEventListener('click', startButtonClick)
startButton.addEventListener('click', setName)
lifeInHTML.innerHTML = life;

function setName() {
    document.getElementById('userName').innerText = document.getElementById('name').value;
    document.getElementById('userName2').innerText = document.getElementById('name').value;
}

function startButtonClick(e) {
    e.preventDefault();
    ProfileAndStart.style.display = "none";
    QuizSection.style.display = "block"
   }

let alreadySelectedQ=[];

function showQuestion () {

    let maxQuizData = quizData.length - 1;
    let qNumber = getRandomNumberInRange(0, maxQuizData);
    
    //문제 선택. 단, 기존에 출제된 문제라면 다시 문제 선택
    while (true) {
        console.log(alreadySelectedQ);
        qNumber = getRandomNumberInRange(0, maxQuizData);

        //다 맞추면 life를 0으로 만들어서 게임종료 절차로 진행
        if ( alreadySelectedQ.length >= quizData.length ) {
            life = 0
            break;
        }
        if ( !(alreadySelectedQ.includes(quizData[qNumber])) ) {
            break;
        }
    }

    //문제 출제와 동시에 기 출제 배열에 삽입
    alreadySelectedQ.push(quizData[qNumber]);

    QuestionSection.innerHTML = quizData[qNumber].q
    QuizNumber.innerHTML = alreadySelectedQ.length + '번째 문제' + '   (' + alreadySelectedQ.length + '/' + quizData.length + ')';

    //버튼 내 텍스트를 랜덤으로 답안으로 변경
    let choices = [choice_1, choice_2]

    //정답을 먼저 두 버튼 중 한 버튼에 삽입
    choices[getRandomNumberInRange(0,1)].innerHTML = quizData[qNumber].ans

    //오답은 두 버튼 중 빈자리를 찾아가도록 함
    if( choices[0].innerText != quizData[qNumber].ans ) {
        choices[0].innerHTML = quizData[qNumber].wrong
    } else {
        choices[1].innerHTML = quizData[qNumber].wrong
    }
    
    //life가 0이 되면 문제 영역을 감춘다. DB에 게임결과를 저장한다.
    if (life === 0) {
        QuizSection.style.display = "none";
        endPage.style.display = "block"
        
        //POST를 통해 보낼 데이터
        const data = {
            'userName': userName,
            'count': count,
        }

        console.log(data);

        fetch('http://localhost:3000/ranking', {
        method: data.id ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

   }

   
function answerCounter_1 () {
    let currentQuiz = quizData.find( obj => obj.q == QuestionSection.innerHTML)
    if ( choice_1.innerHTML == currentQuiz.ans) {
        count++;
    } else {
        life--;
    }
    countInHTML.innerHTML = count;
    countInEnd.innerHTML = count;
    lifeInHTML.innerHTML = life;
}


function answerCounter_2 () {
    let currentQuiz = quizData.find( obj => obj.q == QuestionSection.innerHTML)
    if ( choice_2.innerHTML == currentQuiz.ans) {
        count++;
    } else {
        life--;
    }
    countInHTML.innerHTML = count;
    countInEnd.innerHTML = count;
    lifeInHTML.innerHTML = life;
}

function getRandomNumberInRange(min,max) {
    return Math.floor(Math.random() * (max-min+1))+min;}

showQuestion();
