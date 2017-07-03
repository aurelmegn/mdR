import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HighlightJsService } from 'angular2-highlight-js/lib/highlight-js.module';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  viewcontent= null;
  filelist: any[] = null;
  loader = false;
  buildtime = null;
  loadTime = null;
  contentType: string = null;
  currentFolder: string = null;

  constructor(private appservice: AppService, private HighlightJsService: HighlightJsService, private el: ElementRef){}

  ngOnInit(): void {
    this.go({folder : '../'});


  }

    ngAfterViewInit() {
      console.log(document.querySelector('div.highlight'));
      this.HighlightJsService.highlight(document.querySelector('div.highlight'));
  }

  go(path) {

    this.appservice.getList(path).subscribe(
        data => {
          // console.log(data);

          this.filelist = data.folders;
          this.currentFolder = data.currentFolder;
          this.buildtime = data.buildtime;
          this.loader = false;

        },
        error => {
          // console.log(error);
          this.loader = false;

        }
    );
  }

  goToPath(path){

      // console.log({folder : path});

      this.go({folder : path})
  }

  changeContent(abspath, extension){

    const data: Object = { load : abspath, extension : extension};

    this.loader = true;

    this.appservice.loadContent(data).subscribe(
        data => {

          this.viewcontent = data.content;
          this.loadTime = data.buildtime;
          this.loader = false;

          console.log(data)
        },
        error => {

          console.log(error);
          this.loader = false;
        }
    );

    this.contentType = extension;
  }

}
