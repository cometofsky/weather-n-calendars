import { range } from "rxjs";
import { map, filter } from "rxjs/operators";




range(1, 20)
    .pipe(
        filter(x => x % 1 === 1),
        map(x => x + x)
    )
    .subscribe(x => console.log(x));
    