import { Component,OnInit } from '@angular/core';

import {SingerService} from "./singer.service";
import {ISinger} from "./singer.model";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    singers: ISinger[];
    currentSinger: ISinger;
    private lastBy: string = "";
    private lastAsc:boolean=true;

    ngOnInit(): void {
        this.singerService.getSingers().subscribe(singers => this.singers = singers);
    }

    constructor(private singerService: SingerService) {
        
    }

    addSinger(name: string, like: number) {
        if (typeof (name) == "undefined" || name === "" || like.toString() === "") {
            return;
        }
        let max: number = Math.max.apply(this, this.singers.map((o => o.id)));
        if (typeof (max) !== "undefined") {
            max = 1;
        }
        this.singers.push({ name: name, like: like, id: max + 1 });
        this.orderAllSingers();
    }

    updateSinger(name: string, like: number,id:number) {
        if (id < 1) {
            alert("cannot update new singer");
            return;
        }
        this.currentSinger.name = name;
        this.currentSinger.like = like;
        this.orderAllSingers();
    }

    editSinger(singer: ISinger) {
        this.currentSinger = singer;
        console.log(singer);
    }

    deleteSinger(singer: ISinger) {
        if (!window.confirm("Are you sure to delete this singer: " + singer.name + "?")) {
            return;
        }
        let index = this.singers.indexOf(singer);
        this.singers.splice(index, 1);
    }


    orderAllSingers() {
        let by = this.lastBy;
        this.singers.sort((s1, s2) => {
            let a = s1 as any;
            let b = s2 as any;
            let result = (a[by] < b[by]) ? -1 : (a[by] > b[by]) ? 1 : 0;
            return result * (this.lastAsc ? 1 : -1);
        });
    }

    orderSingers(by: string) {
        if (by === this.lastBy) {
            this.lastAsc = !this.lastAsc;
        } else {
            this.lastAsc = true;
        }
        this.lastBy = by;
        this.orderAllSingers();
    }
}
