const aladhan = {
    url: 'https://api.aladhan.com/v1/gToH',
}


function getHijriDate(date) {


    try {

        /*
        ===>https://aladhan.com/islamic-calendar-api
        "date" (string) -
            A gregorian date formatted as DD-MM-YYYY
        "adjustment" (number) -
            Number of days to adjust hijri date(s). Example: 1 or 2 or -1 or -2
        */
        return fetch(`${aladhan.url}?date=${date}`)
            .then(d => d.json())
            .then(d => d);
    }
    catch (e) {
        
        console.error(e);
    }
}



export { getHijriDate };