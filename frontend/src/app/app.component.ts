import {Component, OnInit} from '@angular/core';

import {initialExample} from './core/examples/initial.example';
import {FulibWorkflowsService} from './core/services/fulibWorkflows.service';
import {createMapFromAnswer, GenerateResult} from './core/model/GenerateResult';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

  constructor(private fulibWorkflowsService: FulibWorkflowsService) {
  }

  ngOnInit() {
    this.content = initialExample;
  }

  generate() {
    this.fulibWorkflowsService.generate(this.content).subscribe(
      (answer: GenerateResult) => {
        const pages = createMapFromAnswer(answer.pages, answer.numberOfPages);

        this.generateResult = {
          board: answer.board,
          pages: pages,
          numberOfPages: answer.numberOfPages
        };
      }
    );
  }
}
