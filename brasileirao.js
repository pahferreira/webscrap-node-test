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
          //console.log($(infos).html());
          let matches = {};
          let goals = {};
          $(infos)
            .children()
            .each((index, el) => {
              switch (index) {
                case 0:
                  teamsTable[i].points = parseInt($(el).text());
                  break;
                case 1:
                  matches.played = parseInt($(el).text());
                  break;
                case 2:
                  matches.won = parseInt($(el).text());
                  break;
                case 3:
                  matches.drawn = parseInt($(el).text());
                  break;
                case 4:
                  matches.lose = parseInt($(el).text());
                  break;
                case 5:
                  goals.scored = parseInt($(el).text());
                  break;
                case 6:
                  goals.conceded = parseInt($(el).text());
                  break;
                case 7:
                  goals.difference = parseInt($(el).text());
                  break;
                case 8:
                  teamsTable[i].efficiency = parseFloat($(el).text());

                default:
                  break;
              }
            });
          teamsTable[i].matches = matches;
          teamsTable[i].goals = goals;
        });
      console.log(teamsTable);
    }
  }
);
