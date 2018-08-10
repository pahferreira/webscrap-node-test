const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const writeSteam = fs.createWriteStream("test.csv");

request("http://codedemos.com/sampleblog/", (err, res, html) => {
  if (!err && res.statusCode == 200) {
    writeSteam.write("Title, link, date\n");
    const $ = cheerio.load(html);
    console.log("Writting in file...");
    $(".post-preview").each((i, e) => {
      const title = $(e)
        .find(".post-title")
        .text()
        .replace(/\s\s+/g, "");
      const link = $(e)
        .find("a")
        .attr("href");
      const date = $(e)
        .find(".post-date")
        .text()
        .replace(",", "");

      writeSteam.write(`${title},${link},${date}\n`);
    });
    console.log("Done!");
  }
});
