import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { showToast } from 'src/app/tools/message-routines';
import { Usuario } from '../model/usuario';
import { Storage } from '@ionic/storage-angular';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root',
})


export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);
  private mostrarComponenteAdmin = new BehaviorSubject<boolean>(false);


  constructor(
    private router: Router, 
    private bd: DataBaseService, 
    private storage: Storage,
    ) {
      this.inicializarAutenticacion();
    }

    private autenticadoSubject = new BehaviorSubject<boolean>(false);
    autenticado$: Observable<boolean> = this.autenticadoSubject.asObservable();

  inicializarAutenticacion() {
    this.storage.create();
    this.leerUsuarioAutenticado();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }
  

  async login(correo: string, password: string) {
    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.bd.actualizarSesionActiva(correo, 'S');
        this.storage.set(this.keyUsuario, usuarioAutenticado);
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.mostrarComponenteAdmin.next(this.verificarRolAdmin(usuarioAutenticado));
        this.router.navigate(['inicio']);
      } else {
        await this.bd.validarUsuario(correo, password).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            showToast(`¡Bienvenido(a) ${usuario.nombre} ${usuario.apellido}!`);
            this.bd.actualizarSesionActiva(correo, 'S');
            this.storage.set(this.keyUsuario, usuario);
            this.usuarioAutenticado.next(usuario);
            this.router.navigate(['inicio']);
          } else {
            showToast(`El correo o la password son incorrectos`);
            this.router.navigate(['ingreso']);
          }
        });
      }
    });
  }

  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        this.bd.actualizarSesionActiva(usuario.correo, 'N');
        this.storage.remove(this.keyUsuario);
        this.usuarioAutenticado.next(null);
        this.mostrarComponenteAdmin.next(false);
        this.router.navigate(['ingreso']);
      } else {
        this.router.navigate(['ingreso']);
      }
    })
  }

  async leerUsuarioAutenticado(): Promise<Usuario | undefined> {
    const usuario = await this.storage.get(this.keyUsuario).then(usuario => usuario as Usuario);
    this.usuarioAutenticado.next(usuario);
    this.mostrarComponenteAdmin.next(this.verificarRolAdmin(usuario));
    return usuario;
  }

  private verificarRolAdmin(usuario: Usuario | null): boolean {
    return usuario?.nombre === 'admin' ?? false;
  }

  setUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }

  setAutenticado(autenticado: boolean): void {
    this.autenticadoSubject.next(autenticado);
  }


}
