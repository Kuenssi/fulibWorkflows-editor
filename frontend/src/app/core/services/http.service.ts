import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {MIME_TYPES} from '../file-export.helper';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  post(url: string, data: any): Observable<Object> {
    const headers: HttpHeaders = new HttpHeaders();
    return this.httpClient.post(url, data, {headers: headers});
  }

  postFile(url: string, data: any): Observable<Object> {
    const headers: HttpHeaders = new HttpHeaders({'accept': MIME_TYPES.zip});
    return this.httpClient.post(url, data, {headers: headers, responseType: 'text'});
  }
}
