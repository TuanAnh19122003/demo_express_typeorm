import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import "reflect-metadata";
import router from "@routers/web.router";
import { AppDataSource } from "@databases/data-source";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', './src/views');

AppDataSource.initialize().then(() => {
  console.log('Database connected and initialized');
}).catch((err) => {
  console.error('Error while connecting to the database: ', err.message);
  process.exit(1);
});

app.use(router)

app.get("/", (req: Request, res: Response) => {
  res.render('index')
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});