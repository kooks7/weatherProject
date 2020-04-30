const io = require('../socket');

exports.getSearch = async (req, res, next) => {
  io.getIo();
};
