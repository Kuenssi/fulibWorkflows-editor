import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {environment} from '../../../environments/environment';
import {FileExportHelper, MIME_TYPES} from '../file-export.helper';

@Injectable()
export class FulibWorkflowsService {

  constructor(private httpService: HttpService) {
  }

  public generate(data: string): Observable<any> {
    return this.httpService.post(environment.backendUrl + environment.generate, data);
  }

  public downloadZip(cmContent: string, fileName: string) {
    this.httpService.postFile(environment.backendUrl + environment.download, cmContent).subscribe(
      (res) => {
        FileExportHelper.resToFileDownload(res, fileName, MIME_TYPES.zip);
      }
    );
  }
}
