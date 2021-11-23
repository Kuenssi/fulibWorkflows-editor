import {Component} from '@angular/core';

import {FulibWorkflowsService} from './core/services/fulibWorkflows.service';
import {GenerateResult} from './core/model/GenerateResult';

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
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
      'Ctrl-S': () => this.generate(), // TODO -> Only does this after another action on the codemirror
    },
    autofocus: true,
  };

  public generateResult!: GenerateResult;

  private currentPageIndex = 1;

  constructor(private fulibWorkflowsService: FulibWorkflowsService) {
    this.initInformation();
  }

  generate() {
    this.fulibWorkflowsService.generate(this.content).subscribe(
      (answer) => {
        this.generateResult = answer;
      }
    );
  }

  getCurrentPage(): string {
    if (!this.generateResult || !this.generateResult.pages) {
      return ''
    }

    const currentPage = this.generateResult.pages.get(this.currentPageIndex);

    if (!currentPage) {
      return '';
    }

    return currentPage;
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
