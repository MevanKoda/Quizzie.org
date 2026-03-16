let data;
let filteredQuiz;

//Create QuizBox element in the page
function createQuizBox(filteredData,count){
    const quizBox = document.getElementById('quiz-box')

    for(let i=0; i<count; i++){
        const quizEl = document.createElement('div')
        const quizContent = `<h1>${filteredData[i].question}</h1>
        <button onclick="checkAns(0,${i})">${filteredData[i].options[0]}</button>
        <button onclick="checkAns(1,${i})">${filteredData[i].options[1]}</button>
        <button onclick="checkAns(2,${i})">${filteredData[i].options[2]}</button>
        <button onclick="checkAns(3,${i})">${filteredData[i].options[3]}</button>
        <button onclick="(()=>console.log('Clicked'))()">Go to next</button>`
        quizEl.innerHTML = quizContent
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

        createQuizBox(filteredQuiz, count)

    }catch(error){
        console.error(error)
    }
}

//Checking the correct Answer
function checkAns(answer,index){
    if(answer === filteredQuiz[index].answer){
        console.log("Correct")
       
    }else{
        console.log("Wrong")
    }
}

//Load the quiz
async function loadQuiz(){
    const params = new URLSearchParams(window.location.search)
    const category = params.get('category')
    const count = params.get('count')
    await fetchQuiz(category,count)
}

loadQuiz()