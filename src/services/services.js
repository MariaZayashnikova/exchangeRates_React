export const getExchangeRates = async () => {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

    let res = await fetch(url);

    if (!res.ok) {
        console.log('error' + res.status)
    }

    return await res.json();
}

export const getArchiveRates = async (url) => {

    /* 'http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=02/03/2021&date_req2=14/03/2021&VAL_NM_RQ=R01235' using this url,
     you can get data for a period for a certain currency, but access from localhost to it is blocked by the cors policy 
    */
    // const url = 'https://www.cbr-xml-daily.ru/archive/2022/03/16/daily_json.js';
    let res;
    try {
        res = await fetch(url);
        return await res.json();
    } catch (err) {
        console.log(err)
    }
}