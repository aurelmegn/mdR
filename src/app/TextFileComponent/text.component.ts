
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-text',
    templateUrl: 'text.component.html'
})

export class TextComponent {
    
    @Input() contentType: string;
    @Input() currentFolder: any;
    @Input() htmlElementViewContent: any;
    @Input() fileContent: any;

}
