const data = JSON.parse(localStorage.getItem('result'))

const correctCount = data.correct
const wrongCount = data.wrong
const totalQuestions = data.total

let message = null

let result = Math.round((correctCount/totalQuestions)*100)

if(result>=75){
    message = "Well done💙 You did an Excellent Job😘 Keep it up👊🏻"
}else if(result>=50 && result<75){
    message = "Keep Up✍🏻 You can do better💙"
}else if(result>35 && result <50){
    message = "Score soo low😪 Do more work✍🏻 Do more quizzes with us💔"
}else{
    message = "You failed the quiz💔 Try again✏️"
}


const resultBox = document.getElementById('resultBox')
const resultEl = document.getElementById('resultEl')
const messageEl = document.getElementById('messageEl')


resultEl.textContent = `Score : ${result} %`
messageEl.textContent = message


function restart(type){
    if(type == 'retry'){
        window.history.back()
    }else{
        window.location.href='../'
    }
}





