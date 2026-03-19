let time = null

export function timer(duration){
    time = duration * 60;

    const intervalId = setInterval(()=>{
        let minutes = Math.floor(time / 60)
        let seconds = time % 60
        const timerEl = document.getElementById('timerEl')

        timerEl.textContent = `${minutes} : ${seconds.toString().padStart(2,'0')}`
        time--

        if(time <= 0){
            timerEl.textContent = "Times Up"
            setTimeout(()=>window.location.href='../pages/result.html', 2000)
        }
        
    }, 1000)
}