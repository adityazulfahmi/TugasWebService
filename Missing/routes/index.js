var express = require('express');
var router = express.Router();
var mongoose = require ('mongoose');
// var MemberScheme = mongoose.Schema({username : String, nickname : String});
var Member = mongoose.model('MemoModel', MemberScheme);
mongoose.connect('mongodb://localhost/mongotest', function (err) {
  if (err){
    console.log('mongoose connection error: '+err);
    throw err;
  }
  console.log('mongoose connection success');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
