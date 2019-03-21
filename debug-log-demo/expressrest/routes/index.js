var express = require('express');
var router = express.Router();

var model = {
  title: "My funny jokes!",
  howToUse: "Get a random joke with this url: /api/random"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', model);
});

module.exports = router;
