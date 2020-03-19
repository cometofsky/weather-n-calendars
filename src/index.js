import { weather, astronomy, criticalWeather, nwsAlerts } from './js/solar';
import { getHijriDate } from './js/hijri';
import "../node_modules/bulma/css/bulma.css";
import "./css/main.css";
import "./vendors/js/fa.js";

/*import { range, fromEvent } from "rxjs";
import { map, filter, scan, throttleTime } from "rxjs/operators";*/




async function getAstronomy() {

    const ast = await astronomy();

    document.getElementById('astronomy').querySelector('#area').innerHTML = `${ast.astronomy.state}, ${ast.astronomy.country}`;
    
    ast.astronomy.astronomy.forEach(dt => {

        const date = new Date(dt.utcTime);

        document.getElementById('astronomy-items').innerHTML += `
        <div class="section box">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <div class="title gregorian">
                            Gregorian Date: ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}
                        </div>
                        <div class="title hijri" id="${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}">
                            Hijri Date: <label></label>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div><i class="far fa-sun"></i> Sunrise: ${dt.sunrise}</div>
                        <div><i class="fas fa-sun"></i> Sunset: ${dt.sunset}</div>
                    </div>
                    <div class="column">
                        <div><i class="far fa-moon"></i> Moonrise: ${dt.moonrise}</div>
                        <div><i class="fas fa-moon"></i> Moonset: ${dt.moonset}</div>
                        <div><i class="fas fa-adjust"></i> Moonphase: ${dt.moonPhase} (${dt.moonPhaseDesc})</div>
                    </div>
                </div>
            </div>
        </div>
        `;

        const hijriDate = getHijriDate(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`)
            .then(d => {
                document.getElementById(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`)
                        .querySelector('label')
                        .innerText = `${d.data.hijri.day} ${d.data.hijri.month.en}, ${d.data.hijri.year}`;
            });
    });
    
}

getAstronomy();

    

/*fromEvent(document, 'click')
    .pipe(scan(count => count + 1, 0))
    .subscribe(count => console.log(`Clicked ${count} times`));


fromEvent(document, 'load')
    .pipe(
      throttleTime(1000),
      scan(count => count + 1, 0)
    )
    .subscribe(count => console.log(`Clicked ${count} times`));*/