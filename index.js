const express = require("express"),
      app = express(),
      cors = require("cors"),
      request = require("request");

app.get("/:id", cors(), (req, res) => {
    request.get(`https://stats.uptimerobot.com/${req.params.id}`, (error, response, body) => {
        body = body.replace(/https:\/\/stats.uptimerobot.com\/(?=<req.params.id>)/g, `https://${req.get("host")}/get/https://stats.uptimerobot.com/${req.params.id}`);
        body = body.replace(/https:\/\/stats.uptimerobot.com\/api/g, `https://${req.get("host")}/get/https://stats.uptimerobot.com/api`);
        res.send(body);
    });
});

app.get("/get/*", cors(), (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    request.get(req.url.split("/get/")[1], (error, response, body) => {
        if (error) return res.send(error);
        res.end(body)
    });
});

app.listen(process.env.PORT || 8100, () => {
    console.log(`Status page ready!`);
});