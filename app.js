const express = require('express');
const app = express();

const request = require("request");

var passwordHash = require('password-hash');
const bodyParser = require("body-parser");

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static("public"));

app.set("view engine","ejs");

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore , Filter} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount),
});
 
const db = getFirestore();

app.get("/", function (req,res){
    console.log("hello");
  res.sendFile(__dirname + "/public/" + "dashboard.html");
});

app.post("/signupto", function(req,res){
console.log(req.body);
  db.collection("usersDemo")
    .where(
        Filter.or(
          Filter.where("email" , "==" ,req.body.email),
          Filter.where("userName" , "==" ,req.body.username)
        )
    )
    .get()
    .then((docs) => {
    if (docs.size > 0){
      res.send("Sorry,This account is already Exists with email and username");
    } else {
        const valid_email = true;
        const options = {
            method: 'GET',
            url: 'https://mailcheck.p.rapidapi.com/',
            qs: {
              domain: req.body.email
            },
            headers: {
              'X-RapidAPI-Key': '43ca8e9680msh0b00609e3196b44p1c4114jsn89d648aefd7e',
              'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com'
            }
          };
          
          request(options, function (error, response, body) {
              if (error) throw new Error(error);
              console.log(body);
        });
        if(valid_email){
            db.collection("usersDemo")
                .add({
                userName : req.body.username,
                email : req.body.email,
                password : passwordHash.generate(req.body.password),
            })
            .then(() => {
                res.sendFile(__dirname + "/public/" + "dashboard.html");
            })
            .catch(() => {
                res.send("Something went wrong");
            });
        }
        else{
            res.send("Email is not valid,please check your mail and try again\nYour email domain should end with @gmail.com")
        }
    }
  });
});

app.post("/loginto", function(req,res){
  db.collection("usersDemo")
    .where("userName", "==" , req.body.username)
    .get()
    .then((docs) => {
      let verified = false;
      docs.forEach((doc) => {
        verified = passwordHash.verify(req.body.password, doc.data().password);
      });

      if(verified){
        res.render("index");
      } else{
        res.send("Fail");
      }
  });
});

app.listen(3000,()=>{
    console.log("server is running in the port 3000...");
})


