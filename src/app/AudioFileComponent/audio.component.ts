
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-audio',
    templateUrl: 'audio.component.html'
})

export class AudioComponent {
    
    @Input() fileAbsPath: string;
    /*@Input() currentFolder: any;
    @Input() htmlElementViewContent: any;
    @Input() fileContent: any;*/

}
