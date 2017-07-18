import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-debug',
    templateUrl: 'app-debug.component.html'
})

export class DebugComponent {

    @Input() loadTime: any;
    @Input() buildTime: any;
}
