import {Component, Input} from '@angular/core';

import {GenerateResult} from '../../core/model/GenerateResult';

@Component({
  selector: 'app-mockup-viewer',
  templateUrl: './mockup-viewer.component.html',
  styleUrls: ['./mockup-viewer.component.scss']
})
export class MockupViewerComponent {
  @Input() generateResult!: GenerateResult;
  @Input() index!: number | undefined;
  @Input() currentDisplay!: 'pages' | 'diagrams';

  public currentPageIndex = 1;

  constructor() {
  }

  getCurrentIFrameContent(): string {
    if (!this.currentDisplay || !this.generateResult) {
      return '';
    }

    let result;
    switch (this.currentDisplay) {
      case 'pages':
        result = this.getCurrentContent(this.generateResult.pages);
        break;
      case 'diagrams':
        result = this.getCurrentContent(this.generateResult.diagrams);
        break;
      default:
        result = '';
        console.log('Unknown type');
    }

    return result;
  }

  nextPage() {
    if (!this.generateResult) {
      return;
    }

    if (this.currentPageIndex === this.generateResult.numberOfPages) {
      return;
    }

    this.currentPageIndex += 1;
  }

  previousPage() {
    if (!this.generateResult) {
      return;
    }

    if (this.currentPageIndex === 1) {
      return;
    }

    this.currentPageIndex -= 1;
  }

  setFirstPage() {
    this.currentPageIndex = 1;
  }

  setLastPage() {
    this.currentPageIndex = this.generateResult.numberOfPages;
  }

  private getCurrentContent(generateMap: Map<number, string>): string {
    if (!generateMap) {
      return '<h1>Nothing generated yet to display</h1>'
    }

    if (this.index) {
      this.currentPageIndex = this.index;
      this.index = undefined;
    }

    const currentContent = generateMap.get(this.currentPageIndex);

    if (!currentContent) {
      return '';
    }

    return currentContent;
  }
}
