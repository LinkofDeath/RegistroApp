import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistrarmePage implements OnInit {

  usuario = new Usuario
  repeticionPassword = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private router:Router,
    private bd: DataBaseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  mostrarMensaje(nombreCampo:string, valor: string) {
    if (valor.trim() === '') {
      showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
      return false;
    }
    return true;
  }


  async registrarUsuario() {
    const correoExistente = await this.bd.leerUsuario(this.usuario.correo);
    this.bd.guardarUsuario(this.usuario)
    .then(() => {
      if (correoExistente) {
        
      }
      console.log('Usuario registrado exitosamente');
    })
    .catch(error => {
      console.error('Error al registrar el usuario', error)
    })
    this.router.navigate(['/inicio']);
  }

  guardarUsuario() {
    if (!this.mostrarMensaje('nombre', this.usuario.nombre)) return;
    if (!this.mostrarMensaje('apellidos', this.usuario.apellido)) return;
    if (!this.mostrarMensaje('correo', this.usuario.correo)) return;
    if (!this.mostrarMensaje('pregunta secreta', this.usuario.preguntaSecreta)) return;
    if (!this.mostrarMensaje('respuesta secreta', this.usuario.respuestaSecreta)) return;
    if (!this.mostrarMensaje('contraseña', this.usuario.password)) return;
    if (this.usuario.password !== this.repeticionPassword) {
      showAlertDUOC(`Las contraseñas escritas deben ser iguales.`);
      return;
    }
  
    // Verificar si ya existe un usuario con el mismo correo
    const usuarioExistente = this.bd.leerUsuario(this.usuario.correo);
  
    if (usuarioExistente && usuarioExistente !== this.bd.guardarUsuario(this.usuario)) {
      showAlertDUOC(`Ya existe un usuario con el correo proporcionado.`);
      return;
    }
  
    // Guardar el usuario si la verificación es exitosa
    this.bd.guardarUsuario(this.usuario);
    this.authService.setUsuarioAutenticado(this.usuario);
    showToast('Sus datos fueron creados');
  }
  

  public iniciarSesion(): void {
    this.router.navigate(['/ingreso'])
  }

}
