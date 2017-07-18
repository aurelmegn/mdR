import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: 'side-nav.component.html'
})

export class SideNavComponent implements OnInit {
    
    @Input() fileList: any;
    @Input() currentFolder: any;
    @Input() supportedExtension: string[];

    @Output() OnPathChange = new EventEmitter<any>();
    @Output() OnChangeContent = new EventEmitter<any>();

    goToPath (path) {

        this.OnPathChange.emit(path);

    }
    isSupported (ext): boolean {
        return this.supportedExtension.includes(ext)
    }

    changeContent(abspath: string, extension: string): void {

        this.OnChangeContent.emit({abspath: abspath, extension: extension})
    }

    public ngOnInit(): void {

    }
}
