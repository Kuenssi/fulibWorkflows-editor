import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class FulibWorkflowsService {

  constructor(private httpService: HttpService) {
  }

  public generate(data: string): Observable<any> {
    return this.httpService.post(environment.backendUrl + environment.generate, data);
  }
}
