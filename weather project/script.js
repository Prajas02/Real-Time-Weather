const show_time = document.getElementById('show-time')
const temp = document.getElementById('temp')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')
const visibility = document.getElementById('visibility')
const high = document.getElementById('high')
const low = document.getElementById('low')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const weather_type = document.getElementById('weather-type')
days = ['Sun' , 'Mon' ,'Tue','Wed','Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu']

current_date_time = new Date();
today_date = current_date_time.getFullYear() +'-'+0+ (Number(current_date_time.getMonth())+1) +'-'+ 0+current_date_time.getDate()
      
today_time = current_date_time.getHours() +':'+ current_date_time.getMinutes()
setInterval(() => {
show_time.innerHTML = " "+ today_time
}, 1000);

// setting dates
document.getElementById('today').innerHTML = days[current_date_time.getDay()]+' '+ current_date_time.getDate()
document.getElementById('tomm').innerHTML = days[current_date_time.getDay()+1]+' '+ (current_date_time.getDate()+1)
document.getElementById('tomm1').innerHTML = days[current_date_time.getDay()+2]+' '+ (current_date_time.getDate()+2)
document.getElementById('tomm2').innerHTML = days[current_date_time.getDay()+3]+' '+ (current_date_time.getDate()+3)
document.getElementById('tomm3').innerHTML = days[current_date_time.getDay()+4]+' '+ (current_date_time.getDate()+4)
document.getElementById('tomm4').innerHTML = days[current_date_time.getDay()+5]+' '+ (current_date_time.getDate()+5)


function fetch_current_location() {
  function location(loc){
    const coords = loc.coords
    let latitude = coords.latitude
    let longitude = coords.longitude
    url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,rain,pressure_msl,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max&timezone=auto`
    fetch(url)
      .then(response => response.json())
      .then(data=>{
        console.log(data)
      current_data = data.current
      horuly_data = data.hourly;
      daily_data = data.daily

      temp.innerHTML = current_data.temperature_2m + '    ' + data.current_units.temperature_2m
      wind.innerHTML = current_data.wind_speed_10m + '    ' + data.current_units.wind_speed_10m
      humidity.innerHTML = current_data.relative_humidity_2m + '    ' + data.current_units.relative_humidity_2m
      visibility.innerHTML = (horuly_data.visibility[0]/1000) + '   '+ 'Km'
      high.innerHTML = daily_data.temperature_2m_max[0]
      low.innerHTML = daily_data.temperature_2m_min[0]
      sunrise.innerHTML = daily_data.sunrise[0].slice(11,) + ' ' + 'AM'
      sunset.innerHTML = daily_data.sunset[0].slice(11,) + ' ' + 'PM'
      if(current_data.temperature_2m >=30 && current_data.relative_humidity_2m >=60){
        weather_type.innerHTML  = 'Hot & Humid'
      }
      else if(30>=current_data.temperature_2m>=25 && current_data.relative_humidity_2m >=60 ){
        weather_type.innerHTML  = 'Moderate & Humid'
      }
      else{
        weather_type.innerHTML = "hello"
      }


      for(let i=0;i<5;i++){
        document.getElementById(`high_tomm${i}`).innerHTML = daily_data.temperature_2m_max[i+1]
        document.getElementById(`low_tomm${i}`).innerHTML = daily_data.temperature_2m_min[i+1]
        document.getElementById(`prep${i}`).innerHTML = "Can't Found Enough Data"
      }


    //   for(let i = 0;i<date_time.length;i++){
    //     date = date_time[i].slice(0,10)
    //     time = date_time[i].slice(11,)
    //     if(date==today_date){
    //       if (today_time>='23:00'){
    //         document.getElementById('gettemp').innerHTML = data.hourly.temperature_2m[i+1]+' '+ data.hourly_units.temperature_2m;
    //         document.getElementById('windspeed').innerHTML = data.hourly.wind_speed_10m[i+1] +' '+ data.hourly_units.wind_speed_10m;
    //         document.getElementById('precipitation').innerHTML = data.hourly.precipitation_probability[i+1] + ' '+ data.hourly_units.precipitation_probability;
    //         break
    //       }
    //       else if(today_time<=time){
    //         document.getElementById('gettemp').innerHTML = data.hourly.temperature_2m[i] +' '+ data.hourly_units.temperature_2m;
    //         document.getElementById('windspeed').innerHTML = data.hourly.wind_speed_10m[i] +' '+ data.hourly_units.wind_speed_10m;
    //         document.getElementById('precipitation').innerHTML = data.hourly.precipitation_probability[i] + ' '+ data.hourly_units.precipitation_probability;
    //         break
    //       }
    //     }
    //   }            
      })
  }
  navigator.geolocation.getCurrentPosition(location)
}

window.onload = fetch_current_location;


// data.hourly.temperature_2m[i]
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,rain,pressure_msl,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max&timezone=auto