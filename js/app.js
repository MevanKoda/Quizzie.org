const form = document.getElementById('customize-form')

form.addEventListener('submit', (event)=>{
    event.preventDefault()

    const formData = new FormData(form)

    const subject = formData.get('subject')
    const questionCount = formData.get('question-count')
    const quizDuration = formData.get('duration')

    console.log(`Subject :- ${subject}, Quiz-Count :- ${questionCount}, Duration :- ${quizDuration}`)
})