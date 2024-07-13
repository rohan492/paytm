import express from "express";
import cors from "cors";
import rootRouter from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: false // Do not allow credentials when using wildcard origins
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`)
});


