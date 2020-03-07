// // server.js
// var express = require('express');
// var path = require('path');
// var serveStatic = require('serve-static');
// app = express();
// app.use(serveStatic(__dirname + "/build"));
// var port = process.env.PORT || 3000;
// app.listen(port);
// console.log('server started '+ port);


if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('build/static'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
  }