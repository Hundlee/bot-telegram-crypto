import { Bot } from "grammy";
const axios = require("axios");
require("dotenv").config();

const botToken = process.env.BOT_TOKEN;

const bot = new Bot(botToken as string);

async function getApi() {
    try {
        const response = await axios.get("http://localhost:8080/");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function sendPriceTopCoins(ctx: any) {
    const response = await getApi();
    const data = response.data;

    data.sort((a: any, b: any) => {
        return b.quote.USD.price - a.quote.USD.price;
    });

    const topCoins = data.slice(0, 10);

    topCoins.forEach((coin: any) => {
        return ctx.reply(`${coin.name} : ${coin.quote.USD.price.toFixed(2)}`);
    });
}

bot.command("start", (ctx) => ctx.reply("Hello!"));

bot.command("top", sendPriceTopCoins);

bot.hears("cego é?", async (ctx) => {
    // `reply` is an alias for `sendMessage` in the same chat (see next section).
    await ctx.reply("gay", {
        // `reply_parameters` specifies the actual reply feature.
        reply_parameters: { message_id: ctx.msg.message_id },
    });
});

bot.hears("marlon", (ctx) => ctx.reply("esse é esquisito"));

bot.on("message", async (ctx) => {
    // Get the chat identifier.
    const chatId = ctx.msg.chat.id;
    // The text to reply with
    const text = "I got your message!";
    // Send the reply.
    await bot.api.sendMessage(chatId, text);
});

export default bot;
