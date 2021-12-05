import {Component, Input, ViewChild} from '@angular/core';
import {GenerateResult} from '../../core/model/GenerateResult';

@Component({
  selector: 'app-mockup-viewer',
  templateUrl: './mockup-viewer.component.html',
  styleUrls: ['./mockup-viewer.component.scss']
})
export class MockupViewerComponent {
  @ViewChild('mockupFrame') private mockupFrame!: HTMLIFrameElement;

  @Input() generateResult!: GenerateResult;

  public currentPageIndex = 1;

  constructor() {
  }

  setCurrentPageIndex(index: number) {
    this.currentPageIndex = index;
    console.log('MockupView: ' + index);

    // https://stackoverflow.com/questions/21937168/refresh-an-iframe-without-refreshing-the-entire-page/47135355
    this.mockupFrame.contentDocument?.location.reload(true);
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
}
