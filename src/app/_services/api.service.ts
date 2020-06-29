import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    readonly BASE_URL: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get<T>(url: string) {
        return this.http.get<T>(`${this.BASE_URL}/${url}`);
    }

    post(url: string, body: object) {
        return this.http.post<any>(`${this.BASE_URL}/${url}`, body);
    }

    put(url: string, body: object) {
        return this.http.put<any>(`${this.BASE_URL}/${url}`, body);
    }

    patch(url: string, body: object) {
        return this.http.patch<any>(`${this.BASE_URL}/${url}`, body);
    }

    delete(url: string) {
        return this.http.delete<any>(`${this.BASE_URL}/${url}`);
    }
}
