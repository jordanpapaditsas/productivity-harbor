import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  input,
  Input,
  output,
  Output,
} from '@angular/core';

@Component({
  selector: 'ph-popup',
  templateUrl: './ph-popup.component.html',
  styleUrls: ['./ph-popup.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class PhPopupComponent {
  title = input<string>('');
  width = input<string>('600px');
  height = input<string>('600px');
  hideOnOutsideClick = input<boolean>(true);
  onHiding = output<void>();

  private closePopup() {
    this.onHiding.emit();
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    if (
      this.hideOnOutsideClick() &&
      !(
        event.target instanceof Element &&
        event.target.closest('.popup-content')
      )
    ) {
      this.closePopup();
    }
  }
}
