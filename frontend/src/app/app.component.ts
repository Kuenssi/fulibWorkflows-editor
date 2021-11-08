import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public content!: any;

  codemirrorOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: 'yaml'
  }
}
