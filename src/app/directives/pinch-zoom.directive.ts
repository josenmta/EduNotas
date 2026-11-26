import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appPinchZoom]', standalone: true })
export class PinchZoomDirective {
  private startDist = 0;
  private scale = 1;
  private current = 1;

  constructor(private el: ElementRef<HTMLElement>) {
    this.el.nativeElement.style.touchAction = 'none';
  }

  private dist(e: TouchEvent) {
    const [a, b] = [e.touches[0], e.touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  private aplicar(s: number) {
    this.el.nativeElement.style.transform = `scale(${s})`;
  }

  @HostListener('touchstart', ['$event']) onStart(e: TouchEvent) {
    if (e.touches.length === 2) this.startDist = this.dist(e);
  }

  @HostListener('touchmove', ['$event']) onMove(e: TouchEvent) {
    if (e.touches.length !== 2) return;
    this.current = Math.min(Math.max(this.scale * (this.dist(e) / this.startDist), 1), 4);
    this.aplicar(this.current);
  }

  @HostListener('touchend', ['$event']) onEnd(e: TouchEvent) {
    if (e.touches.length < 2) this.scale = this.current;
  }

  @HostListener('dblclick') reset() {
    this.scale = this.current = 1;
    this.aplicar(1);
  }
}
