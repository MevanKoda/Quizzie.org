let time = null
let intervalId = null



export function timer(duration,saveResult) {
    time = duration * 60
    const totalTime = time
    const timerEl = document.getElementById('timerEl')


    intervalId = setInterval(() => {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60

        timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
        time--

        if (time <= totalTime * 0.5 && time > totalTime * 0.2) {
            timerEl.style.backgroundColor = 'orange'   // last 50%-20%
        } else if (time <= totalTime * 0.2 && time > 0) {
            timerEl.style.backgroundColor = 'red'      // last 20%
        } else if (time <= -1) {
            clearInterval(intervalId)
            setTimeout(() =>{
                quizOverSoundPlayer.play()
                saveResult()
                window.location.href = '../pages/result.html'
            }, 2000)
        }
    }, 1000)
}