import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: 'app-nav.component.html'
})

export class NavComponent {

    @Output() OnPathChange = new EventEmitter<any>();
    @Input() currentFolder: string;

    goToPath (path) {

        this.OnPathChange.emit(path);
    }
    constructor() { }
}
