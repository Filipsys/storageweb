import express from "express";
import { Database } from "bun:sqlite";

// =====|=====|=====

const db = new Database("./src/database/storage.sqlite");
const app = express();
const port = 3000;

import cors from "cors";
const corsOptions = {
  origin: "*", 
  credentials: true,            // access-control-allow-credentials:true
  optionSuccessStatus: 200
};

// =====|=====|=====

app.use(cors(corsOptions));
// app.use(express.json());

app.get("/api/data", (_request: unknown, response: { send: (arg0: unknown) => void; }) => {
  let data = db.prepare("SELECT * FROM elements").all();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data = data.map((element: any) => ({
    id: element.id,
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    dataType: element.dataType,
    dataLink: element.dataLink,
    data: element.data,
    color: element.color,
  }));

  response.send(data);
});

// =====|=====|=====

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});