import express = require("express");
import xregexp = require("xregexp");
import parser = require('parse-color');


import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;

// CORS middleware
const allowCrossDomain = function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
};

let app = express();
app.use(allowCrossDomain);


app.get("/", async (req: Request, res: Response) => {
  let hexre = xregexp('^ \n\
                    ([#]?  (?<hex> [a-f0-9]{6}|[a-f0-9]{3}))$', 'x');
  let rgbre = xregexp('^(?<rgb> rgb\\(          \n\
                      (?<r> [0-9]{1,3}),   \n\
                      (?<g> [0-9]{1,3}),   \n\
                      (?<b> [0-9]{1,3})    \n\
                      \\))$', 'x');
  let hslre = xregexp('^(?<hsl> hsl\\(                    \n\
                      (?<h> [0-9]+),                \n\
                      (?<s> [0-9]+(?:\.[0-9]+)?)%,   \n\
                      (?<l> [0-9]+(?:\.[0-9]+)?)%    \n\
                      \\))$', 'x');

  if (!req.query.color) {
    res.send('Invalid color');
  }
  let color = req.query.color.replace(/ |%20/g, '').toLowerCase();

  if (!hexre.test(color) && !rgbre.test(color) && !hslre.test(color)) {
    res.send('Invalid color');
  } else {
    if (hexre.test(color)) {
      let parts:any = xregexp.exec(color, hexre);
      color = parts.hex;
      if (color.length == 3) {
        color = color.split('').reduce((a: any, b:any) => {
          return a + b + b;
        }, '');
      }
      color = `#${color}`;
    }
    if (rgbre.test(color)) {
      let parts:any = xregexp.exec(color, rgbre);
      if (![parts.r, parts.g, parts.b].every((val) => { return +val < 256; })) {
        res.send('Invalid color');
      }
      color = parser(parts.rgb).hex;;
    }
    if (hslre.test(color)) {
      let parts:any = xregexp.exec(color, hslre);
      if (![parts.s, parts.l].every((val) => { return 0 <= +val && +val <= 100; })) {
        res.send('Invalid color');
      }
      color = parser(parts.hsl).hex;
    }

    res.send(color);
  }
});


app.listen(3000, function () {
    // tslint:disable-next-line
    console.log("Example app listening on port 3000!");
});
