import getApi from "./getAPI";

export async function sendPriceHighCoins(ctx: any) {
    const response = await getApi();
    const data = response.data;

    data.sort((a: any, b: any) => {
        return b.quote.USD.price - a.quote.USD.price;
    });

    const HighCoins = data.slice(0, 10);

    HighCoins.forEach((coin: any) => {
        return ctx.reply(
            `${coin.name} : ${coin.quote.USD.price.toFixed(
                2
            )} ${coin.quote.USD.percent_change_1h.toFixed(2)}% na ultima hora `
        );
    });
}

export async function sendLowestPriceCoins(ctx: any) {
    const response = await getApi();
    const data = response.data;

    const LowPriceCoins = data.slice(0, 10);

    LowPriceCoins.sort((a: any, b: any) => {
        return a.quote.USD.price - b.quote.USD.price;
    });

    LowPriceCoins.forEach((coin: any) => {
        let priceFormatted;

        if (coin.quote.USD.price > 1) {
            priceFormatted = coin.quote.USD.price.toFixed(2);
        } else {
            priceFormatted = coin.quote.USD.price.toFixed(6);
        }

        return ctx.reply(
            `${
                coin.name
            } : $${priceFormatted} ${coin.quote.USD.percent_change_1h.toFixed(
                2
            )}% na ultima hora `
        );
    });
}
