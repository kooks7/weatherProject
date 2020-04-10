// const API = require('../data/API');
const request = require('request-promise');

exports.getMain = (req, res, next) => {
  res.render('main', { css: 'main', title: '오늘 출격가능?' });
};

exports.postSearch = (req, res, next) => {
  let city = req.body.city;
  const apiKey = '58bd080d8d33adbba6bb6a3e644e9470';
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  request({ url: url })
    .then(body => {
      const data = JSON.parse(body).list;
      for (let d of data) {
        let time = new Date(d.dt * 1000);
        d.dt = `${time.getFullYear().toString()}년 ${(
          time.getMonth() + 1
        ).toString()}월 ${time
          .getDate()
          .toString()}일 ${time.getHours()}:00 시`;

        console.log(d.dt);
      }
      res.render('search', {
        data: data,
        city: city,
        css: 'search',
        title: `${city} 출격 명령!`
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getSearch = (req, res, next) => {
  res.render('search');
};
