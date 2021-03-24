import { Injectable } from '@angular/core';
declare let alertify: any;
alertify.set('notifier', 'position', 'top-right');
alertify.defaults.theme.ok = 'btn btn-primary';
alertify.defaults.theme.cancel = 'btn btn-danger';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {

  constructor() { }
  /*
   * @title {String or DOMElement} The dialog title.
   * @message {String or DOMElement} The dialog contents.
   * @onok {Function} Invoked when the user clicks OK button.
   * @oncancel {Function} Invoked when the user clicks Cancel button or closes the dialog.
   *
   * alertify.confirm(title, message, onok, oncancel);
   *
   */
  confirm(title: string, message: string, okCallback: () => any) {
    // alertify.confirm(title, message, function(e){ okCallback() }
    //             , function(){ alertify.error('Cancel')});
    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else { }
    }).setHeader(title);
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

}
