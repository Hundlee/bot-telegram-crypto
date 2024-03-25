import getApi from "./getAPI";

export async function sendPriceHighCoins(ctx: any) {
    const response = await getApi();
    const data = response.data;

    data.sort((a: any, b: any) => {
        return b.quote.USD.price - a.quote.USD.price;
    });

    const HighCoins = data.slice(0, 10);

    HighCoins.forEach((coin: any) => {
        return ctx.reply(`${coin.name} : ${coin.quote.USD.price.toFixed(2)}`);
    });
}
