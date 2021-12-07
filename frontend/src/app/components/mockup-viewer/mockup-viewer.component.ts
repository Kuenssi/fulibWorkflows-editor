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
    if (!this.currentDisplay) {
      return '';
    }

    let result;
    switch (this.currentDisplay) {
      case 'pages':
        result = this.getCurrentPage();
        break;
      case 'diagrams':
        result = this.getCurrentDiagram();
        break;
      default:
        result = '';
        console.log('Unknown type');
    }

    return result;
  }

  pagesReady(): boolean {
    if (!this.generateResult || !this.generateResult.pages) {
      return false;
    }

    return this.generateResult.pages.size > 0;
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

  private getCurrentPage(): string {
    if (!this.generateResult || !this.generateResult.pages) {
      return ''
    }

    if (this.index) {
      this.currentPageIndex = this.index;
      this.index = undefined;
    }

    const currentPage = this.generateResult.pages.get(this.currentPageIndex);

    if (!currentPage) {
      return '';
    }

    return currentPage;
  }

  private getCurrentDiagram(): string {
    return '';
  }
}
