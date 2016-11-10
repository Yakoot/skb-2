import express from 'express';
import cors from 'cors';
let XRegExp = require('xregexp');

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2c', (req, res) => {
  let url = req.query.username;
  let re = XRegExp('^(?:http(s)?:)?(?://)?(?:[^/]+/)? \n\
                  (?<username> (@)?[\\p{L}\._]+).*$', 'x');
  if (!re.test(url)) {
    res.send("Invalid username");
  } else {
    let username = XRegExp.exec(url, re).username;
    res.send(`${username.charAt(0) == '@' ? '' : '@'}${username}`);
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
