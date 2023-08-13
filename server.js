import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logger from "morgan";
import cors from "cors";
import { connectToDB } from "./config/database.js";
import authRouter from "./routes/api/auth.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);

const startServer = (async () => {
    try {
        await connectToDB();
        console.log("Collegamento con MongoDB stabilito con successo!");
        app.listen(port, () => {
            console.log(`Server in ascolto sulla porta ${ port }.\nCTRL+C per terminare.`)
        })    } catch (error) {
        console.log("Impossibile connettersi a MongoDB. Server non avviato.")
    }
})();
