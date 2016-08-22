var express = require('express');
var router = express.Router();
var multiPart = require('connect-multiparty');
var multiPartMiddleware = multiPart();
var path = require('path');
var fs = require ('fs-extra');
router.use(multiPartMiddleware);
var mongoose = require ('mongoose');

var Scheme = mongoose.Schema({
  photo : String,
  name  : String,
  dob   : String,
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
  timestamp : { type : Date, default: Date.now },
  comments :[{
    email: String,
    comment: String,
    date: Date
  }]
});

var Missing = mongoose.model('MissingTable', Scheme);
mongoose.connect('mongodb://localhost/missingdb', function (err) {
  if (err){
    console.log('mongoose connection error: '+err);
    throw err;
  }
  console.log('mongoose connection success');
})

router.post('/add', multiPartMiddleware, function(req, res, next) {
  var photo   = req.files.photo;
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

  //upload photo
  var uploadDate = new Date().toDateString();
  var tempPath = photo.path;

  var dbPath ="http://localhost:3000/Image/"+uploadDate +" "+ photo.name;
  var targetPath = path.join(__dirname, "../public/image/" +uploadDate +" "+ photo.name);

  var imageUpload = targetPath;

  var result = dbPath.replace("\\", "/");

  var person = new Missing({
    photo : result,
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

  fs.rename(tempPath, targetPath, function (err) {
    if(err){
      console.log(err)
    } else {
      console.log("photo moved");
      console.log(targetPath);
    }
  })

  person.save(function (err, silence) {
    if(err){
      console.log(err);
      throw err;
    }
    console.log('success');
    res.send('success');
  });
});


router.post('/addComment', function(req, res, next) {
 // console.log("woy");
  var id    = req.body.id;
  var iemail = req.body.email;
  var icomment   = req.body.comment;
  var idate = req.body.date;
  var ObjectId = require('mongodb').ObjectID;
  var o_id = new ObjectId(id);

  //console.log("hoho");
  Missing.update({_id: o_id},
      {
        $push : {
           comments : {
              email : iemail,
              comment : icomment,
             date: idate
           }
        }
  }
  ,function (err, numberAffected, rawResponse) {
            if(err){
              console.log(err.message);
              throw err;
            }
            res.json("success");
          }
      );
});

router.get('/people', function(req, res, err) {

  var people = new Missing();

  Missing.find(function (err, people) {
    if(err)
      return res.status(500).send({error : 'database Failure'});
    console.log(people);
    res.json(people);
  }).sort( { timestamp: -1 } )
});

router.get('/people/:id', function(req, res, err) {

  var person = new Missing();

  Missing.findOne({_id: req.params.id},function (err, person) {
    if(err) {
      console.err(err);
      throw err;
    }
    console.log(person);
    res.json(person);
  })
});

//year
router.get('/people/year/:year', function(req, res, err) {

  var people = new Missing();

  Missing.find({year: req.params.year},function (err, people) {
    if(err) {
      console.err(err);
      throw err;
    }
    console.log(people);
    res.json(people);
  }).sort( { name: 1 } )
});

// //sex
router.get('/people/sex/:sex', function(req, res, err) {

  var people = new Missing();
  var key = req.params.sex;
  key = "^"+key;

  Missing.find({sex: {'$regex': new RegExp(key, "i")}},function (err, people) {
    if(err) {
      console.err(err);
      throw err;
    }
    console.log(people);
    res.json(people);
  }).sort( { name: 1 } )
});

// //name
router.get('/people/name/:name', function(req, res, err) {

  var people = new Missing();
  var key = req.params.name;

  Missing.find({name: {'$regex': new RegExp(key, "i")}},function (err, people) {
    if(err) {
      console.err(err);
      throw err;
    }
    console.log(people);
    res.json(people);
  })
});

// //reward
router.get('/reward/:reward', function(req, res, err) {
  var people = new Missing();
  var key = req.params.reward;

  Missing.find({reward: {$gte:key}},function (err, people) {
    if(err) {
      console.err(err);
      throw err;
    }
    console.log(people);
    res.json(people);
  }).sort( { reward: -1 } )
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
