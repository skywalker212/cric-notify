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
  var db = getFirebaseDB();
  var ref = db.ref("/over_example/data_2");
  ref.on('value', (snapshot) => {
    if(snapshot.exists()){
      console.log('data all ready there');
    }else{
      ref.set({value: 39});
    }
  });
};

module.exports = {
  initializeFirebase,
  getFirebaseDB,
  storeOverData
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
