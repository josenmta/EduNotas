import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  AlertController, IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList,
  IonMenu, IonMenuToggle, IonRouterLink, IonRouterOutlet, IonSplitPane, IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { homeOutline, createOutline, documentTextOutline, logOutOutline, school } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonHeader, IonToolbar,
    IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle, IonRouterLink, IonRouterOutlet,
  ],
})
export class AppComponent {
  paginas = [
    { titulo: 'Mis cursos', url: '/cursos', icono: 'home-outline' },
    { titulo: 'Registro de calificaciones', url: '/registro', icono: 'create-outline' },
    { titulo: 'Boletín del estudiante', url: '/boletin/1', icono: 'document-text-outline' },
  ];

  constructor(private alertCtrl: AlertController, private router: Router) {
    addIcons({ homeOutline, createOutline, documentTextOutline, logOutOutline, school });
  }

  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Seguro que quieres salir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Salir', role: 'destructive', handler: () => this.router.navigate(['/cursos']) },
      ],
    });
    await alert.present();
  }
}
