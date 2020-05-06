import * as sourceMaps from "source-map-support";
import express, { Request, Response } from "express";
import fs from "fs";
import settings from "../settings";
import bodyParser from "body-parser";

sourceMaps.install();

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req: Request, res: Response) {
  res.render("form");
});

app.post("/", (req: Request, res: Response) => {
  var timestamp = Date.now();
  if(!fs.existsSync(settings.outbox)) {
    fs.mkdir(settings.outbox, { recursive: true}, (err) => {
      if(err) throw err;
    })
  }
  var outfile = `${settings.outbox}/${timestamp}.${settings.fileExtension}`;
  fs.writeFile(outfile, JSON.stringify(req.body), function (error) {
    if (error) {
      console.log(error);
      res.status(500).send();
    } else {
      console.log(`output written to ${outfile}`);
      res.status(200).send("OK");
    }
  });
});

export default app;
