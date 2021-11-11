import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {CodemirrorModule} from '@ctrl/ngx-codemirror';

import {AppComponent} from './app.component';
import {HttpService} from './core/http.service';
import {AppRoutingModule} from './app-routing.module';
import {FulibWorkflowsService} from './core/fulibWorkflows.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CodemirrorModule,
  ],
  providers: [
    HttpService,
    FulibWorkflowsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
