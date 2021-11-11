import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  get(url: string): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'Accept': 'text/html'});
    return this.httpClient.get(url, { headers: headers, responseType: 'text' }).toPromise();
  }
}
