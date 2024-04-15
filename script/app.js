const ball = document.querySelector(`.ball`);
const resultBtn = document.querySelector(`.result__btn`);
const resultbox = document.querySelector(`.result__score`);
const averageScore = document.querySelector(`.mid__score`);
let data = [];
let lastTime = Date.now();
const images = [
    '../img/ball.png',
    '../img/ballblue.png',
    '../img/ballon.png',
    '../img/basketball.png',
    '../img/basketball2.png',
    '../img/beachball.png',
    '../img/beysball.png',
    '../img/cricket.png',
    '../img/football.png',
    '../img/loto.png',
    '../img/pokemonball.png',
    '../img/pullball.png',
    '../img/regbi.png',
    '../img/squash.png',
    '../img/ballonblue.png'
];

const getAverage = () => {
    const sum = data.reduce((acc, time) => acc + parseFloat(time), 0); 
    const averageTime = (sum / data.length).toFixed(3); 
    averageScore.textContent = `Average: ${averageTime} sec`; 
}

const getData = (resultTime) => {
    data.push(resultTime); 
    localStorage.setItem('results', JSON.stringify(data)); 
    getAverage(); 
}

const loadResults = () => {
    const results = localStorage.getItem('results');
    if (results) {
        data = JSON.parse(results); 
        data.forEach(resultTime => {
            const resultText = document.createElement('p');
            resultText.className = 'result__text';
            resultText.textContent = `${resultTime} sec`;
            resultbox.appendChild(resultText);
        });
        getAverage(); 
    }
}

const handleClick = (evt) => {
    const nowTime = Date.now();
    if (lastTime !== null) {
        const resultTime = ((nowTime - lastTime) / 1000).toFixed(3);
        const resultText = document.createElement('p');
        resultText.className = 'result__text';
        resultText.textContent = `${resultTime} sec`;
        resultbox.appendChild(resultText);
        resultText.scrollIntoView({ behavior: 'smooth', block: 'end' });
        getData(resultTime);
    }
    lastTime = nowTime;
}

const changeImages = (evt) =>{
    const randomIndex = Math.floor(Math.random() * images.length);
    evt.target.src = images[randomIndex];
}

ball.addEventListener(`click`, (evt) =>{
    console.log(`clck`);
    const ball = evt.target; 
    ball.style.left = `${Math.ceil(Math.random() * 700)}px`;
    ball.style.right = `${Math.ceil(Math.random() * 700)}px`;
    ball.style.top = `${Math.ceil(Math.random() * 700)}px`;
    ball.style.bottom = `${Math.ceil(Math.random() * 700)}px`;
    changeImages(evt);
    handleClick(evt);
})

resultBtn.addEventListener(`click`, (evt)=>{
    resultbox.innerHTML= ``;
    localStorage.clear();
    data = []; 
    averageScore.textContent = 'Average: 0 sec';
})

document.addEventListener(`DOMContentLoaded`, loadResults);