import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2a', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});

app.get('/task2b', (req, res) => {
  let fio = req.query.fullname.trim().replace(/ +(?= )/g,'').toLowerCase() || '';
  console.log(fio);
  let fioArr = fio.split(' ');
  fioArr = fioArr.map((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  let error = false;
  console.log(fioArr.length);
  if (fioArr.length == 0 || fioArr.length > 3 || fioArr[0] == '' || /[\d_\/]/.test(fio)) {
    error = true;
    res.send('Invalid fullname');
  }
  if (fioArr.length == 3) {
    let answ = `${fioArr[2]} ${fioArr[0].split('')[0] || ''}. ${fioArr[1].split('')[0] || ''}.`;
    res.send(answ);
  }
  if (fioArr.length == 2) {
    let answ = `${fioArr[1]} ${fioArr[0].split('')[0] || ''}.`;
    res.send(answ);
  }
  if (fioArr.length == 1 && !error) {
    let answ = fioArr[0];
    res.send(answ);
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
