const axios = require('axios');
const apiKey = require('../api.json');

const Weather = require('../model/weather');
module.exports = {
  getWeather: async function ({ latitude, longitude }, req) {
    // 1. 위도 경도로 위치 검색

    const { weatherKey } = apiKey;
    const { GoogleKey } = apiKey;
    const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GoogleKey}`;
    // const {
    //   data: { results }
    // } = await axios.get(googleApi);

    // 2. 도시 이름 가져오기

    // API 잠시 하드코딩하기
    // const locationData = results[0].formatted_address.split(',');
    // const location = {
    //   contry: locationData[3].trim(),
    //   city: locationData[2].trim(),
    //   gu: locationData[1].trim()
    // };

    const location = {
      contry: 'south korea',
      city: 'Seoul',
      gu: 'Gangnam-gu'
    };

    // 3. DB에 검사하기
    let isData = await Weather.where({ city: location.city });
    let forecastObj = {};

    // db에 없으면 가져오기
    if (isData.length === 0) {
      // 3. 날씨 가져오기
      let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${location.city}&appid=${weatherKey}&units=metric`;

      const { data } = await axios.get(apiUrl);

      let weatherArr = [];
      let i = 0;

      for (let d of data.list) {
        weatherArr[i] = {
          time: d.dt,
          temp: Math.round(d.main.temp),
          feels_like: Math.round(d.main.feels_like),
          condition: d.weather[0].main
        };
        i++;
      }

      forecastObj = new Weather({
        city: location.city,
        gu: location.gu,
        weathers: weatherArr[0]
      });
      await forecastObj.save();
    } else {
      forecastObj = await Weather.findOne({ city: location.city });
    }

    return forecastObj;
  }
};
