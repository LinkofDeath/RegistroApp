import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { DataBaseService } from 'src/app/services/data-base.service';
import { APIClientService } from 'src/app/services/apiclient.service';
import { Usuario } from 'src/app/model/usuario';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { showToast } from 'src/app/tools/message-routines';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
    QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent,AdminComponent,
    
  ],
})
export class InicioPage implements OnInit {
  public usuario: Usuario;

  componente_actual = 'qr';

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: APIClientService
    ) {
      this.usuario = new Usuario;
    }

  ngOnInit() {
    this.componente_actual = 'qr';
    this.bd.datosQR.next('');
  }
  

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (this.componente_actual === 'foro') this.api.cargarPublicaciones();
    if (this.componente_actual === 'misdatos') this.authService.leerUsuarioAutenticado();
  }

  cerrarSesion() {
    showToast('CLIC BOTON SALIR');
    this.authService.logout();
  }

}
