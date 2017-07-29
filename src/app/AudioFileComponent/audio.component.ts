
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-audio',
    templateUrl: 'audio.component.html'
})

export class AudioComponent implements OnInit {
    @Input() fileAbsPath: string;
    @Input() fileRelativePath: Subject<string>;
    relativePath: string = null;
    
    ngOnInit(): void {
        console.log('audio')
        //debugger
        this.fileRelativePath.subscribe(data => this.relativePath = data);
    }

}
