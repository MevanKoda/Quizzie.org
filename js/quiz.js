let data;
let filteredQuiz;

//Create QuizBox element in the page
function createQuizBox(filteredData,count, category){
    const quizBox = document.getElementById('quiz-box')
    const quizTitle = document.createElement('h1')
    quizTitle.className = 'quizTitle'
    quizTitle.textContent = `${category} Quiz✍🏻`
    document.body.prepend(quizTitle)


    for(let i=0; i<count; i++){
        const quizEl = document.createElement('div')
        quizEl.className = 'quizEl'
        const questionTitle = document.createElement('h1')
        questionTitle.textContent = `${i+1}. ${filteredData[i].question}`

        const AnswersEl = document.createElement('div')
        AnswersEl.className = 'AnswersEl'


        for(let j = 0; j < filteredData[j].options.length; j++){
            const ansBtn = document.createElement('button')
            ansBtn.className='ansBtn'
            ansBtn.textContent = filteredData[i].options[j]
            ansBtn.dataset.index = j

            ansBtn.addEventListener('click', function(){
                const allButtons = this.parentElement.querySelectorAll('button')
                const ansExplanation = document.createElement('h1')
                ansExplanation.className = "ansExplanation"
                allButtons.forEach(btn=>{
                    btn.disabled = true
                })

                if(filteredData[i].answer === Number(this.dataset.index)){
                    console.log("Correct")
                    this.style.backgroundColor = 'green'
                    this.style.color = 'white'
                    ansExplanation.textContent = `✅ ${filteredData[i].explanation}`;
                    quizEl.appendChild(ansExplanation)

                }else{
                    this.style.backgroundColor = 'red'
                    this.style.color = 'white'
                    ansExplanation.textContent = `❌ ${filteredData[i].explanation}`;
                    quizEl.appendChild(ansExplanation)
                }
            })

            AnswersEl.appendChild(ansBtn)
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