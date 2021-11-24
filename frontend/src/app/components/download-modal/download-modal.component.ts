import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {GenerateResult} from '../../core/model/GenerateResult';
import {FileExportHelper} from '../../core/file-export.helper';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent implements OnInit {
  @ViewChild('download') private downloadModal!: NgbActiveModal;

  @Input() public data!: GenerateResult;
  @Input() public cmContent!: string;

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
        FileExportHelper.stringToFileDownload(this.data.board, 'board.html', "html");
        break;
      case 'Only Mockups':
        // TODO Must be a zip due to multiple files
        break;
      case 'Only YAML':
        FileExportHelper.stringToFileDownload(this.cmContent, 'workflow.es.yaml', "yaml");
        break;
      case 'Everything':
        // TODO Must be a zip due to multiple files
        // TODO With or without a gradle project?
        break;
      default:
        break;
    }

    this.modalService.dismissAll();
  }
}
