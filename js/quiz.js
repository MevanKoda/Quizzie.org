import {timer} from '../js/timer.js'

let data;
let filteredQuiz;

let totalQuestions = null
let correctCount = 0
let wrongCount = 0

const quizHeader = document.getElementById('quiz-header')
const quizBox = document.getElementById('quiz-box')





//Create QuizBox element in the page
function createQuizBox(filteredData,count, category){
    

    const quizTitle = document.getElementById('quizTitle')
    quizTitle.textContent = `${category} Quiz✍🏻`

    const timerEl = document.getElementById('timerEl')

    

    for(let i=0; i<count; i++){
        const quizEl = document.createElement('div')
        quizEl.classList = 'quiz-element'

        const questionTitle = document.createElement('h1')
        questionTitle.textContent = `${i+1}. ${filteredData[i].question}`

        const AnswersEl = document.createElement('div')
        AnswersEl.classList = 'Answers-element'


        for(let j = 0; j < filteredData[i].options.length; j++){
            const optionBtn = document.createElement('button')
            optionBtn.classList = 'option-btn'
            optionBtn.textContent = filteredData[i].options[j]
            optionBtn.dataset.index = j

            optionBtn.addEventListener('click', function(){
                const allButtons = this.parentElement.querySelectorAll('button')
                const ansExplanation = document.createElement('h1')
                ansExplanation.classList = "ansExplanation"

                allButtons.forEach(btn=>{
                    btn.disabled = true
                })

                if(filteredData[i].answer === Number(this.dataset.index)){
                    console.log("Correct")
                    this.style.backgroundColor = 'green'
                    this.style.color = 'white'
                    ansExplanation.textContent = `✅ ${filteredData[i].explanation}`;
                    quizEl.appendChild(ansExplanation)
                    correctCount++

                }else{
                    this.style.backgroundColor = 'red'
                    this.style.color = 'white'
                    ansExplanation.textContent = `❌ ${filteredData[i].explanation}`;
                    quizEl.appendChild(ansExplanation)
                    wrongCount++
                }

                if(count == (correctCount + wrongCount)){
                    saveResult()
                    setTimeout(()=>{
                        window.location.href="../pages/result.html"
                    },1000)
                }
            })

            AnswersEl.appendChild(optionBtn)
        }


        quizEl.appendChild(questionTitle)
        quizEl.appendChild(AnswersEl)
        quizBox.appendChild(quizEl)

        
    }

        
}

//Fetch QuizData from JSON file
async function fetchQuiz(category,count){
    try{
        const response = await fetch('../data/questions.json');
        data = await response.json()
        if(!response.ok){
            console.log("Failed to fetch response")
        }

        console.log(data)
        console.log(data.length)

        filteredQuiz = data.filter(item => item.category == category)
        console.log(filteredQuiz)

        createQuizBox(filteredQuiz, count, category)


    }catch(error){
        console.error(error)
    }
}






//Load the quiz
async function loadQuiz(){
    const params = new URLSearchParams(window.location.search)
    const category = params.get('category')
    totalQuestions = params.get('count')
    const duration = params.get('duration')
    await fetchQuiz(category,totalQuestions)
    timer(duration, saveResult)


}

function saveResult(){
    const result = {
        correct: correctCount,
        wrong: wrongCount,
        total: totalQuestions
    }

    localStorage.setItem("result", JSON.stringify(result))
}

loadQuiz()
