const io = require('../socket');
const Clothesdata = require('../model/ClothesData');

module.exports = {
  putLike: async function (data, liked, alreadyClicked) {
    // 좋아요
    if (liked === 'like' && !alreadyClicked) {
      try {
        // 1. dataArr = [city, time, type, 옷id]
        const dataArr = data.split('-');

        // 2. db에서 찾기
        const isData = await Clothesdata.findOne({
          city: dataArr[0],
          time: dataArr[1]
        });

        // 3. 좋아요 증가 시키기
        for (let i = 0; i < isData[dataArr[2]].length; i++) {
          if (isData[dataArr[2]][i]._id.toString() === dataArr[3]) {
            isData[dataArr[2]][i].like++;
          }
        }
        // 4. 증가시킨 값 db에 저장
        await isData.save();

        //5. 변경된 값 socket.io 로 클라이언트에 보내기
        io.getIO().emit(`${dataArr[0]}-${dataArr[1]}`, {
          action: 'like',
          type: dataArr[2],
          updateResult: dataArr[3],
          alreadyClicked: false
        });
      } catch (err) {
        console.log(err);
      }
    } else if (liked === 'unlike' && !alreadyClicked) {
      try {
        // 1. dataArr = [city, time, type, 옷id]
        const dataArr = data.split('-');

        // 2. db에서 찾기
        const isData = await Clothesdata.findOne({
          city: dataArr[0],
          time: dataArr[1]
        });

        // 3. 좋아요 증가 시키기
        for (let i = 0; i < isData[dataArr[2]].length; i++) {
          if (isData[dataArr[2]][i]._id.toString() === dataArr[3]) {
            isData[dataArr[2]][i].unlike++;
          }
        }
        // 4. 증가시킨 값 db에 저장
        await isData.save();

        //5. 변경된 값 socket.io 로 클라이언트에 보내기
        io.getIO().emit(`${dataArr[0]}-${dataArr[1]}`, {
          action: 'unlike',
          type: dataArr[2],
          updateResult: dataArr[3],
          alreadyClicked: false
        });
      } catch (err) {
        console.log(err);
      }
    } else if (liked === 'unlike' && alreadyClicked) {
      try {
        // 1. dataArr = [city, time, type, 옷id]
        const dataArr = data.split('-');

        // 2. db에서 찾기
        const isData = await Clothesdata.findOne({
          city: dataArr[0],
          time: dataArr[1]
        });

        // 3. 좋아요 증가 시키기
        for (let i = 0; i < isData[dataArr[2]].length; i++) {
          if (isData[dataArr[2]][i]._id.toString() === dataArr[3]) {
            isData[dataArr[2]][i].unlike--;
          }
        }
        // 4. 증가시킨 값 db에 저장
        await isData.save();

        //5. 변경된 값 socket.io 로 클라이언트에 보내기
        io.getIO().emit(`${dataArr[0]}-${dataArr[1]}`, {
          action: 'unlike',
          type: dataArr[2],
          updateResult: dataArr[3],
          alreadyClicked: true
        });
      } catch (err) {
        console.log(err);
      }
    } else if (liked === 'like' && alreadyClicked) {
      try {
        // 1. dataArr = [city, time, type, 옷id]
        const dataArr = data.split('-');

        // 2. db에서 찾기
        const isData = await Clothesdata.findOne({
          city: dataArr[0],
          time: dataArr[1]
        });

        // 3. 좋아요 감소 시키기
        for (let i = 0; i < isData[dataArr[2]].length; i++) {
          if (isData[dataArr[2]][i]._id.toString() === dataArr[3]) {
            isData[dataArr[2]][i].like--;
          }
        }
        // 4. 감소시킨 값 db에 저장
        await isData.save();

        //5. 변경된 값 socket.io 로 클라이언트에 보내기
        io.getIO().emit(`${dataArr[0]}-${dataArr[1]}`, {
          action: 'like',
          type: dataArr[2],
          updateResult: dataArr[3],
          alreadyClicked: true
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
