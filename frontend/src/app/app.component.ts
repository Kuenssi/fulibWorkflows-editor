import {Component} from '@angular/core';

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

  constructor() {
    this.content = '- workflow: Testerino\n' +
      '\n' +
      '- event: Start test scenario\n' +
      '\n' +
      '- page:\n' +
      '  - name: First Page\n' +
      '  - label: First Page\n' +
      '  - button: Red Button\n' +
      '  - input: Name\n'
  }
}
