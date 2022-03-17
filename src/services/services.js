export const getExchangeRates = async () => {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

    let res = await fetch(url);

    if (!res.ok) {
        console.log('error' + res.status)
    }

    return await res.json();
}