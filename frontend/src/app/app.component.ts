import {Component, NgZone, OnInit} from '@angular/core';

import {GenerateResult} from './core/model/GenerateResult';
import {createMapFromAnswer} from './core/helper/map.helper';
import {FulibWorkflowsService} from './core/services/fulibWorkflows.service';
import {pmExample} from './core/examples/pm.example';
import {msExample} from './core/examples/ms.example';
import {pagesExample} from './core/examples/pages.example';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //Codemirror
  public content!: any;
  public codemirrorOptions: any;

  public generateResult!: GenerateResult;

  public currentExampleDesc: string = 'Select example';
  public examplesList = ['Data Modelling', 'Microservices', 'Pages'];

  constructor(private fulibWorkflowsService: FulibWorkflowsService,
              private zone: NgZone) {
    // https://angular.io/api/core/NgZone
    const generateHandler = () => this.zone.run(() => this.generate());

    this.codemirrorOptions = {
      lineNumbers: true,
      theme: 'material',
      mode: 'yaml',
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
        'Ctrl-S': generateHandler,
      },
      autofocus: true,
    };
  }

  ngOnInit() {
  }

  changeExampleContent(index: number) {
    this.currentExampleDesc = this.examplesList[index];

    // Change content
    let newContent;
    switch (this.examplesList.indexOf(this.currentExampleDesc)) {
      case 0:
        newContent = pmExample;
        break;
      case 1:
        newContent = msExample;
        break;
      case 2:
        newContent = pagesExample;
        break;
      default:
        console.log('Unknown example');
    }
    this.content = newContent;
    this.generate();
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
