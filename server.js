import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logger from "morgan";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("<h1>Ciao, sono Arturo, il server che ce l'ha duro!</h1>");
});

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${ port }.\nCTRL+C per terminare.`)
})