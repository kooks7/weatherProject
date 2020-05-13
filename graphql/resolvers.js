const axios = require('axios');
// const apiKey = require('../api.json');
// const Weather = require('../model/weather');
const Clothesdata = require('../model/ClothesData');
const City = require('../model/CityId');

module.exports = {
  getWeather: async function ({ latitude, longitude }, req) {
    // 1. 위도 경도로 위치 검색

    // const { weatherKey } = apiKey;
    // const { GoogleKey } = apiKey;
    let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.weatherKey}&units=metric`;
    const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GoogleKey}`;
    const { data } = await axios.get(apiUrl);
    const {
      data: { results }
    } = await axios.get(googleApi);

    const locationData = results[results.length - 3].formatted_address.split(
      ','
    );

    let city = '';
    let country = locationData[locationData.length - 1];
    if (locationData.length > 2) {
      for (let i = 0; i < locationData.length - 2; i++) {
        city = city + locationData[i];
      }
    } else {
      city = locationData[0];
    }

    let weatherArr = [];
    let i = 0;
    for (let d of data.list) {
      weatherArr[i] = {
        id: d.dt + data.city.name,
        time: d.dt,
        temp: Math.round(d.main.temp),
        feels_like: Math.round(d.main.feels_like),
        temp_min: Math.round(d.main.temp_min),
        temp_max: Math.round(d.main.temp_max),
        condition: d.weather[0].main,
        humidity: d.main.humidity,
        wind_speed: d.wind.speed,
        rain: d.rain ? d.rain['3h'] : 0
      };
      i++;
    }
    // 값 5개만 넣어주기
    let tempArr = [];
    for (let j = 0; j < 5; j++) {
      tempArr.push(weatherArr[j]);
    }
    let forecastObj = {
      city: city,
      country: country,
      weathers: tempArr
    };
    return forecastObj;
  },
  getClothes: async function ({ temp, city, time }) {
    try {
      // 1. 온도에 따라 레벨 분류하기
      let tempLevel;
      if (temp <= -5) {
        tempLevel = 0;
      } else if (temp > -5 && temp <= 0) {
        tempLevel = 1;
      } else if (temp > 0 && temp <= 10) {
        tempLevel = 2;
      } else if (temp > 10 && temp <= 14) {
        tempLevel = 3;
      } else if (temp > 14 && temp <= 17) {
        tempLevel = 4;
      } else if (temp > 17 && temp <= 20) {
        tempLevel = 5;
      } else if (temp > 20 && temp <= 25) {
        tempLevel = 6;
      } else if (temp > 25 && temp <= 30) {
        tempLevel = 7;
      } else if (temp > 30 && temp <= 35) {
        tempLevel = 8;
      } else {
        tempLevel = 9;
      }

      const timeStamp = new Date(time);

      const year = timeStamp.getFullYear();
      const month = timeStamp.getMonth() + 1;
      const date = timeStamp.getDate();
      const fullTime = year.toString() + month.toString() + date.toString();
      // 1. db에 도시 + 날짜 데이터 있는지 찾고

      const isData = await Clothesdata.find({ city: city, time: fullTime });
      // 데이터 없으면 db에 넣어주기
      if (isData.length === 0) {
        const outer = require('../data/outer.json');
        const top = require('../data/top.json');
        const bottom = require('../data/bottom.json');
        const acc = require('../data/acc.json');
        const clothes = new Clothesdata({
          city,
          time: fullTime,
          outer: outer,
          top: top,
          bottom: bottom,
          acc: acc
        });
        await clothes.save();
      }

      let resObj = {
        outer: [],
        top: [],
        bottom: [],
        acc: [],
        shoes: [],
        casual_shoes: []
      };
      // time complexity 가 O(n^2) 지만 오브젝트에 몇개 안됨 그냥 두기
      let [ClothesDB] = await Clothesdata.find({
        city: city,
        time: fullTime
      }).select('outer top bottom acc -_id');
      ClothesDB = ClothesDB.toObject();

      for (let k in ClothesDB) {
        for (let i = 0; i < ClothesDB[k].length; i++) {
          if (ClothesDB[k][i].level.includes(tempLevel)) {
            resObj[k].push(ClothesDB[k][i]);
          }
        }
      }
      return resObj;
    } catch (err) {
      console.log(err);
    }
  },
  getCityId: async function ({ city }) {
    try {
      // 1. validator로 검사하기

      // 2. 도시 검색 결과 정규식에 넣고
      let reg1 = new RegExp(`^${city}$`, 'ig');
      let reg2 = new RegExp(`^${city}`, 'ig');

      // 3. 정확한 이름 찾기
      let data = await City.find()
        .where('name')
        .regex(reg1)
        .select('-_id name country coord')
        .limit(1);
      if (data.length === 0) {
        data = await City.find()
          .where('name')
          .regex(reg2)
          .limit(3)
          .select('-_id name country coord');
        if (data.length === 0) {
          let reg3 = new RegExp(`${city}`, 'ig');
          data = await City.find()
            .where('name')
            .regex(reg3)
            .limit(5)
            .select('-_id name country coord');
        }
      }

      // const { GoogleKey } = apiKey;
      // 4. API 에서도 찾기
      let cityQuery = city.split(' ').join('+');
      const getCityApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityQuery}&key=${process.env.GoogleKey}`;
      const {
        data: { results }
      } = await axios.get(getCityApiUrl);

      // 데이터 없으면 db에서만 찾은것 보내기
      if (results.length === 0) {
        if (data[0].name === data[1].name) {
          return [data[0]];
        }
        return data;
      }

      // 데이터가 있으면

      let locationData = results[0].formatted_address.split(',');
      let resObj = {
        name: locationData[0],
        country: locationData[locationData.length - 1],
        coord: {
          lon: results[0].geometry.location.lng,
          lat: results[0].geometry.location.lat
        }
      };

      // 5. DB와 API에서 찾은 값 합치기
      let resArr = [];
      if (resObj.name.toLowerCase() !== city.toLowerCase()) {
        resArr.push(resObj);
        resArr = resArr.concat(data);
      } else {
        resArr = resArr.concat(resObj);
      }
      return resArr;
    } catch (err) {
      console.log(err);
    }
  }
};
