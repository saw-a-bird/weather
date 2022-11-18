const key = 'cdcc76cae64b4b0c44d0801a5373b09f';
const options = {
  enableHighAccuracy: true
};

async function weatherRequest() {
  if (!global.navigator.geolocation){
    alert('Geolocation is not supported by your browser');
  } else {
    var position = await getPosition().catch((error) => {
      console.warn(`ERROR LOCATION: (${error.code}): ${error.message}`);
      return null;
    });

    if (position != null) {
      const crd = position.coords;

      return await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ crd.latitude + '&lon='+crd.longitude+'&appid=' + key)  
      .then(function(resp) { 
        return resp.json()
      })
      .catch(function(error) {
        console.warn(`ERROR FETCH: (${error.code}): ${error.message}`);
        return -1
      });

    }
  }

  return -1;
}

function getPosition() {
  return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
  });
}

export default weatherRequest
