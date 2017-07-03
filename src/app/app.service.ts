import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ApiUrl} from './parameters';

@Injectable()
export class AppService {

    private headers  = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) {}

    private serialize (obj){

        var str = [];

        for(var p in obj)
            if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        
        return str.join("&");

    }

    getList(data): Observable<any> {

        data = this.serialize(data);

        return this.http.post(ApiUrl.listUrl, data, this.options)
            .map(this.extractData)
            .catch(this.handleError)
    }

    loadContent(data): Observable<any> {

        data = this.serialize(data);

        return this.http.post(ApiUrl.contentUrl, data, this.options)
            .map(this.extractData)
            .catch(this.handleError)
    }

    private extractData(res: any) {

        return res.json();
    }

    private handleError (error: Response) {

        return Observable.throw(error);

    }
}
