const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

var chokidar = require('chokidar')
var watcher = chokidar.watch('./src')
watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /dist/ module cache from server")
    Object.keys(require.cache).forEach(function(id) {
      console.log(require.cache[id]);
      if (/[\/\\]src[\/\\]/.test(id)) delete require.cache[id]
    })
  })
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);