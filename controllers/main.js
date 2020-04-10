// const API = require('../data/API');
const axios = require('axios');

const Weather = require('../model/weather');

exports.getMain = (req, res, next) => {
  res.render('main', { css: 'main', title: '오늘 출격가능?' });
};
// let city = req.body.city;
// const apiKey = '58bd080d8d33adbba6bb6a3e644e9470';
// const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
// request({ url: url })
//   .then(body => {
//     const data = JSON.parse(body).list;
//     for (let d of data) {
//       let time = new Date(d.dt * 1000);
//       d.dt = `${time.getFullYear().toString()}년 ${(
//         time.getMonth() + 1
//       ).toString()}월 ${time
//         .getDate()
//         .toString()}일 ${time.getHours()}:00 시`;
//       console.log(d.dt);
//     }
//     res.render('search', {
//       data: data,
//       city: city,
//       css: 'search',
//       title: `${city} 출격 명령!`
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });
exports.getWeaher = async (req, res, next) => {
  //1. 사용자 검색으로 city를 받는다.
  const city = req.params.city;
  const apiKey = '58bd080d8d33adbba6bb6a3e644e9470';
  const { data } = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
  );
  // console.log(data);
  //2. 만약 DB에 있으면 DB에서 가져오기
  let weather;
  let isData = await Weather.where({ city: city });
  let weatherArr = [];
  let i = 0;
  // console.log(isData);
  if (isData.length === 0) {
    console.log('데이터 읎다.');
    for (let d of data.list) {
      weatherArr[i] = {
        time: d.dt,
        temp: d.main.temp,
        feels_like: d.main.feels_like
      };
      console.log(weatherArr[i]);
      i++;
    }
    weather = new Weather({
      city: city,
      weather: weatherArr
    });
    await weather.save();
  }
  // || 없으면 서버에서 받아오고 DB에 한차례 저장한다.
  // DB에 저장하는 값은 우선 time: Date, temp: Number, feels_like: Number 이다

  //3. Json 데이터로 res를 보내준다.
};

exports.getSearch = (req, res, next) => {
  res.render('search');
};
