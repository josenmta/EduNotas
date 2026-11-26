import { Injectable } from '@angular/core';

export interface Estudiante {
  id: number;
  nombre: string;
  matricula: string;
  notas: (number | null)[]; // nota por período (1, 2, 3)
  evals: number[];          // examen, quiz, tareas, proyecto
}

@Injectable({ providedIn: 'root' })
export class EduService {
  evaluaciones = [
    { nombre: 'Examen parcial', peso: 30 },
    { nombre: 'Quiz', peso: 10 },
    { nombre: 'Tareas', peso: 30 },
    { nombre: 'Proyecto', peso: 30 },
  ];

  estudiantes: Estudiante[] = [
    { id: 1, nombre: 'José Enmanuel', matricula: '100077576', notas: [88, 92, 90], evals: [82, 88, 80, 92] },
    { id: 2, nombre: 'Carlos Díaz', matricula: '100077577', notas: [72, 69, 75], evals: [65, 70, 72, 68] },
    { id: 3, nombre: 'María Núñez', matricula: '100077578', notas: [80, 78, 85], evals: [75, 80, 78, 79] },
    { id: 4, nombre: 'Luis Peña', matricula: '100077579', notas: [70, null, null], evals: [60, 70, 65, 0] },
  ];

  getById(id: number) {
    return this.estudiantes.find((e) => e.id === id);
  }
}
