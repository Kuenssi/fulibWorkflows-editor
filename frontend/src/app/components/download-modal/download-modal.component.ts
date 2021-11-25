import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {GenerateResult} from '../../core/model/GenerateResult';
import {FileExportHelper, MIME_TYPES} from '../../core/file-export.helper';
import {FulibWorkflowsService} from '../../core/services/fulibWorkflows.service';

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

  constructor(private modalService: NgbModal,
              private fulibWorkflowsService: FulibWorkflowsService) {
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
        FileExportHelper.stringToFileDownload(this.data.board, 'board.html', MIME_TYPES.html);
        break;
      case 'Only Mockups':
        this.fulibWorkflowsService.downloadZip(this.cmContent, 'mockups.zip');
        break;
      case 'Only YAML':
        FileExportHelper.stringToFileDownload(this.cmContent, 'workflow.es.yaml', MIME_TYPES.html);
        break;
      case 'Everything':
        // TODO With or without a gradle project?
        this.fulibWorkflowsService.downloadZip(this.cmContent, 'export.zip');
        break;
      default:
        break;
    }
    this.modalService.dismissAll();
  }
}
