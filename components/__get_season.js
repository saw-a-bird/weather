const seasons = [{
    id: 'spring',
    name: 'Spring',
    start: new Date(2000, 2, 21),
    end: new Date(2000, 5, 20)
  },{
    id: 'summer',
    name: 'Summer',
    start: new Date(2000, 5, 21),
    end: new Date(2000, 8, 20)
  },{
    id: 'fall',
    name: 'Autumn/Fall',
    start: new Date(2000, 8, 21),
    end: new Date(2000, 11, 20)
  },{
    id: 'winter',
    name: 'Winter',
    start: new Date(2000, 11, 21),
    end: new Date(2001, 2, 20)
  }];

  
  /** Checks if a date is within a specified season */
  function checkSeason(season, date) {
    let remappedStart = new Date(2000, season.start.getMonth(), season.start.getDate());
    let remappedDate = new Date(2000, date.getMonth(), date.getDate());
    let remappedEnd = new Date(2000, season.end.getMonth(), season.end.getDate());
  
    if (season.start.getFullYear() === season.end.getFullYear()) {
      return (remappedStart <= remappedDate) && (remappedDate <= remappedEnd);
    } else {
      return (remappedStart <= remappedDate) && (remappedDate <= new Date(2000, 11, 31))
      || (new Date(2000, 0, 1) <= remappedDate) && (remappedDate <= remappedEnd);
    }
  }
  
  function findSeason(seasons, date) {
    for (let i = 0; i < seasons.length; i++) {
      let isInSeason = checkSeason(seasons[i], date);
      if (isInSeason === true) {
        return seasons[i];
      }
    }
  
    return null;
  }

  // Handlers
function currentSeason() {
    let date = new Date();
    var offset = date.getTimezoneOffset();
    offset = Math.abs(offset / 60);
    date.setHours(date.getHours() + offset);
    
    let season =  findSeason(seasons, date);
    // if (season === null) {
    //   return {date: date, name: 'No season'};
    // } else {
      return {date: date, id: "winter", name: "winter"};
    // }
}



export default currentSeason;