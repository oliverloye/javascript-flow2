var express = require('express');
var router = express.Router();
var jokes = require("../model/jokes");

/* GET users listing. */
router.get('/random', function(req, res, next) {
  res.json(jokes.getRandomJoke());
});

router.get('/error', function(req, res, next) {
  if(false) {
    var err = new Error("UPPPPS");
    err.isJson = true;
    return next(err);
  }
  res.json(jokes.getRandomJoke());
});

module.exports = router;
