import {Component} from '@angular/core';

import {ToastService} from '../../core/services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {
  public toastService!: ToastService;

  constructor(toastr: ToastService) {
    this.toastService = toastr;
  }
}
