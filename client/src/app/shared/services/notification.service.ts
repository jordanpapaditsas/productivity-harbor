import { inject, Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastr = inject(ToastrService);

  public showError(message: string, options?: Partial<IndividualConfig>) {
    console.log(message);
    return this.toastr.error(message);
  }
}
