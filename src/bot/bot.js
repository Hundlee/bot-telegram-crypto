"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const axios = require("axios");
require("dotenv").config();
const botToken = process.env.BOT_TOKEN;
const bot = new grammy_1.Bot(botToken);
function getApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get("http://localhost:8080/");
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    });
}
function sendPriceTopCoins(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield getApi();
        const data = response.data;
        data.sort((a, b) => {
            return b.quote.USD.price - a.quote.USD.price;
        });
        const topCoins = data.slice(0, 10);
        topCoins.forEach((coin) => {
            return ctx.reply(`${coin.name} : ${coin.quote.USD.price.toFixed(2)}`);
        });
    });
}
bot.command("start", (ctx) => ctx.reply("Hello!"));
bot.command("top", sendPriceTopCoins);
bot.hears("cego é?", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // `reply` is an alias for `sendMessage` in the same chat (see next section).
    yield ctx.reply("gay", {
        // `reply_parameters` specifies the actual reply feature.
        reply_parameters: { message_id: ctx.msg.message_id },
    });
}));
bot.hears("marlon", (ctx) => ctx.reply("esse é esquisito"));
bot.on("message", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the chat identifier.
    const chatId = ctx.msg.chat.id;
    // The text to reply with
    const text = "I got your message!";
    // Send the reply.
    yield bot.api.sendMessage(chatId, text);
}));
exports.default = bot;
