import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {ExportOptions} from '../model/ExportOptions';
import {environment} from '../../../environments/environment';
import {FileExportHelper, MIME_TYPES} from '../helper/file-export.helper';

@Injectable()
export class FulibWorkflowsService {

  constructor(private httpService: HttpService) {
  }

  public generate(data: string): Observable<any> {
    return this.httpService.post(environment.backendUrl + environment.generate, data);
  }

  public downloadZip(cmContent: string, options: ExportOptions) {
    this.httpService.postFile(environment.backendUrl + environment.download, cmContent, options).subscribe(
      (res) => {
        FileExportHelper.resToFileDownload(res, "test.zip", MIME_TYPES.zip);
      }
    );
  }
}
