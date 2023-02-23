const day =document.querySelectorAll('.day');
const date=document.querySelector('.date');
const numToday=document.querySelector('.today .num');
const forecastContent=document.querySelectorAll('.forecast-content');
const search=document.getElementById('search');
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
for(let i=0;i<day.length;i++){
    day[i].textContent=`${getDay(new Date().getDay()+i)}`;
}
date.textContent=`${new Date().getDate()}${months[new Date().getMonth()]}`;
const getAPI=async (countryinpt)=>{
    
    let apiRes=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=631ab6d01e124f5aa49183304232202&q=${countryinpt}&days=3`);
    if (apiRes.ok && 400 != apiRes.status) {
        let country = await apiRes.json();
        let cartoinaCurrent='';
    cartoinaCurrent += `\t<div class="location">${country.location.name}</div>\n <div class="degree"><div class="num">${country.current.temp_c}<sup>o</sup>C</div>\n <div class="forecast-icon">\n <img src="https:${country.current.condition.icon}" alt="" width=90>\n </div>\n  </div>\n <div class="custom">${country.current.condition.text}</div>\n </div>\n </div>
    <span><img src="image/icon-umberella.png" alt="" width="21" height="21">20%</span>\n
								<span><img src="image/icon-wind.png" alt="" width="23" height="21">18km/h</span>\n
								<span><img src="image/icon-compass.png" alt="" width="21" height="21">East</span>\n`;
    document.querySelector("#current").innerHTML = cartoinaCurrent;
    for(let i=1;i<forecastContent.length;i++){
        let cartoina='';
        cartoina += `\t<div class=" <div class="forecast-content">\n <div class="forecast-icon">\n <img src="https:${country.forecast.forecastday[i].day.condition.icon}" alt="" width=48>\n </div>\n <div class="degree">${country.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>\n <small>${country.forecast.forecastday[i].day.mintemp_c}<sup>o</sup></small>\n <div class="custom">${country.forecast.forecastday[i].day.condition.text}</div>\n </div>\n </div>`;
    document.querySelectorAll(".forecast-content")[i].innerHTML = cartoina;
    }
    }
    
};
getAPI('cairo');
function getDay(day){
    switch (day) {
        case 0:
         return day = "Sunday";
        case 1:
         return day = "Monday";
        case 2:
         return day = "Tuesday";
        case 3:
         return day = "Wednesday";
        case 4:
         return day = "Thursday";
        case 5:
         return day = "Friday";
        case 6:
         return day = "Saturday";
      }
};
search.addEventListener('keyup',targetInfo=>{
    getAPI(`${targetInfo.target.value}`);
    // console.log(targetInfo.target.value);
});