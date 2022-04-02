const express = require('express');
const path = require('path');

const app = express();

//Server only the static files from the dist directory
app.use(express.static(__dirname + '/dist/reciept-book'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/reciept-book/index.html'));
});

//Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
