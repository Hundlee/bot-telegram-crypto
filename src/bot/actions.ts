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

export async function sendCoinsGrowingLastHour(ctx: any) {
    const response = await getApi();
    const data = response.data;

    const coinsGrowingLastHour = data.filter(
        (coin: any) => coin.quote.USD.percent_change_1h > 0
    );

    coinsGrowingLastHour.sort((a: any, b: any) => {
        return b.quote.USD.percent_change_1h - a.quote.USD.percent_change_1h;
    });

    coinsGrowingLastHour.forEach((coin: any) => {
        let priceFormatted;

        if (coin.quote.USD.price > 1) {
            priceFormatted = coin.quote.USD.price.toFixed(2);
        } else {
            priceFormatted = coin.quote.USD.price.toFixed(6);
        }

        return ctx.reply(
            `${
                coin.name
            } : ${priceFormatted} cresceu ${coin.quote.USD.percent_change_1h.toFixed(
                2
            )}% na ultima hora`
        );
    });
}

export async function sendCoinsGrowingLastDay(ctx: any) {
    const response = await getApi();
    const data = response.data;

    const coinsGrowingLastHour = data.filter(
        (coin: any) => coin.quote.USD.percent_change_24h > 0
    );

    coinsGrowingLastHour.sort((a: any, b: any) => {
        return b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h;
    });

    coinsGrowingLastHour.forEach((coin: any) => {
        let priceFormatted;

        if (coin.quote.USD.price > 1) {
            priceFormatted = coin.quote.USD.price.toFixed(2);
        } else {
            priceFormatted = coin.quote.USD.price.toFixed(6);
        }

        return ctx.reply(
            `${
                coin.name
            } : ${priceFormatted} cresceu ${coin.quote.USD.percent_change_24h.toFixed(
                2
            )}% no ultimo dia`
        );
    });
}
