import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.post("/data", (req: Request, res: Response) => {
  console.log(req.body);
  res.send();
});

export { app };
