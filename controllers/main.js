// const API = require('../data/API');
const axios = require('axios');

const Weather = require('../model/weather');

exports.getMain = (req, res, next) => {
  res.render('main', { css: 'main', title: '오늘 출격가능?' });
};

exports.getWeaher = async (req, res, next) => {
  //1. 사용자 검색으로 city를 받는다.
  const city = req.params.city;
  // test API KEY 추후에 서비스 API로 바꾸고 환경변수로 설정해서 보호하기
  const apiKey = '58bd080d8d33adbba6bb6a3e644e9470';
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    );
  } catch (err) {
    console.log(err);
    err.message = '도시가 없습니다.';
    err.statusCode = 404;
    next(err);
  }
  // 올바른 검색인지 체크
  console.log('code : ', data.cod);
  if (data.cod !== 200) {
  }

  //2. 없으면 서버에서 받아오고 DB에 한차례 저장한다.
  let isData = await Weather.where({ city: city });

  // console.log(isData);
  if (isData.length === 0) {
    let weatherArr = [];
    let i = 0;
    console.log('데이터 읎다.');
    for (let d of data.list) {
      weatherArr[i] = {
        time: d.dt,
        temp: Math.floor(d.main.temp - 274),
        feels_like: Math.floor(d.main.feels_like - 274)
      };
      i++;
    }
    let weatherObj = new Weather({
      city: city,
      weather: weatherArr
    });
    await weatherObj.save();
  }
  // || 만약 DB에 있으면 DB에서 가져오기
  // DB에 저장하는 값은 우선 time: Date, temp: Number, feels_like: Number 이다
  const weather = await Weather.findOne({ city: city });
  // console.log(weather);

  //3. Json 데이터로 res를 보내준다.
  res.status(201).json(weather.weather);
};

exports.getSearch = (req, res, next) => {
  res.render('search');
};
