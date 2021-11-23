import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {CodemirrorModule} from '@ctrl/ngx-codemirror';

import {AppComponent} from './app.component';
import {SafePipe} from './core/pipes/safe.pipe';
import {AppRoutingModule} from './app-routing.module';
import {HttpService} from './core/services/http.service';
import {FulibWorkflowsService} from './core/services/fulibWorkflows.service';
import {DownloadModalComponent} from './components/download-modal/download-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DownloadModalComponent,
    SafePipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CodemirrorModule,
    NgbModule,
  ],
  providers: [
    HttpService,
    FulibWorkflowsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
