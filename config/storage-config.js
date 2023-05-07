//https://youtu.be/ysS4sL6lLDU?list=PLs7LQzp-tbVpNeo5thPa-A7KR-0sZJXto

const multer = require("multer");

const memoryStorage= multer.memoryStorage()

const upload = multer({ storage: memoryStorage }); // memory storage
//const upload = multer({ storage: memoryStorage }).single("testImage");

module.exports = upload;
