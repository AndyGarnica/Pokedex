var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public/'));
// app.get("/", function (rep, res){
//   res.send("Hola");
// });

app.listen(3000, function () {
  console.log ('Gibran');
});
