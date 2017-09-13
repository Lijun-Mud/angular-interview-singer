import { Injectable } from "@angular/core";
import {Observable,Subject} from "rxjs/Rx"

import {ISinger} from "./singer.model";

@Injectable()
export class SingerService {
    getSingers():Observable<ISinger[]> {
        let subject = new Subject<ISinger[]>();
        setTimeout(() => {
                subject.next(Singers);
                subject.complete();
            },
            100);
        return subject;
    }
}


const Singers:ISinger[] = [
    {
        name: "Bill Joel",
        like: 7500000,
        id:1
    },
    {
        name: "Pual McCartney",
        like: 11200000,
        id: 2
    },
    {
        name: "Ziqi Deng",
        like: 3600,
        id: 3
    }
]