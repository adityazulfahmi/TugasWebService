var express = require('express');
var router = express.Router();
var fs  = require('fs');
var mongoose = require ('mongoose');
var Scheme = mongoose.Schema({
  photo : Buffer,
  name  : String,
  dob   : Date,
  pob   : String,
  hair  : String,
  eyes  : String,
  height: Number,
  weight: Number,
  sex   : String,
  race  : String,
  sam   : String,
  reward: Number,
  remarks:String,
  details:String,
  contact:String,
  year  : Number

});
var Missing = mongoose.model('MissingTable', Scheme);
mongoose.connect('mongodb://localhost/missingdb', function (err) {
  if (err){
    console.log('mongoose connection error: '+err);
    throw err;
  }
  console.log('mongoose connection success');
})

router.post('/add', function(req, res, next) {
  var photo   = req.body.photo;
  var name    = req.body.name;
  var dob     = req.body.dob;
  var pob     = req.body.pob;
  var hair    = req.body.hair;
  var eyes    = req.body.eyes;
  var height  = req.body.height;
  var weight  = req.body.weight;
  var sex     = req.body.sex;
  var race    = req.body.race;
  var sam     = req.body.sam;
  var reward  = req.body.reward;
  var remarks = req.body.remarks;
  var details = req.body.details;
  var contact = req.body.contact;
  var year = req.body.year;
  var person = new Missing({
    photo : fs.readFileSync(photo),
    name  : name,
    dob   : dob,
    pob   : pob,
    hair  : hair,
    eyes  : eyes,
    height: height,
    weight: weight,
    sex   : sex,
    race  : race,
    sam   : sam,
    reward: reward,
    remarks:remarks,
    details:details,
    contact:contact,
    year  :year
  });
  person.save(function (err, silence) {
    if(err){
      console.log(err);
      throw err;
    }
    console.log('success');
    res.send('success');
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
