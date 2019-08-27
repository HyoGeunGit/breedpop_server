var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/Mes');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });

var UsersSchema = mongoose.Schema({
  id : {type : String},
  passwd : {type : String},
  token : {type: String}
});

var CmSchema = mongoose.Schema({
  title : {type: String, required: true},
  brand : {type: String, required: true},
  agency: {type: String, required: true},
  production: {type: String, required: true},
  imageUrl: {type: String},
  videoUrl: {type : String},
  docNum: {type: Number},
  nowDate : {type : String},
  list: [
    {
      title : {type: String},
      subTitle: {type: String},
      videoUrl: {type: String},
      image: {type: String},
      text: {type: String}
    }
  ],
  token : {type: String}
});

var CampaignSchema = mongoose.Schema({
  title : {type: String, required: true},
  brand : {type: String, required: true},
  agency: {type: String, required: true},
  production: {type: String, required: true},
  imageUrl: {type: String},
  videoUrl: {type : String},
  docNum: {type: Number},
  nowDate : {type : String},
  list: [
    {
      title : {type: String},
      subTitle: {type: String},
      videoUrl: {type: String},
      image: {type: String},
      text: {type: String}
    }
  ],
  token : {type: String}
});

var MvSchema = mongoose.Schema({
  title : {type: String, required: true},
  brand : {type: String, required: true},
  agency: {type: String, required: true},
  production: {type: String, required: true},
  imageUrl: {type: String},
  videoUrl: {type : String},
  docNum: {type: Number},
  nowDate : {type : String},
  list: [
    {
      title : {type: String},
      subTitle: {type: String},
      videoUrl: {type: String},
      image: {type: String},
      text: {type: String}
    }
  ],
  token : {type: String}
});


Users = mongoose.model('users', UsersSchema);
CM = mongoose.model('cm', CmSchema);
CAMPAIGN = mongoose.model('campaign', CampaignSchema);
MV = mongoose.model('mv', MvSchema);

exports.Users = Users;
exports.CM = CM;
exports.CAMPAIGN = CAMPAIGN;
exports.MV = MV;
exports.db = db;
