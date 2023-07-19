// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});


function jsonReturnDate(date){
  return {
    unix: date.getTime(), //Comando para o tempo com milisegundos já inclusos
    utc: date.toUTCString() //comando para transformar em UTC
  }
};

app.get("/api/:date?", (req, res) =>{
  let date = !isNaN(req.params.date)
    //  ternary operatoros lindos
  ? new Date(Number(req.params.date))
  : new Date(req.params.date); 

  if(!req.params.date){
    date = new Date()
  }
  if(isNaN(date.getTime())){
    res.json({error: "Invalid Date"});
    return;
  }
  res.json(jsonReturnDate(date));

});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Outras tentativas, 

// let resObj = {}

// app.get("/api/:date?", (req, res) =>{
//   let date = req.params.date
  
//      if(!req.params.date){
//         date = new Date()
//       }

//   if(date.includes("-")){
//     // date string
//     resObj["unix"] = new Date(date).getTime()
//     resObj["utc"] = new Date(date).toUTCString()

//   }else{
//     // Timestamp
//     date = parseInt(date)

//     resObj["unix"] = new Date(date).getTime()
//     resObj["utc"] = new Date(date).toUTCString()
//   }

//   if(!resObj["unix"] || !resObj["utc"]){
//     res.json({error: "Invalid Date"})
//   }

//   res.json(resObj)
// })

