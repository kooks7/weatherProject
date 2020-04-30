// const { GoogleKey } = apiKey;
// const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GoogleKey}`;
// const {
//   data: { results }
// } = await axios.get(googleApi);
// // 2. 도시 이름 가져오기

// const locationData = results[0].formatted_address.split(',');
// const location = {
//   contry: locationData[locationData.length - 1].trim(),
//   city: locationData[locationData.length - 2].trim().split(' ')[0],
//   gu: locationData[locationData.length - 3].trim()
// };
// const location = {
//   contry: 'south korea',
//   city: 'Seoul',
//   gu: 'Gangnam-gu'
// };

// 3. DB에 검사하기
// let isData = await Weather.where({ city: location.city });
// let forecastObj = {};

// db에 없으면 가져오기
// 3. 날씨 가져오기
// let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${location.city}&appid=${weatherKey}&units=metric`;
