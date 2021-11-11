import {Injectable} from '@angular/core';

import {HttpService} from './http.service';
import {environment} from '../../environments/environment';

@Injectable()
export class FulibWorkflowsService {

  constructor(private httpService: HttpService) {
  }

  public async generateWorkflowBoard(): Promise<any> {
    return this.httpService.get(environment.backendUrl + environment.board);
  }

  public async generateWorkflowMockup(): Promise<any> {
    return this.httpService.get(environment.backendUrl + environment.mockup);
  }
}
