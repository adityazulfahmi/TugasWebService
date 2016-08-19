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
  year  : Number,
  comments :[String]

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
  console.log("woy");
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

  console.log(
      "photo :"+photo+"\n"+
      "name  :"+name+"\n"+
      "dob   :"+dob+"\n"+
      "pob   :"+pob+"\n"+
      "hair  :"+hair+"\n"+
      "eyes  :"+eyes+"\n"+
      "height:"+height+"\n"+
      "weight:"+weight+"\n"+
      "sex   :"+sex+"\n"+
      "race  :"+race+"\n"+
      "sam   :"+sam+"\n"+
      "reward:"+reward+"\n"+
      "remarks:"+remarks+"\n"+
      "details:"+details+"\n"+
      "contact:"+contact+"\n"+
      "year  :"+year
  );

  var person = new Missing({
    //photo : fs.readFileSync(photo),
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

  //alert("lalalal"+JSON.parse(person));
  person.save(function (err, silence) {
    if(err){
      console.log(err);
      throw err;
    }
    console.log('success');
    res.send('success');
  });
});

router.get('/people', function(req, res, err) {

  var people = new Missing();

  Missing.find(function (err, people) {
    if(err)
      return res.status(500).send({error : 'database Failure'});
    console.log(people);
    res.json(people);
  })
});

// router.get('/people/:id', function(req, res, err) {
//
//   var person = new Missing();
//
//   Missing.findOne({_id: req.params.id},function (err, person) {
//     if(err) {
//       console.err(err);
//       throw err;
//     }
//     console.log(person);
//     res.json(person);
//   })
// });
//
// //year
// router.get('/people/:year', function(req, res, err) {
//
//   var people = new Missing();
//
//   Missing.findOne({year: req.params.year},function (err, people) {
//     if(err) {
//       console.err(err);
//       throw err;
//     }
//     console.log(people);
//     res.json(people);
//   })
// });
//
// //sex
// router.get('/people/:sex', function(req, res, err) {
//
//   var people = new Missing();
//
//   Missing.findOne({sex: req.params.sex},function (err, people) {
//     if(err) {
//       console.err(err);
//       throw err;
//     }
//     console.log(people);
//     res.json(people);
//   })
// });
//
// //name
// router.get('/people/:name', function(req, res, err) {
//
//   var people = new Missing();
//
//   Missing.findOne({name: req.params.name},function (err, people) {
//     if(err) {
//       console.err(err);
//       throw err;
//     }
//     console.log(people);
//     res.json(people);
//   })
// });
//
// //reward
// router.get('/people/reward', function(req, res, err) {
//
//   var people = new Missing();
//
//   Missing.findOne({_id: req.params.year},function (err, people) {
//     if(err) {
//       console.err(err);
//       throw err;
//     }
//     console.log(people);
//     res.json(people);
//   })
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
