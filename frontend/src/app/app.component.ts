import {Component, NgZone, OnInit, ViewChild} from '@angular/core';

import {pmExample} from './core/examples/pm.example';
import {msExample} from './core/examples/ms.example';
import {IOutputData, SplitComponent} from 'angular-split';
import {pagesExample} from './core/examples/pages.example';
import {GenerateResult} from './core/model/GenerateResult';
import {createMapFromAnswer} from './core/helper/map.helper';
import {FulibWorkflowsService} from './core/services/fulibWorkflows.service';
import {MockupViewerComponent} from './components/mockup-viewer/mockup-viewer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mockupViewer') private mockupViewerComponent!: MockupViewerComponent;
  @ViewChild("split") split!: SplitComponent

  //Codemirror
  public content!: any;
  public codemirrorOptions: any;

  public generateResult!: GenerateResult;

  public currentExampleDesc: string = 'Select example';
  public examplesList = ['Data Modelling', 'Microservices', 'Pages'];

  public showIframeHider = false

  constructor(private fulibWorkflowsService: FulibWorkflowsService,
              private zone: NgZone) {
    // https://angular.io/api/core/NgZone
    const generateHandler = () => this.zone.run(() => this.generate());

    this.codemirrorOptions = {
      lineNumbers: true,
      mode: 'yaml',
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
        'Ctrl-S': generateHandler,
      },
      autofocus: true,
    };

    // https://stackoverflow.com/questions/41616112/calling-components-function-from-iframe
    (<any>window).setPageFromIframe = this.setPageFromIframe.bind(this);
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

  setPageFromIframe(index: number) {
    console.log(index);
    this.mockupViewerComponent.setCurrentPageIndex(index + 1); // +1 because index is zero based
  }

  // Source: https://github.com/angular-split/angular-split/blob/main/src/app/examples/iframes/iframes.component.ts
  dragStartHandler() {
    this.showIframeHider = true
  }

  dragEndHandler() {
    this.showIframeHider = false
  }

  splitGutterClick({ gutterNum }: IOutputData) {
    // By default, clicking the gutter without changing position does not trigger the 'dragEnd' event
    // This can be fixed by manually notifying the component
    // See issue: https://github.com/angular-split/angular-split/issues/186
    this.split.notify('end', gutterNum)
  }
}
