import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent implements OnInit {
  @ViewChild('download') private downloadModal!: NgbActiveModal;

  public selectedDownloadOption!: string | undefined;
  public options: string[] = ['Only Board', 'Only Mockups', 'Only YAML', 'Everything'];

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    if (this.selectedDownloadOption) {
      this.selectedDownloadOption = undefined;
    }
  }

  public open() {
    this.modalService.open(this.downloadModal, {centered: true}).result.then(() => {
    }).catch(() => {
    });
  }

  public downloadData() {
    // TODO -> need to discuss wanted functionality with albert
    switch (this.selectedDownloadOption) {
      case 'Only Board':
        break;
      case 'Only Mockups':
        break;
      case 'Only YAML':
        break;
      case 'Everything':
        break;
      default:
        break;
    }

    this.modalService.dismissAll();
  }
}
