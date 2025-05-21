const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/ProductRoutes");
const stockRoutes = require("./routes/StockRoutes");
const locationRoutes = require("./routes/LocationRoutes");
const reportRouter = require("./routes/ReportRoutes");

dotenv.config();
require("./config/db").connectToDb();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/quino_shop",
    }),
  })
);

// Application routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/report", reportRouter);

app.listen(PORT, () => {
  console.log(
    "================================================================="
  );
  console.log(`Yeah! Server is running on this URL: http://localhost:${PORT}/`);
  console.log(
    "================================================================="
  );
});
