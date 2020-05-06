const axios = require('axios');
const apiKey = require('../api.json');

// const Weather = require('../model/weather');
const Clothes = require('../model/Clothes');
const City = require('../model/CityId');
const clothes = require('../model/ClothesObj');

module.exports = {
  getWeather: async function ({ latitude, longitude }, req) {
    console.log('getWeather 실행');
    // 1. 위도 경도로 위치 검색

    const { weatherKey } = apiKey;
    const { GoogleKey } = apiKey;
    let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=metric`;
    const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GoogleKey}`;
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GoogleKey}
    const { data } = await axios.get(apiUrl);
    const {
      data: { results }
    } = await axios.get(googleApi);
    // console.log(results);
    let country;
    let city;

    if (results[1]) {
      //find country name
      for (let i = 0; i < results[0].address_components.length; i++) {
        for (
          let b = 0;
          b < results[0].address_components[i].types.length;
          b++
        ) {
          if (results[0].address_components[i].types[b] == 'locality') {
            //this is the object you are looking for
            city = results[0].address_components[i].long_name;
            break;
          } else if (
            results[0].address_components[i].types[b] ==
            'administrative_area_level_1'
          ) {
            city = results[0].address_components[i].long_name;
            break;
          }
        }
        for (
          let b = 0;
          b < results[0].address_components[i].types.length;
          b++
        ) {
          if (results[0].address_components[i].types[b] == 'country') {
            //this is the object you are looking for
            country = results[0].address_components[i].long_name;
            break;
          }
        }
      }
    }
    console.log(country, city);
    // console.log(loc);
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
  getClothes: async function ({ temp }) {
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

    // console.log(tempLevel);

    // 2. 레벨에 따라 가능한 옷 불러오기
    let tempObj = {
      outer: [],
      top: [],
      bottom: [],
      acc: [],
      shoes: [],
      casual_shoes: []
    };
    // time complexity 가 O(n^2) 지만 오브젝트에 몇개 안됨 그냥 두기
    for (let k in clothes) {
      console.log(k);
      for (let i = 0; i < clothes[k].length; i++) {
        if (clothes[k][i].level.includes(tempLevel)) {
          tempObj[k].push(clothes[k][i]);
        }
      }
    }

    return tempObj;
  },
  getCityId: async function ({ city }) {
    console.log('아이디 찾기 실행');
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
    // // db에 숫자로 저장된
    // for (let i = 0; i < data.length; i++) {
    //   console.log(typeof data[i].coord.lon.toString());
    //   data[i].coord.lon = data[i].coord.lon.toString();
    //   data[i].coord.lat = data[i].coord.lat.toString();
    // }

    const { GoogleKey } = apiKey;
    // 4. API 에서도 찾기
    let cityQuery = city.split(' ').join('+');
    console.log(cityQuery);
    const getCityApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityQuery}&key=${GoogleKey}`;
    const {
      data: { results }
    } = await axios.get(getCityApiUrl);
    let locationData = results[0].formatted_address.split(',');

    let resObj = {
      name: locationData[0],
      country: locationData[locationData.length - 1],
      coord: {
        lon: results[0].geometry.location.lng,
        lat: results[0].geometry.location.lat
      }
    };

    let resArr = [];
    if (resObj.name.toLowerCase() !== city.toLowerCase()) {
      resArr.push(resObj);
      resArr = resArr.concat(data);
    } else {
      resArr = resArr.concat(resObj);
    }
    console.log(resArr);
    return resArr;
  },

  getCityWeather: async function ({ city }) {},

  putClothes: async function ({ inputData: { name, type, temp, level } }) {
    console.log(level);

    const clothe1 = {
      name: '자켓',
      type: '아우터',
      temp: '20~30',
      level: [5, 6, 7]
    };

    const clothe2 = {
      name: '코트',
      type: '아우터',
      temp: '20~30',
      level: 5
    };
    let arr = [];
    arr.push(clothe1);
    const data = {
      name: '코트',
      type: '아우터',
      temp: '20~30',
      level: 5
    };

    return {
      name: '코트',
      tyle: '아우터',
      temp: '20~30',
      level: [4, 5, 6]
    };
  }
};
