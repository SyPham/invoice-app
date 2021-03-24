import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = `${environment.apiUrl}/Companies/`;
  ModalNameSource = new BehaviorSubject<number>(0);
  currentModalName = this.ModalNameSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }
  // #region Permisison
  getAllCompany() {
    return this.http.get(this.baseUrl, {});
  }
  create(model) {
    return this.http.post(this.baseUrl, model);
  }
  update(id: number, model) {
    return this.http.put(this.baseUrl + id, model);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + id);
  }
}
