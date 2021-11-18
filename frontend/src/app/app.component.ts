import {Component} from '@angular/core';

import {FulibWorkflowsService} from './core/services/fulibWorkflows.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //Codemirror
  public content!: any;
  public codemirrorOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: 'yaml',
  }

  // HTML
  public boardHtmlString!: string;

  constructor(private fulibWorkflowsService: FulibWorkflowsService) {
    this.initInformation();
  }

  generate() {
    this.fulibWorkflowsService.generate(this.content).subscribe(
      (answer) => {
        this.boardHtmlString = answer;
      }
    );
  }

  private initInformation() {
    this.setInitialCodeMirrorContent();
  }

  private setInitialCodeMirrorContent() {
    this.content = '- workflow: Testerino\n' +
      '\n' +
      '- event: Start test scenario\n' +
      '\n' +
      '- page:\n' +
      '    - name: First Page\n' +
      '    - label: First Page\n' +
      '    - button: Red Button\n' +
      '    - input: Name\n';
  }
}
