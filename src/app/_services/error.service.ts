import { Injectable } from '@angular/core';
import { IError } from '../_interfaces/IError';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  getErrors(err): IError[]{
    let _errors: IError[] = [];
    for (let e of err.error.errors) {
        let er: IError = {
            Code: e.code,
            Title: e.title,
            Description: e.detail
        };
        _errors.push(er);
    }
    return _errors;
  }
}
