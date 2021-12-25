import {Component, NgZone, OnInit, ViewChild} from '@angular/core';

import Ajv from 'ajv';
import {YamlHelper} from './core/helper/yaml.helper';
import {environment} from '../environments/environment';
import {IOutputData, SplitComponent} from 'angular-split';
import {ToastService} from './core/services/toast.service';
import {GenerateResult} from './core/model/GenerateResult';
import {createMapFromAnswer} from './core/helper/map.helper';
import {workflowsSchema} from './core/helper/workflows.schema';
import {FulibWorkflowsService} from './core/services/fulibWorkflows.service';
import {msExample, newWorkflowExample, pagesExample, pmExample} from './core/examples';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('split') split!: SplitComponent;

  // Codemirror
  public content!: any;
  public codemirrorOptions: any;

  public generateResult!: GenerateResult;

  public version!: string;

  public currentExampleDesc: string = 'Select example';
  public examplesList = ['Empty workflow', 'Data Modelling', 'Microservices', 'Pages'];

  public showIframeHider = false;
  public newPageIndex!: number;
  public currentDisplay: 'pages' | 'objects' | 'class' = 'pages';
  public currentCodemirrorTheme: 'idea' | 'material' = 'idea';

  private ajv!: Ajv;
  private validate!: any;
  private yamlHelper!: YamlHelper;
  private loading: boolean = false;

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
    this.ajv = new Ajv();
    this.validate = this.ajv.compile(workflowsSchema);
    this.yamlHelper = new YamlHelper(this.ajv, this.validate);
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
        newContent = pmExample;
        break;
      case 2:
        newContent = msExample;
        break;
      case 3:
        newContent = pagesExample;
        break;
      default:
        newContent = newWorkflowExample;
        this.toastService.show('Unknown Example. Using new workflow template', {classname: 'bg-warning'});
    }
    this.content = newContent;
    if (this.currentExampleDesc !== 'Empty workflow') {
      this.generate();
    }
  }

  generate() {
    const validYaml = this.yamlHelper.lintYamlString(this.content);

    if (!validYaml) {
      const errorMessage = this.evaluateErrorMessage();
      this.toastService.show(errorMessage, {
        classname: 'card bg-danger text-light',
        delay: 20000,
        header: 'Lint Error'
      });
      return;
    }

    this.loading = true;

    this.fulibWorkflowsService.generate(this.content).subscribe(
      (answer: GenerateResult) => {
        const pages = createMapFromAnswer(answer.pages, answer.numberOfPages);
        const diagrams = createMapFromAnswer(answer.diagrams, answer.numberOfDiagrams);
        const fxmls = createMapFromAnswer(answer.fxmls, answer.numberOfFxmls);

        this.loading = false;

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
      },
      (error: any) => {
        this.loading = false;

        let errorMessage = error.error.status + '\n';
        errorMessage += error.error.message;

        this.toastService.show(errorMessage, {
          classname: 'card bg-danger text-light',
          delay: 20000,
          header: 'Parse Error'
        });
      }
    );
  }


  isLoading(): boolean {
    return this.loading;
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
      this.toastService.show(toastContent, {classname: 'card bg-success text-light', header: 'Page Action'});
    });
  }

  changeTheme(theme: string) {
    this.codemirrorOptions.theme = theme;
  }

  openDocs() {
    window.open('https://fujaba.github.io/fulibWorkflows/docs/definitions/', '_blank')
  }

  private evaluateErrorMessage(): string {
    const errors = this.validate.errors;

    let result: string = 'Description: \n';

    // Wrong Item Index
    let index = errors[0].instancePath;

    // Cleanup Index
    index = index.replace("/", "")

    result += 'Error at entry: ' + index + '\n';

    // Evaluate correct error
    for (const error of errors) {
      if (error.keyword !== 'required') {
        const elementReference = error.params.additionalProperty;

        if (elementReference) {
          result += 'Wrong element: "' + elementReference + '"\n';
        }

        result += error.message;
        break;
      }
    }

    return result;
  }
}
