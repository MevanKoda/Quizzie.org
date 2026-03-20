
const form = document.getElementById('customize-form')

form.addEventListener('submit', async(event)=>{
    event.preventDefault()

    const formData = new FormData(form)

    const category = formData.get('category')
    const questionCount = formData.get('question-count')
    const quizDuration = formData.get('duration')
    console.log(quizDuration)

    if(!questionCount || !quizDuration){
        window.alert("Please add Question Count and Duration")
    }else{
    const url =`./pages/quiz.html?category=${category}&count=${questionCount}&duration=${quizDuration}`
    window.location.href=url
    }
})