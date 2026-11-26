import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonNote, IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { PinchZoomDirective } from '../../directives/pinch-zoom.directive';
import { EduService, Estudiante } from '../../services/edu.service';

@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.page.html',
  styleUrls: ['./boletin.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonBackButton, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonNote,
    IonButton, PinchZoomDirective,
  ],
})
export class BoletinPage {
  est?: Estudiante;

  constructor(private route: ActivatedRoute, public edu: EduService) {
    this.est = this.edu.getById(Number(this.route.snapshot.paramMap.get('id')));
  }

  get final() {
    if (!this.est) return 0;
    const total = this.edu.evaluaciones.reduce((t, ev, i) => t + (this.est!.evals[i] * ev.peso) / 100, 0);
    return Math.round(total * 10) / 10;
  }
}
