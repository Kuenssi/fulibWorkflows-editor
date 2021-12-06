import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {CodemirrorModule} from '@ctrl/ngx-codemirror';

import {NgbDropdown, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {SafePipe} from './core/pipes/safe.pipe';
import {AngularSplitModule} from 'angular-split';
import {AppRoutingModule} from './app-routing.module';
import {HttpService} from './core/services/http.service';
import {FulibWorkflowsService} from './core/services/fulibWorkflows.service';
import {MockupViewerComponent} from './components/mockup-viewer/mockup-viewer.component';
import {DownloadModalComponent} from './components/download-modal/download-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DownloadModalComponent,
    SafePipe,
    MockupViewerComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CodemirrorModule,
    NgbModule,
    AngularSplitModule
  ],
  providers: [
    HttpService,
    FulibWorkflowsService,
    NgbDropdown
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
