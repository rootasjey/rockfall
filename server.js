const http        = require('http');
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

app.use(require('morgan')('short'));
app.use(bodyParser.json());
// app.use(express.static('dist')); // un-comment for production

require('./routes/hmr')(app); // HMR module - comment for production

app
.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
.use('/auth/google/', require('./routes/google'))
.use('/auth/facebook/', require('./routes/facebook'))
.use('/auth/twitter/', require('./routes/twitter'))
.use('/auth/microsoft/', require('./routes/microsoft'));

if (require.main === module) {
  var server = http.createServer(app);
  server.listen(process.env.PORT || 8080, () => {
    console.log('Listening on %j', server.address());
  });
}
