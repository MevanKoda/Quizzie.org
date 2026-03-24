const toggleBtn = document.getElementById('toggleBtn')
const modeIcon = document.getElementById('icon')

toggleBtn.addEventListener('click',()=>{
    document.documentElement.classList.toggle('dark')

    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark? 'dark':'light')

})

