import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario = new Usuario()
  public respuestaSecreta = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private router:Router,
    private bd: DataBaseService,
  ) { 

    this.activateRoute.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      } else {
      this.router.navigate(['/ingreso']);
      }
  
    });

  }

  ngOnInit() {
  }

  public async RespuestaSecreta() {
    const usuario = new Usuario;
    const validarcorreo = await this.bd.leerUsuario(this.respuestaSecreta);
        
      const navigationExtras: NavigationExtras = {
          state: {
            usuario: this.usuario
          }
        };
        this.router.navigate(['/correcto'], navigationExtras);
    }


    private async mostrarAlerta(header: string, message: string): Promise<void> {
      this.router.navigate(['/incorrecto'])
    }

  public iniciarSesion(): void {
    this.router.navigate(['/ingreso'])
  }

}
