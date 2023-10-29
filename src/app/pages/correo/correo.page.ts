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

  public async validadcorreo() {
    const usuario = new Usuario;
    const usuarioEncontrado = await this.bd.leerUsuario(this.correo);
    if (!usuarioEncontrado) {
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
        
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
    this.router.navigate(['incorrecto'])
  }


  private async mostrarAlerta(header: string, message: string): Promise<void> {
    this.router.navigate(['/incorrecto'])
  }

  public iniciarSesion(): void {
    this.router.navigate(['/ingreso'])
  }

}
