import dotenv from "dotenv";
dotenv.config();

import bot from "./bot/bot";

bot.start();

console.log("Bot started");
