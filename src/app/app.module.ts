import { DebugComponent } from './debugComponent/app-debug.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import { AppComponent } from './app.component';
import {AppService} from './app.service';
import {MarkdownModule} from 'angular2-markdown';
import {NavComponent} from './navComponent/app-nav.component';
import {CutFileNamePipe} from './pipe/fileNamePipe';
import { SideNavComponent } from './sideNavComponent/side-nav.component';
import { TextComponent } from './TextFileComponent/text.component';
import {AudioComponent} from './AudioFileComponent/audio.component';
import {FormsModule} from '@angular/forms';
import {NgbModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CutFileNamePipe,
    SideNavComponent,
    DebugComponent,
    TextComponent,
      AudioComponent,
      NgbModule,
      NgbTypeaheadModule
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    HighlightJsModule,
    MarkdownModule.forRoot(),
      FormsModule
  ],
  providers: [AppService, HighlightJsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
