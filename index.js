const search = document.querySelector('#search');
const city = document.querySelector('.city');
const degree = document.querySelector('.current-degree');
const dateText = document.querySelector('.date');
const submit = document.querySelector('#submit');
const body= document.querySelector('body');
const now = new Date();


const backgrounds = ['./image/mountain.jpg', './image/dark-cloud.jpg', './image/grassy-cloud.jpg']
function bg(){
    const linear = 'linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))'
    let index = Math.floor(Math.random() * backgrounds.length);
    body.style.backgroundImage = `${linear}, url(${backgrounds[index]})`
}
bg()


const renderText = function(msg){
  degree.insertAdjacentText('afterbegin', msg)
}
function foreCast(searchValue) {
  fetch(`https://goweather.herokuapp.com/weather/${searchValue}`)
    .then((response) => {
       city.textContent = searchValue
        if(!response.ok){
            throw new Error(`Error ${response.status} encountered while searching...`)
        }
        return response.json()})
    .then((data) =>{
        console.log(data);
        const tempBold = document.querySelector('.temp-bold');
        const weather = document.querySelector('.weather');
        const windy = document.querySelector('.temp-pg');

        const {temperature, description, wind} = data;
          tempBold.textContent = temperature;
          weather.textContent = description;
          windy.textContent = `wind: ${wind}`
    }).catch(err => renderText(`(Error ${err.message}) Bad things happened while accessing the page!`));
}
 
submit.addEventListener('click', function(){
    foreCast(search.value)
});
 

function dateBuilder(d){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

     const day =  days[d.getDay()];
     const date = d.getDate();
     const month = months[d.getMonth()];
     const year = d.getFullYear();

     return dateText.textContent =  `${day}, ${date}, ${month}, ${year}.`;

}

dateBuilder(now);