import { BehaviorSubject, Subject } from 'rxjs/Rx';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { AppService } from './app.service';
import {Subscription} from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    /**
     * the selected file content to show
     * @type {string}
     */
    fileContent: string = null;
    /**
     * the list of files in the current folder send by the server
     * @type {Array}
     */
    fileList: any[] = [];
    /**
     * used to show/hide the loader
     * @type {boolean}
     */
    loader = false;
    /**
     * build time of the current folder
     * @type {string}
     */
    buildTime: string = null;
    /**
     * the time elapsed since the file loading start
     * @type {string}
     */
    loadTime: string = null;
    /**
     * the file extension
     * @type {string}
     */
    contentType: string = null;
    /**
     * the current folder path
     * @type {string}
     */
    currentFolder: string = null;
    /**
     * the html printed in the template to show the current file content
     * @type {string}
     */
    htmlElementViewContent = '';
    /**
     * used to stock the subscriptions and to unsubscribe easily
     * @type {Subscription}
     */
    subscription = new Subscription();
    fileRelativePath = new Subject();
    fileAbsPath: string = null;
    /**
     * list of extensions supported by mdR
     * @type {[string,string,string,string,string,string]}
     */
    supportedExtensions = [ 'md', 'svg', 'js', 'css', 'php', 'json'];
    textFileExtensions = ['md', 'js', 'css', 'php', 'json'];
    /**
     * the constructor of AppComponent
     * @param appService
     */
    constructor(private appService: AppService) {}

    /**
     * initialize the mdR by going into the current folder
     */
    ngOnInit(): void {
        this.go({folder : './'});
    }

    /**
     * execute action on class Destruction
     */
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /**
     * function used to know if the a file extension is supported by mdR
     * @param ext
     * @returns {any}
     */
    isSupported(ext: string): boolean {
        return this.supportedExtensions.includes(ext);
    }

    /**
     * the main function of this class, it is used to navigate into the given path
     * @param path
     */
    go(path): void {

        this.loader = true;

        this.subscription.add(
            this.appService.getList(path).subscribe(
                data => {
                  this.fileList = data.folders;
                  this.currentFolder = data.currentFolder;
                  this.buildTime = data.buildtime;
                  this.loader = false;
                },
                error => {
                    this.loader = false;
                    throw new Error(error + ' Unable to navigate to the given path.');
                }
            )
        );
    }

    /**
     * light function used to call go()
     * @param path
     */
    goToPath(path: string): void {
      this.go({folder : path})
    }

    /**
     *
     * @param event
     */
    changeContent(event) {
        this.contentType = event.extension;

        const data: Object = { load : event.abspath, extension : event.extension};
        this.loader = true;

        this.subscription.add(
            this.appService.loadContent(data).subscribe(
                res => {

                this.fileContent = res.content;
                this.loadTime = res.buildtime;
                this.htmlElementViewContent = `<pre class="highlight">` + this.fileContent + ` </pre>`;
                this.loader = false;
                console.log(res)
                },
                error => {
                console.log(error);
                this.loader = false;
                }
            )
        );
  }

  isTextFile(contentype) {
    return this.textFileExtensions.includes(contentype)
  }

}
