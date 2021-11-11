import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  get(url: string): Promise<any> {
    return this.httpClient.get(url).toPromise();
  }
}
