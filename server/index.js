const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cron = require("node-cron");

const linktreeRoutes = require("./routes/linktreeRouter.js");
const Linktree = require("./models/linktreeModel.js");

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "Infinity", extended: true }));
app.use(bodyParser.urlencoded({ limit: "Infinity", extended: true }));

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        author: "Ahmet Kaska",
        message: "MBD Linktree..."
    });
});

app.use("/linktree", linktreeRoutes);


const CONNECTION_URL = process.env.MONGODB_URI ;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT}`);
    });
})
.catch(error => {
    console.error(error.message);
});

cron.schedule('*/10 * * * * *', async () => {
    try {
        const result = await Linktree.deleteMany({ 
            $and: [
                { icons: { $exists: true, $eq: [] } }, 
                { buttons: { $exists: true, $eq: [] } }, 
                { images: { $exists: true, $eq: [] } }
            ] 
        });
    } catch (error) {
        console.error('');
    }
});


