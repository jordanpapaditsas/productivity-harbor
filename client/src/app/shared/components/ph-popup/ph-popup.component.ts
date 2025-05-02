import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  output,
  ViewChild,
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
  isFullScreenMode = input<boolean>(false);
  hidePopup = output<void>();

  popupWidth = computed(() =>
    this.isFullScreenMode() ? '100vw' : this.width()
  );
  popupHeight = computed(() =>
    this.isFullScreenMode() ? '100vh' : this.height()
  );

  private closePopup() {
    this.hidePopup.emit();
  }
  @ViewChild('popupContent', { static: true })
  popupContent!: ElementRef;

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    if (!this.hideOnOutsideClick()) {
      return;
    }
    const clickedInside = this.popupContent.nativeElement.contains(
      event.target
    );

    if (!clickedInside) {
      this.closePopup();
    }
  }
}
