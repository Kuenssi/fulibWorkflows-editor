import {Component} from '@angular/core';

import {FulibWorkflowsService} from './core/services/fulibWorkflows.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public content!: any;
  public workflowBoard!: string;
  public workflowMockup!: string;

  codemirrorOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: 'yaml'
  }

  constructor(private fulibWorkflowsService: FulibWorkflowsService) {
    this.initInformation();
  }

  private initInformation() {
    this.setInitialCodeMirrorContent();
    this.getInitialBoard();
    this.getInitialMockup();
  }

  private setInitialCodeMirrorContent() {
    this.content = '- workflow: Testerino\n' +
      '\n' +
      '- event: Start test scenario\n' +
      '\n' +
      '- page:\n' +
      '  - name: First Page\n' +
      '  - label: First Page\n' +
      '  - button: Red Button\n' +
      '  - input: Name\n';
  }

  private getInitialBoard() {
    this.fulibWorkflowsService.generateWorkflowBoard().then((res) => {
      console.log(res);
      this.workflowBoard = res;
    });
  }

  private getInitialMockup() {
    this.fulibWorkflowsService.generateWorkflowMockup().then((res) => {
      console.log(res);
      this.workflowMockup = res;
    });
  }
}
