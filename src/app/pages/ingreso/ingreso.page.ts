import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { showToast } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IngresoPage implements OnInit {

  correo ='';
  password = '';
  verClicDeBoton = false;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
    showToast('CLIC BOTON INGRESAR')
    this.authService.login(this.correo, this.password);
  }

  public ingresarPaginaValidarCorreo(): void {
    this.router.navigate(['/correo'])
  }

  public Registrarme(): void {
    this.router.navigate(['/registrarme'])
  }
  
}
