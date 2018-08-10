const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

request(
  "https://globoesporte.globo.com/futebol/brasileirao-serie-a/",
  (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
      let teamsTable = [];
      $(".tabela-times")
        .find("tbody")
        .each((i, team) => {
          let name = $(team)
            .children()
            .find(".tabela-times-time-nome")
            .text();
          let rank = i + 1;
          teamsTable.push({ rank, name });
        });
      $(".tabela-pontos")
        .find("tbody")
        .children()
        .each((i, infos) => {
          const points = $(infos)
            .find(".tabela-pontos-ponto")
            .text();
          teamsTable[i].points = points;
          console.log($(infos).html());
        });
      console.log(teamsTable);
    }
  }
);
