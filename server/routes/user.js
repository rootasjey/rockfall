var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('user page');
})
.get('/login', function (req, res) {
    res.send('login');
})
.get('/logout', function (req, res) {
    res.send('logout');
});

module.exports = router;
