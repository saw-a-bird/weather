
import currentSeason from './__get_season';
import seasonsCSS from '../styles/seasons.module.css'
import colorBetween from 'color-between';
import weatherRequest from './_open_weather_api';
import { useEffect, useState } from 'react';

import { BackgroundArea, CloudArea, StarArea } from './_particles';
import { FaInfoCircle } from "react-icons/fa";
import Modal from './modal';
import CompassArrow from './CompassArrow';

var brightness, progressColor;
var sunrise, sunset, stable;
var currentTime, dayPart;
var season;

function Picture() { 
  const [loaded, setLoaded] = useState(false);
  const [styles, setStyles] = useState(null);
  const [resultAPI, setAPIResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(async ()=> {

    var r = await weatherRequest();
    if (typeof r === 'object' && r !== null) {
      // console.log(JSON.stringify(r))
      season = currentSeason();

      setAPIResult(r)
      setStyles(getStyle(season.date, r));

      setLoaded(true);
    }
  }, [])

  if (loaded) {
      return (
          <> 
          <div className={seasonsCSS.seasonsContainer} style = {styles}>
          <BackgroundArea seasonId = {season.id} api = {resultAPI} dayPart = {dayPart}/>
          <CloudArea api = {resultAPI} /> 
          {dayPart == "Night" && <StarArea /> }

          <a href="#" id={season.id} className={`${seasonsCSS.season} ${getSeasonClass(season.id)} ${seasonsCSS.active}`}></a>
          <span className={seasonsCSS.grass}></span>

          {showModal && <Modal
              onClose={() => setShowModal(false)}
              show={showModal}
          >
              {generateContent(resultAPI)}
          </Modal>}

          <button onClick={() => {
            setShowModal(true)
          }} className={seasonsCSS.optionsBtn}> More details <FaInfoCircle style= {{"marginRight": 5, "display": "inline-block"}}/> </button>

          
        </div>
          <CompassArrow degree = {resultAPI.wind.deg} color = {colorBetween("#A3A3A3", "#000000", (brightness - 50) /  50, "hex")} />
          </>
        )
  } else {
    return (
    <div className={seasonsCSS.seasonsContainer+" "+seasonsCSS.loadingCenter}>
      <p> Loading... </p>
      <span className={seasonsCSS.grass}></span>
    </div>);
  }
};


function generateContent(api) {
  var getCountryNames = new Intl.DisplayNames(['en'], {type: 'region'});
  var mainParagraph, smallerParagraph;

  switch(api.weather[0].main) {
    case "Thunderstorm":
      mainParagraph = "The weather is currently pretty stormy"
      break;
    case "Drizzle":
      mainParagraph = "It's currently raining, but only drizzles."
      break;
    case "Rain":
      mainParagraph = "It's raining..."
      break;
    case "Snow":
      mainParagraph = "It's snowing..."
      break;
    case "Clouds":
      mainParagraph = "The skies are pretty cloudy"
      break;
    case "Clear": 
      mainParagraph = "The skies are clear."
      break;
    case "Misty":
      mainParagraph = "It's getting a little misty."
      break;
    case "Fog":
      mainParagraph = "It's getting a little foggy."
      break;
    default:
      mainParagraph = api.weather.main;
  }

  const currentDate = new Date(0);
  currentDate.setSeconds(currentTime);

  const sunsetStart = new Date(0), sunriseStart = new Date(0), sunsetEnd = new Date(0), sunriseEnd = new Date(0);
  sunriseStart.setSeconds(sunrise), sunriseEnd.setSeconds(stable.sunrise);
  sunsetStart.setSeconds(sunset), sunsetEnd.setSeconds(stable.sunset);
  
  const tempFarenheit = (1.8*(api.main.temp-273) + 32);

  return (<>
  <span> {mainParagraph}  
  {/* <div className="weather-icon"> */}
         <img style={{width:'70px', 'display': 'inline-block'}} src= {`http://openweathermap.org/img/w/${api.weather[0].icon}.png`} />
  {/* </div>  */}
  </span>
  <br />
  <h3 style = {{"fontSize": 18}}> Currently, </h3>
  <p> Country: { getCountryNames.of(api.sys.country) } </p>
  <p> Season : { season.name }</p>
  <p> Time: { currentDate.toISOString().substring(11, 19) } ( { dayPart } ) </p>
  <p> Sunset/Sunrise Progress : { (progressColor*100).toFixed(2) }%</p>
  <p> Daylight Brightness : { brightness.toFixed(2) }%</p>
  
  <br/>
  <h3 style = {{"fontSize": 18}}> Weather Conditions: </h3>
  <p> Cloudiness: { api.clouds.all}% </p>
  <p> Humidity: { api.main.humidity}%  ( { getHumidityLevel(api.main.humidity) } ) </p>
  <p> Windspeed: { api.wind.speed}meter/s ( { getWindSpeedLevel(api.wind.speed) } ) </p>
  <p> Temperature: { tempFarenheit.toFixed(2)}°F ( { getTemperatureLevel(tempFarenheit)} ) </p>

  <br/>
  <h3 style = {{"fontSize": 18}}> Day/Night time: </h3>
  <p> Sunrise: { sunriseStart.toISOString().substring(11, 19) } (ends at { sunriseEnd.toISOString().substring(11, 19) }) </p>
  <p> Sunset: { sunsetStart.toISOString().substring(11, 19) }  (ends at { sunsetEnd.toISOString().substring(11, 19) }) </p>
  <br />
  
  <div className = {seasonsCSS.info_bottom_bar}>
    <div><i className = {seasonsCSS.details_info}> Still in development.. </i> <i className = {seasonsCSS.details_info}> Refresh to get the latest updates..</i></div>
    <button className = { seasonsCSS.sandboxBtn } disabled> Sandbox Mode </button>
  </div>
  </>)
}



const getStyle = (date, info) => {
  // blend two hex colors together by an amount
  const blendColors = (colorA, colorB, amount) => {
    return colorBetween(colorA, colorB, amount, "hex")
  }

  sunrise =  dateToSeconds(new Date(info.sys.sunrise * 1000)), sunset =  dateToSeconds(new Date(info.sys.sunset * 1000));
  stable = { sunrise: sunrise + 7200, sunset: sunset + 7200};
  currentTime = dateToSeconds(date);
  // currentTime = 39600; // 11AM
  // currentTime = 80000; // Night
  // currentTime = 20000; // Sunrise
  dayPart = getDayPart();

  var first_color, second_color, third_color;

  switch (dayPart) {
    case "Day":
      brightness =  100;
      progressColor = 1;
      first_color = "#0063a6";
      second_color = "#0072c0";
      third_color = "#ffffff";
      break;
    case "Sunrise": 
      brightness =  50 + (( 50 / 7200 ) * (currentTime - sunrise));
      progressColor = (currentTime - sunrise) / 7200;
      first_color = blendColors("#000000", "#0063a6", progressColor);
      second_color = blendColors("#000000", "#0072c0", progressColor);
      third_color = blendColors("#3F3F3F", "#ffffff", progressColor);
      break;
    case "Sunset":
      brightness =  100 - (( 50 / 7200 ) * (currentTime - sunset));
      progressColor = (currentTime - sunset) / 7200;
      first_color = blendColors("#0063a6", "#000000", progressColor);
      second_color = blendColors("#0072c0", "#000000", progressColor);
      third_color = blendColors("#ffffff", "#3F3F3F", progressColor);
      break;
    case "Night":
      brightness =  50;
      progressColor = 1;
      first_color = "#000000";
      second_color = "#000000";
      third_color = "#3F3F3F";
      break;
  }

  return {
    "filter": "brightness("+brightness+"%)",
    "backgroundImage": "-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, "+first_color+"), color-stop(15%, "+second_color+"), color-stop(100%, "+third_color+"))",
    "backgroundImage": "-moz-linear-gradient(top, "+first_color+" 0%, "+second_color+" 15%, "+third_color+" 100%)",
    "backgroundImage": "-webkit-linear-gradient(top, "+first_color+" 0%, "+second_color+" 15%, "+third_color+" 100%)",
    "backgroundImage": "linear-gradient(to bottom, "+first_color+" 0%, "+second_color+" 15%, "+third_color+" 100%)"
  }
}

export default Picture;








const getSeasonClass = (seasonId) => {
  switch (seasonId) {
    case "winter":
      return seasonsCSS.winter;
    case "fall":
      return seasonsCSS.fall;
    case "spring":
      return seasonsCSS.spring;
    case "summer":
      return seasonsCSS.summer;
  }
}

const dateToSeconds = (date) => {
  return (date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds();
}


const getDayPart = () => {
  if (currentTime >= stable.sunrise && currentTime <= sunset) { // day
    return "Day"

  } else if (currentTime >= sunrise &&  currentTime <= stable.sunrise) { // sunrise
    return "Sunrise"

  } else if (currentTime >= sunset &&  currentTime <= stable.sunset) { // sunset
    return "Sunset"

  } else { // darkness
    return "Night"
  }
}


const getTemperatureLevel = (tempFarenheit)  => {
  if(tempFarenheit <= 40) { 
    return "Cold"

  } else if(tempFarenheit <= 60) { 
    return "Moderate"

  } else if(tempFarenheit <= 91) { 
    return "Warm"

  }else if(tempFarenheit <= 110) { 
    return "Hot"
  }
}

const getWindSpeedLevel = (meterS)  => {
  if(meterS <= 1.34112) { 
    return "Light Air"

  } else if(meterS <= 3.12928) { 
    return "Light Breeze"

  } else if(meterS <= 5.36448) { 
    return "Gentle Breeze"
    
  }else if(meterS <= 10.729) { 
    return "Fresh Breeze"
    
  }else if(meterS <= 13.4112) { 
    return "Strong Breeze"

  }else {
    return "Gale"
  }
}

const getHumidityLevel = (humidity)  => {
  if(humidity < 40) { 
    return "Too dry"

  } else if(humidity < 70) { 
    return "Average"

  }else {
    return "Too humid"
  }
}