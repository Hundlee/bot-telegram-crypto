import { Bot } from "grammy";
require("dotenv").config();
import {
    sendPriceHighCoins,
    sendLowestPriceCoins,
    sendCoinsGrowingLastHour,
    sendCoinsGrowingLastDay,
} from "./actions";

const botToken = process.env.BOT_TOKEN;

const bot = new Bot(botToken as string);

bot.command("start", (ctx) => ctx.reply("Hello!"));

bot.command("highprice", sendPriceHighCoins);

bot.command("lowprice", sendLowestPriceCoins);

bot.command("lasthour", sendCoinsGrowingLastHour);

bot.command("lastday", sendCoinsGrowingLastDay);

bot.hears("tudo bem", async (ctx) => {
    await ctx.reply("sim", {
        reply_parameters: { message_id: ctx.msg.message_id },
    });
});

bot.on("message", async (ctx) => {
    // Get the chat identifier.
    const chatId = ctx.msg.chat.id;
    // The text to reply with
    const text = "I got your message!";
    // Send the reply.
    await bot.api.sendMessage(chatId, text);
});

export default bot;
