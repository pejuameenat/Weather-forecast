const search = document.querySelector('#search');
const city = document.querySelector('.city');
const degree = document.querySelector('.current-degree');
const dateText = document.querySelector('.date');
const submit = document.querySelector('#submit');
const body= document.querySelector('body');
const now = new Date();
const header = document.querySelector('header')


const backgrounds = ['./image/mountain.jpg', './image/dark-cloud.jpg', './image/grassy-cloud.jpg', './image/pattern-bg.avif']
function bg(){
    const linear = 'linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'
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
      if(!searchValue){
        const em  = document.createElement('em')
        em.textContent='Please enter a valid city!'
        header.insertAdjacentElement('afterend', em);
      }
       city.textContent = searchValue;
        if(!response.ok){
            throw new Error(`${response.status} encountered while searching!..`)
        }
        return response.json()})
    .then((data) =>{
      const {temperature, description, wind} = data;
      if(data.temperature === '' || data.description === '' || data.wind === ''){
        throw new Error("Sorry! We can't find the weather information for this place.")
      }
        const tempBold = document.querySelector('.temp-bold');
        const weather = document.querySelector('.weather');
        const windy = document.querySelector('.temp-pg');
        
          tempBold.textContent = temperature;
          weather.textContent = description;
          windy.textContent = `wind: ${wind}`
    }).catch(err => renderText(`(Error ${err.message}) country/city not found.`));
}
 
submit.addEventListener('click', function(){
    foreCast(search.value)
});
 
search.addEventListener('keyup', function(e){
  if (e.key === "Enter") {
    foreCast(search.value)
  }
})

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