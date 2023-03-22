let quizData = [
    { q: '장담하다',
      ans: 'ensure',
      wrong: 'assure'},

    { q: '보완하다',
      ans: 'compliment',
      wrong: 'complement'},

    { q: '확실히',
      ans: 'definitely',
      wrong: 'defiantly'},

    { q: '의상',
      ans: 'custom',
      wrong: 'costume'},

    { q: '페달',
      ans: 'peddle',
      wrong: 'pedal'},

    { q: '화음',
      ans: 'cord',
      wrong: 'chord'},
]


let ProfileAndStart = document.getElementById('ProfileAndStart');
let startButton = document.getElementById('startButton');
let QuizSection = document.getElementById('QuizSection');
let QuestionSection = document.getElementById('QuestionSection');
let endPage = document.getElementById('endPage');
let countInEnd = document.getElementById('count2');
let count = 0;
let life = parseInt(quizData.length/2)
let choice_1 = document.getElementById('choice_1');
let choice_2 = document.getElementById('choice_2');
let alreadySelected = [];
let countInHTML = document.getElementById('count');
let lifeInHTML = document.getElementById('life');


function setName() {
    let userName =  document.getElementById('name').value
    document.getElementById('userName').innerText = userName;
    document.getElementById('userName2').innerText = userName;

}

function startButtonClick() {
    ProfileAndStart.style.display = "none";
    QuizSection.style.display = "block"
   }

function showQuestion () {

    let maxQuizData = quizData.length - 1;
    
    //문제 보여주기
    let qNumber = getRandomNumberInRange(0, maxQuizData)
    QuestionSection.innerHTML = quizData[qNumber].q

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

    //life가 0이 되면 문제 영역을 감춘다.
    if (life === 0) {
        QuizSection.style.display = "none";
        endPage.style.display = "block"
    }

   }

   
function answerCounter_1 () {
    let currentQuiz = quizData.find( obj => obj.q == QuestionSection.innerHTML)
    console.log(currentQuiz.ans)
    console.log(choice_1.innerHTML)
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
    console.log(currentQuiz.ans)
    console.log(choice_2.innerHTML)
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
