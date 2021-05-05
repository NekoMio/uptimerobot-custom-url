const express = require("express"),
      app = express(),
      request = require("request");

app.get("/:id", (req, res) => {
    request.get(`https://stats.uptimerobot.com/${req.params.id}`, (error, response, body) => {
        res.send(body.replace(/https:\/\/stats.uptimerobot.com\/api/g, `${req.protocol}://${req.get("host")}/get/https://stats.uptimerobot.com/api`));
    });
});

app.get("/get/*", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    request.get(req.url.split("/get/")[1], (error, response, body) => {
        if (error) return res.send(error);
        res.end(body)
    });
});

app.listen(process.env.PORT || 8100, () => {
    console.log(`Status page ready!`);
});