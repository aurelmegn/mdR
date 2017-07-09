import {Pipe, PipeTransform} from '@angular/core';
import {isNull} from 'util';
@Pipe({name: 'CutFileName'})
export class CutFileNamePipe implements PipeTransform {

    transform(value: string, length?: number): string {
        if ( value.length < 17) {return value}
        const extRegExp: RegExp = /^(.*)(\.[a-z]{2,})$/;
        const extRegex = extRegExp.exec(value);
        if (isNull(extRegex)) {return value}
        const ext = extRegex[2];
        let name = extRegex[1];
        name = name.slice(0, 10);
        console.log(name);
        return name;
    }

}
