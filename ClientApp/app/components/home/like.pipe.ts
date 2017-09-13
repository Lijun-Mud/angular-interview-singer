import {Pipe,PipeTransform} from "@angular/core";

@Pipe({
    name:"like"
})

export  class LikePipe implements PipeTransform {
    transform(value: number) {
        if (value > 1000000) {
            return (value / 1000000).toFixed(1) + "m";
        }
        if (value > 1000) {
            return (value / 1000).toFixed(1)+"k";
        }
        return value.toString();
    }
}