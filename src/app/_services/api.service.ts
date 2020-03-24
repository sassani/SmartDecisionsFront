import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    readonly baseUrl = 'https://localhost:44361'
    // readonly baseUrl = 'https://api.ardavansassani.com'

    constructor(private http: HttpClient) { }

    get(url: string) {
        return this.http.get<any>(`${this.baseUrl}/${url}`);
    }

    post(url: string, body: object) {
        return this.http.post<any>(`${this.baseUrl}/${url}`, body);
    }

    put(url: string, body: object) {
        return this.http.put<any>(`${this.baseUrl}/${url}`, body);
    }

    delete(url: string) {
        return this.http.delete<any>(`${this.baseUrl}/${url}`);
    }
}
