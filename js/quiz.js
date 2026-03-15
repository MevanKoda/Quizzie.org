function createQuizBox(data,count){
    const quizBox = document.getElementById('quiz-box')

    for(let i=0; i<count; i++){
        const quizEl = document.createElement('div')
        const quizContent = `<h1>${data[i].question}</h1>
        <button onclick="checkAns(0,${i})">${data[i].options[0]}</button>
        <button onclick="checkAns(1,${i})">${data[i].options[1]}</button>
        <button onclick="checkAns(2,${i})">${data[i].options[2]}</button>
        <button onclick="checkAns(3,${i})">${data[i].options[3]}</button>
        <button onclick="(()=>console.log('Clicked'))()">Go to next</button>`
        quizEl.innerHTML = quizContent
        quizBox.appendChild(quizEl)
    }
}

let data
async function fetchQuiz(category,count){
    try{
        const response = await fetch('../data/questions.json');
        data = await response.json()
        if(!response){
            console.log("Failed to fetch response")
        }

        console.log(data)
        console.log(data.length)

        const filteredQuiz = data.filter(item => item.category == category)
        console.log(filteredQuiz)

        createQuizBox(filteredQuiz, count)

    }catch(error){
        console.error(error)
    }
}

function checkAns(answer,index){
    if(answer === data[index].answer){
        console.log("Correct")
    }else{
        console.log("Wrong")
    }
}

async function loadQuiz(){
    const params = new URLSearchParams(window.location.search)
    const category = params.get('category')
    const count = params.get('count')
    await fetchQuiz(category,count)
}

loadQuiz()