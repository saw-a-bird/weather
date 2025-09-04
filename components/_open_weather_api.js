const key = 'cdcc76cae64b4b0c44d0801a5373b09f';
const options = {
  enableHighAccuracy: true
};

const defaultCoords = { latitude: 40.7128, longitude: -74.0060 }; // New York

async function weatherRequest() {
  if (!global.navigator.geolocation){
    alert('Geolocation is not supported by your browser');
  } else {
    var position = await getPosition().catch((error) => {
    // use the constants instead of raw numbers for clarity
    var errorMessage = null;
    if (error.code === GeolocationPositionError.PERMISSION_DENIED) {
      errorMessage = "User denied geolocation access";
    } else if (error.code === GeolocationPositionError.POSITION_UNAVAILABLE) {
      errorMessage = "Position unavailable (defaulting to New York)";
    } else if (error.code === GeolocationPositionError.TIMEOUT) {
      errorMessage = "Request timed out";
    } else {
      errorMessage = "Unknown geolocation error (Check console)";
      console.warn(error);
    }

      alert(`Open-weather API error (code: ${error.code}): ${errorMessage}`);
      return null;
    });

    var crd = null;
    if (position == null) {
      crd = defaultCoords;
    } else {
      crd = position.coords;
    }

    return await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ crd.latitude + '&lon='+crd.longitude+'&appid=' + key)  
      .then(function(resp) { 
        return resp.json()
      })
      .catch(function(error) {
        console.warn(`ERROR FETCH: (${error.code}): ${error.message}`);
        return -1
      });
  }

  return -1;
}

function getPosition() {
  return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
  });
}

export default weatherRequest
