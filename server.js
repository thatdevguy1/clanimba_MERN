const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, './client/build')));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
  });


// app.get("/", function(req, res){
//     res.send("node server reached");
// })
app.listen(port, () => console.log(`app listening on port ${port}!`))