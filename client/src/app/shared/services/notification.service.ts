import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public showError(message: string, options?: any) {
    console.log(message);
    // return this.toastr.error(message);
    // ADD MATERIALS SNACKBAR
  }
}
