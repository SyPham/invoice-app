import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Invoice } from '../_models';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  baseUrl = `${environment.apiUrl}/Invoices/`;
  ModalNameSource = new BehaviorSubject<number>(0);
  currentModalName = this.ModalNameSource.asObservable();

  public info = new BehaviorSubject<{
    status: boolean,
    invoice: Invoice
  }>({
    status: false,
    invoice: {} as Invoice
  });
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
    let url =  ``;
    if (invoiceNo !== '') {
      url =  `filter?invoiceNo=${invoiceNo}`;
    }
    if (companyID !== 0 && status === '') {
      url =  `filter?companyID=${companyID}`;
    }
    if (companyID !== 0 && status !== '') {
      url =  `filter?companyID=${companyID}&status=${status}`;
    }
    return this.http.get(this.baseUrl + url);
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

  public setValue(value): void {
    this.info.next(value);
  }
  public getValue(): Observable<{
    status: boolean,
    invoice: Invoice
  }> {
    return this.info.asObservable();
  }
}
