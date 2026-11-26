import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActionSheetController, IonBackButton, IonBadge, IonButtons, IonCard, IonCardContent, IonChip,
  IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonSearchbar, IonSegment,
  IonSegmentButton, IonTitle, IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { close, createOutline, documentTextOutline, timeOutline } from 'ionicons/icons';
import { LongPressDirective } from '../../directives/long-press.directive';
import { EduService, Estudiante } from '../../services/edu.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonBackButton, IonSegment,
    IonSegmentButton, IonLabel, IonCard, IonCardContent, IonSearchbar, IonList, IonItem, IonChip,
    IonBadge, LongPressDirective,
  ],
})
export class RegistroPage {
  periodo = '2';
  texto = '';
  private bloquear = false;

  constructor(private edu: EduService, private router: Router, private sheetCtrl: ActionSheetController) {
    addIcons({ close, createOutline, documentTextOutline, timeOutline });
  }

  get lista() {
    const i = Number(this.periodo) - 1;
    return this.edu.estudiantes
      .filter((e) => e.nombre.toLowerCase().includes(this.texto.toLowerCase()))
      .map((e) => ({ ...e, nota: e.notas[i] }));
  }

  get promedio() {
    const notas = this.lista.map((e) => e.nota).filter((n): n is number => n !== null);
    return notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1) : '---';
  }

  get enRiesgo() {
    return this.lista.filter((e) => e.nota !== null && e.nota < 70).length;
  }

  estado(nota: number | null) {
    if (nota === null) return { texto: 'Pendiente', color: 'warning' };
    if (nota < 70) return { texto: 'En riesgo', color: 'danger' };
    return { texto: 'Aprobado', color: 'success' };
  }

  cambiarPeriodo(ev: CustomEvent) { this.periodo = String(ev.detail.value); }
  buscar(ev: CustomEvent) { this.texto = ev.detail.value ?? ''; }

  verBoletin(e: Estudiante) {
    if (this.bloquear) return; // evita abrir el boletín al soltar un long-press
    this.router.navigate(['/boletin', e.id]);
  }

  // GESTO: long-press -> menú contextual
  async abrirMenu(e: Estudiante) {
    this.bloquear = true;
    const sheet = await this.sheetCtrl.create({
      header: e.nombre,
      buttons: [
        { text: 'Ver boletín', icon: 'document-text-outline', handler: () => this.router.navigate(['/boletin', e.id]) },
        { text: 'Editar nota', icon: 'create-outline' },
        { text: 'Marcar como pendiente', icon: 'time-outline' },
        { text: 'Cancelar', icon: 'close', role: 'cancel' },
      ],
    });
    await sheet.present();
    await sheet.onDidDismiss();
    setTimeout(() => (this.bloquear = false), 300);
  }
}
