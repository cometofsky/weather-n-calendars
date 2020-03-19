const here = {
    url: 'https://weather.ls.hereapi.com/weather/1.0/report',
    apiKey: 'Y3kPDyzGzcJwIQAjX_KgJCZKqhdydd5_2iLnSfzFGVI',
    format: '.json',
};


//get sunrise, sunset, moonrise, moonset, moonphase details for specified location
function astronomy(city = 'Dhaka') {


    try {

        return fetch(`${here.url}${here.format}?apiKey=${here.apiKey}&product=forecast_astronomy&name=${city}`)
            .then(d => d.json())
            .then(d => d);
    }
    catch (e) {

        console.error(e);
    }
}

function weather(city = 'Dhaka') {


    try {

        fetch(`${here.url}${here.format}?apiKey=${here.apiKey}&product=observation&name=${city}`)
            .then(d => d.json())
            .then(d => d);
    }
    catch (e) {

        console.error(e);
    }
}

function criticalWeather(city = 'Dhaka') {


    try {

        fetch(`${here.url}${here.format}?apiKey=${here.apiKey}&product=alerts&name=${city}`)
            .then(d => d.json())
            .then(d => d);
    }
    catch (e) {

        console.error(e);
    }
}

function nwsAlerts(city = 'Dhaka') {


    try {

        fetch(`${here.url}${here.format}?apiKey=${here.apiKey}&product=news_alerts&name=${city}`)
            .then(d => d.json())
            .then(d => d);
    }
    catch (e) {

        console.error(e);
    }
}



export { astronomy, weather, criticalWeather, nwsAlerts };