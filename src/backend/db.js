import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "pathlytics"
});

const ensureOtpColumn = async () => {
  try {
    const [rows] = await db.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'otp'",
      [process.env.DB_NAME || "pathlytics"]
    );

    if (rows.length === 0) {
      await db.query("ALTER TABLE users ADD COLUMN otp VARCHAR(10)");
      console.log("Added missing otp column to users table.");
    }
  } catch (error) {
    console.error("Database schema check failed:", error);
  }
};

ensureOtpColumn();

export default db;