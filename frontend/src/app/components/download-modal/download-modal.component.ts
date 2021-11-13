import {Component, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent {
  @ViewChild('download') private download: any;

  constructor(private modalService: NgbModal) {
  }

  public open() {
    this.modalService.open(this.download, {centered: true}).result.then(() => {

    });
  }
}
