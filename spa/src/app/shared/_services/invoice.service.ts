import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  baseUrl = `${environment.apiUrl}/Invoices/`;
  ModalNameSource = new BehaviorSubject<number>(0);
  currentModalName = this.ModalNameSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }
  // #region Permisison
  getAllInvoice() {
    return this.http.get(this.baseUrl, {});
  }
  filter(invoiceNo, companyID, status) {
    invoiceNo = invoiceNo || '';
    companyID = companyID || 0;
    status = status || '';
    const param = new HttpParams();
    param.set('invoiceNo', invoiceNo);
    param.set('companyID', companyID);
    param.set('status', status);
    // http://localhost:5000/api/Invoices/filter?invoiceNo=ABC&companyID=0
    return this.http.get(this.baseUrl + `filter?invoiceNo=${invoiceNo}&companyID=${companyID}&status=${status}`);
  }
  getById(invoiceId) {
    return this.http.get(this.baseUrl + invoiceId, {});
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
