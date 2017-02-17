var admin = require('firebase-admin');
var serviceAccount = require('./json/notify-cricket_service_account.json');

var initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://notify-cricket.firebaseio.com/'
  });
  return admin;
};

var getFirebaseDB = () => {
  return admin.database();
};

var storeOverData = (data) => {
    console.log(data);
  var match_id = data.query.diagnostics.url.content.split('match_id=',2)[1];
  var over,ball;
  if(Array.isArray(data.query.results.Over)){
    over = data.query.results.Over[0].num;
    if(Array.isArray(data.query.results.Over[0].Ball)){
    ball = data.query.results.Over[0].Ball[0].n;
    }else{
    ball = data.query.results.Over[0].Ball.n;
    }
  }else{
    over = data.query.results.Over.num;
    if(Array.isArray(over.Ball)){
    ball = data.query.results.Over[0].Ball[0].n;
    }else{
    ball = data.query.results.Over[0].Ball.n;
    }
  }


  console.log(over, ball);

  var db_string = match_id+"/commentary/team1/"+over+"-"+ball;
  console.log(db_string);
  var db = getFirebaseDB();
  var ref = db.ref(db_string);
  ref.on('value', (snapshot) => {
    if(snapshot.exists()){
      console.log('data all ready there');
    }else{
      ref.set(data);
    }
  });
};

var storeScorecardData = (data) => {
    console.log(data);

  var db_string = match_id+"/scorecard";
  console.log(db_string);
  var db = getFirebaseDB();
  var ref = db.ref(db_string);
  ref.on('value', (snapshot) => {
    if(snapshot.exists()){
      console.log('data all ready there');
    }else{
      ref.set(data);
    }
  });
};

module.exports = {
  initializeFirebase,
  getFirebaseDB,
  storeOverData,
  storeScorecardData
};
//
// var db = admin.database();
// var ref = db.ref("/");
//
//  ref.once("value", function(snapshot) {
//    console.log(snapshot.val());
//  });
// var ref = db.ref("server/saving-data/fireblog");
//
// var postsRef = ref.child("posts");
//
// var newPostRef = postsRef.push();
// newPostRef.set({
//   author: "gracehop",
//   title: "Announcing COBOL, a New Programming Language"
// });
//
// // we can also chain the two calls together
// postsRef.push().set({
//   author: "alanisawesome",
//   title: "The Turing Machine"
// });
