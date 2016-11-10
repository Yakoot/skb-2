'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var cors = _interopDefault(require('cors'));

var app = express();
app.use(cors());
app.get('/', function (req, res) {
  res.json({
    hello: 'JS World'
  });
});

app.get('/task2a', function (req, res) {
  var sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});

app.get('/task2b', function (req, res) {
  var fio = req.query.fullname.trim().replace(/ +(?= )/g, '').toLowerCase() || '';
  console.log(fio);
  var fioArr = fio.split(' ');
  fioArr = fioArr.map(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  var error = false;
  console.log(fioArr.length);
  if (fioArr.length == 0 || fioArr.length > 3 || fioArr[0] == '' || /[\d_\/]/.test(fio)) {
    error = true;
    res.send('Invalid fullname');
  }
  if (fioArr.length == 3) {
    var answ = fioArr[2] + ' ' + (fioArr[0].split('')[0] || '') + '. ' + (fioArr[1].split('')[0] || '') + '.';
    res.send(answ);
  }
  if (fioArr.length == 2) {
    var _answ = fioArr[1] + ' ' + (fioArr[0].split('')[0] || '') + '.';
    res.send(_answ);
  }
  if (fioArr.length == 1 && !error) {
    var _answ2 = fioArr[0];
    res.send(_answ2);
  }
});

app.listen(3000, function () {
  console.log('Your app listening on port 3000!');
});
//# sourceMappingURL=index.js.map
