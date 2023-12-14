import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  standalone: true
})
export class AdminComponent  implements OnInit {

  usuario = new Usuario();
  usuarios: any;
  

  constructor(
    private authService: AuthService,
    private db: DataBaseService) {
  }

  
  async ngOnInit() {
    const usu = await this.authService.leerUsuarioAutenticado();
    this.usuario = usu!;
  }

  async eliminarUsuario(correo: string) {
    // Lógica para eliminar el usuario del servicio y recargar la lista
    await this.db.eliminarUsuarioUsandoCorreo(correo);
    this.usuarios = await this.authService.leerUsuarioAutenticado();
  }


}
