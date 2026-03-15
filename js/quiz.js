async function fetchQuiz(){
    try{
        const response = await fetch('../data/questions.json');
        const data = await response.json()
        if(!response){
            console.log("Failed to fetch response")
        }

        console.log(data)

    }catch(error){
        console.error(error)
    }
}