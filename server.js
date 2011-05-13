var redback = require('redback').createClient(),
    spider = require('./lib/spider'),
    fs = require('fs'),
    express = require('express');

var LOG_PATH = '/var/log/oh-bot.log',
    logStream = fs.createWriteStream(LOG_PATH);

var app = express.createServer();
app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.use(express.logger({buffer: true, stream: logStream}));
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({secret: '*-oh-* bot for the masses.'}));    
});

app.get('/stats/:domain', function(req, res) {
  res.render('domain_stats', {});
});

app.get('/stats', function(req, res) {
  res.render('stats', {});
});

app.post('/crawl', function(req, res) {
  var crawler = spider.createCrawler();

  crawler.on('404', function() {
    console.log('404 mofo');
  });

  crawler.crawl();

  res.render('fire', {});
});

app.get('/', function(req, res) {
  res.render('main', {});
});

app.listen(9000);

process.on('exit', function() {
  console.log('Oh-bot is done showing it\'s OH-face...');
});

console.log('Oh-bot ready to show it\'s OH-face...');
