var path = require('path');
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/views/base.html'));
  });
  app.get('/chat', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/views/chat.html'));
  })
  app.get('/fallspace', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/customGames/fallspace/views/fallspace.html'));
  })
  app.get('/footballurrito', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/customGames/footballurrito/views/footballurrito.html'));
  })
};
