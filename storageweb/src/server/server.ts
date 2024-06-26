import express from "express";
import { Database } from "bun:sqlite";


// =====/=====/=====/=====


const db = new Database("./src/database/storage.sqlite");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import cors from "cors";
const corsOptions = {
  origin: "*", 
  credentials: true,            // access-control-allow-credentials:true
  optionSuccessStatus: 200
};


// =====/=====/=====/=====


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


app.post("/api/savePosition", (request: express.Request, response: express.Response) => {
  if (!request.body || typeof request.body !== 'object') {
    return response.status(400).send({ error: 'Invalid request body' });
  }

  const { id, x, y } = request.body;

  try {
    db.prepare("UPDATE elements SET x = ?, y = ? WHERE id = ?").run(x, y, id);

    response.status(200).send({ success: true });
  } catch (error) {
    console.error('Error updating element position:', error);
    
    response.status(500).send({ error: 'Internal server error' });
  }
});


// =====/=====/=====/=====


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});