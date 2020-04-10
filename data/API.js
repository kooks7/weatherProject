// const xmlparser = require('express-xml-bodyparser');
const request = require('request-promise');
const fs = require('fs');
// apiKey 따로 관리하기

// console.log('1111111111111111');

exports.dataSearch = city => {
  const apiKey = '58bd080d8d33adbba6bb6a3e644e9470';
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  request({ url: url })
    .then(body => {
      // console.log(JSON.parse(body).list);
      const data = JSON.parse(body).list;
      return data;
    })
    .catch(err => {
      console.log(err);
    });
};
