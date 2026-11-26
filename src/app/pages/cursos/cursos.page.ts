import { Component } from '@angular/core';
import { Router } from '@angular/router';
import type { RefresherCustomEvent } from '@ionic/angular';
import {
  AlertController, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent,
  IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding,
  IonLabel, IonList, IonMenuButton, IonRefresher, IonRefresherContent, IonTitle, IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash } from 'ionicons/icons';

interface Curso { id: number; sigla: string; nombre: string; estudiantes: number; }

const CURSOS_INICIALES: Curso[] = [
  { id: 1, sigla: 'IA', nombre: 'Inteligencia Artificial', estudiantes: 38 },
  { id: 2, sigla: 'GC', nombre: 'Gráfico por computadora', estudiantes: 52 },
  { id: 3, sigla: 'PDM', nombre: 'Programación Disp. mob.', estudiantes: 40 },
];

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
    IonLabel, IonIcon, IonRefresher, IonRefresherContent, IonFab, IonFabButton,
  ],
})
export class CursosPage {
  cursos: Curso[] = [...CURSOS_INICIALES];
  ultima = new Date();
  porCalificar = 5;

  constructor(private alertCtrl: AlertController, private router: Router) {
    addIcons({ add, trash });
  }

  get totalEstudiantes() {
    return this.cursos.reduce((t, c) => t + c.estudiantes, 0);
  }

  abrirCurso() {
    this.router.navigate(['/registro']);
  }

  // GESTO: pull-to-refresh
  recargar(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.cursos = [...CURSOS_INICIALES]; // vuelve a cargar los datos
      this.ultima = new Date();
      event.target.complete();
    }, 1500);
  }

  // GESTO: swipe para eliminar
  async confirmarEliminar(curso: Curso, sliding: IonItemSliding) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar curso',
      message: `¿Eliminar "${curso.nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => sliding.close() },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => { this.cursos = this.cursos.filter((c) => c.id !== curso.id); },
        },
      ],
    });
    await alert.present();
  }

  agregarCurso() {
    const id = Date.now();
    this.cursos = [...this.cursos, { id, sigla: 'NC', nombre: 'Nuevo curso', estudiantes: 30 }];
  }
}
