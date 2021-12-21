import {Component, NgZone, OnInit, ViewChild} from '@angular/core';

import {IOutputData, SplitComponent} from 'angular-split';
import {ToastService} from './core/services/toast.service';
import {GenerateResult} from './core/model/GenerateResult';
import {createMapFromAnswer} from './core/helper/map.helper';
import {FulibWorkflowsService} from './core/services/fulibWorkflows.service';
import {allNotesExample, msExample, newWorkflowExample, pagesExample, pmExample} from './core/examples';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('split') split!: SplitComponent;

  //Codemirror
  public content!: any;
  public codemirrorOptions: any;

  public generateResult!: GenerateResult;

  public version!: string;

  public currentExampleDesc: string = 'Select example';
  public examplesList = ['Empty workflow', 'All Notes', 'Data Modelling', 'Microservices', 'Pages'];

  public showIframeHider = false;
  public newPageIndex!: number;
  public currentDisplay: 'pages' | 'objects' | 'class' = 'pages';
  public currentCodemirrorTheme: 'idea' | 'material' = 'idea';

  constructor(private fulibWorkflowsService: FulibWorkflowsService,
              public toastService: ToastService,
              private zone: NgZone) {
    // https://angular.io/api/core/NgZone
    const generateHandler = () => this.zone.run(() => this.generate());

    this.codemirrorOptions = {
      lineNumbers: true,
      theme: this.currentCodemirrorTheme,
      mode: 'yaml',
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
        'Ctrl-S': generateHandler,
      },
      autofocus: true,
      tabSize: 2,
    };

    // https://stackoverflow.com/questions/41616112/calling-components-function-from-iframe
    (<any>window).setIndexFromIframe = this.setIndexFromIframe.bind(this);
    (<any>window).showToast = this.showToast.bind(this);
  }

  ngOnInit() {
    this.version = environment.version;
  }

  changeExampleContent(index: number) {
    this.currentExampleDesc = this.examplesList[index];

    // Change content
    let newContent;
    switch (this.examplesList.indexOf(this.currentExampleDesc)) {
      case 0:
        newContent = newWorkflowExample;
        break;
      case 1:
        newContent = allNotesExample;
        break;
      case 2:
        newContent = pmExample;
        break;
      case 3:
        newContent = msExample;
        break;
      case 4:
        newContent = pagesExample;
        break;
      default:
        console.log('Unknown example');
    }
    this.content = newContent;
    if (this.currentExampleDesc !== 'Empty workflow') {
      this.generate();
    }
  }

  generate() {
    this.fulibWorkflowsService.generate(this.content).subscribe(
      (answer: GenerateResult) => {
        const pages = createMapFromAnswer(answer.pages, answer.numberOfPages);
        const diagrams = createMapFromAnswer(answer.diagrams, answer.numberOfDiagrams);
        const fxmls = createMapFromAnswer(answer.fxmls, answer.numberOfFxmls);

        this.generateResult = {
          board: answer.board,
          pages: pages,
          numberOfPages: answer.numberOfPages,
          diagrams: diagrams,
          numberOfDiagrams: answer.numberOfDiagrams,
          fxmls: fxmls,
          numberOfFxmls: answer.numberOfFxmls,
          classDiagram: answer.classDiagram,
        };
      }
    );
  }

  setIndexFromIframe(index: number) {
    // It needs to be run in the NgZone because only then angular change detection gets a grip on the change
    this.zone.run(() =>
      this.newPageIndex = index + 1); // +1 because map is 1 based and the generated fulibWorkflows is 0 based right now
  }

  // Source: https://github.com/angular-split/angular-split/blob/main/src/app/examples/iframes/iframes.component.ts
  dragStartHandler() {
    this.showIframeHider = true
  }

  dragEndHandler() {
    this.showIframeHider = false
  }

  splitGutterClick({gutterNum}: IOutputData) {
    // By default, clicking the gutter without changing position does not trigger the 'dragEnd' event
    // This can be fixed by manually notifying the component
    // See issue: https://github.com/angular-split/angular-split/issues/186
    this.split.notify('end', gutterNum)
  }

  showToast(toastContent: string) {
    this.zone.run(() => {
      this.toastService.show(toastContent, {classname: 'bg-success text-light'});
    });
  }

  changeTheme(theme: string) {
    this.codemirrorOptions.theme = theme;
  }
}
