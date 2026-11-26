import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';

@Directive({ selector: '[appLongPress]', standalone: true })
export class LongPressDirective implements OnInit, OnDestroy {
  @Output() longPress = new EventEmitter<void>();
  private gesture?: Gesture;
  private timer?: any;

  constructor(private el: ElementRef, private gestureCtrl: GestureController) {}

  ngOnInit() {
    this.gesture = this.gestureCtrl.create({
      el: this.el.nativeElement,
      gestureName: 'long-press',
      threshold: 0,
      onStart: () => {
        this.timer = setTimeout(() => this.longPress.emit(), 500); // 500 ms = pulsación larga
      },
      onMove: (ev) => {
        // si el dedo se mueve, es scroll o swipe, no long-press
        if (Math.abs(ev.deltaX) > 10 || Math.abs(ev.deltaY) > 10) clearTimeout(this.timer);
      },
      onEnd: () => clearTimeout(this.timer),
    });
    this.gesture.enable();
  }

  ngOnDestroy() {
    this.gesture?.destroy();
    clearTimeout(this.timer);
  }
}
