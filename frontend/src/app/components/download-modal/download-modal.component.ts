import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent {
  @ViewChild('download') private downloadModal: any;

  @Output() private downloadEmitter: EventEmitter<string> = new EventEmitter<string>();

  public selectedDownloadOption!: string | undefined;
  public options: string[] = ['Only Board', 'Only Mockups', 'Only YAML', 'Everything'];

  constructor(private modalService: NgbModal) {
  }

  public open() {
    this.modalService.open(this.downloadModal, {centered: true}).result.then((reason) => {
      if (this.selectedDownloadOption) {
        this.downloadEmitter.emit(this.selectedDownloadOption);
      }
    });
  }
}
