import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {

  usuario = new Usuario();
  correo = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private bd: DataBaseService
  ) { }

  ngOnInit() {
  }

  public async validarCorreo(): Promise<void> {
    const usuarioEncontrado = await this.bd.leerUsuario(this.correo);
    if (!usuarioEncontrado) {
      this.router.navigate(['/incorrecto']);
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }
  

  public iniciarSesion(): void {
    this.router.navigate(['/ingreso'])
  }

}
