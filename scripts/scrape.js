// require packages for making the scrapes
let request = require("request");
let cheerio = require("cheerio");

let scrape = function(cb) {
  request(
    "http://forums.avianavenue.com/index.php?find-new/3351740/posts",
    function(err, resp, body) {
      let $ = cheerio.load(body);

      let articles = [];

      $("div.listBlock .main").each(function(i, element) {
        let head = $(this)
          .children(".titleText")
          .text()
          .trim();
        let sum = $(this)
          .children("span.containerName")
          .text()
          .trim();

        if (head && sum) {
          let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

          let dateToAdd = { headline: headNeat, summary: sumNeat };

          articles.push(dateToAdd);
        }
      });
      cb(articles);
    }
  );
};
module.exports = scrape;
