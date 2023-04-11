import express, { Request, Response, Express } from "express";

// Routes
import lead from "./routes/lead";
const app: Express = express();

const port = process.env.PORT || 3001;
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { loggerAWS } from "./utils/log";
const cors = require("cors");

dotenv.config();

// Cors
const NODE_CORS_ALLOWED = process.env.NODE_CORS_ALLOWED;
const ARRAY_NODE_CORS_ALLOWED = NODE_CORS_ALLOWED?.split(",");

const corsOptions = {
  origin: ARRAY_NODE_CORS_ALLOWED,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  // res.sendFile("./misc/index.html", { root: __dirname });
  res.status(200).json({ message: "Hello World!" });

});

app.use(lead);

// Needs to be after api routes
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
