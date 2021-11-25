import {Component, Input, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ExportOptions} from '../../core/model/ExportOptions';
import {GenerateResult} from '../../core/model/GenerateResult';
import {FulibWorkflowsService} from '../../core/services/fulibWorkflows.service';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent {
  @ViewChild('download') private downloadModal!: NgbActiveModal;

  @Input() public data!: GenerateResult;
  @Input() public cmContent!: string;

  public exportOptions: ExportOptions = {
    exportAll: false,
    exportYaml: false,
    exportBoard: true,
    exportPages: false,
  };

  constructor(private modalService: NgbModal,
              private fulibWorkflowsService: FulibWorkflowsService) {
  }

  public open() {
    this.modalService.open(this.downloadModal, {centered: true}).result.then((reason) => {
      if (!reason) {
        this.fulibWorkflowsService.downloadZip(this.cmContent, this.exportOptions);
      }
    });
  }
}
