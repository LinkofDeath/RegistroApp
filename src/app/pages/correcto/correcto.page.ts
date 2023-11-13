import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-correcto',
  templateUrl: 'correcto.page.html',
  styleUrls: ['correcto.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class CorrectoPage implements OnInit {

  password = '';
  usuario = new Usuario

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private bd: DataBaseService
    ) {

    this.activateRoute.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          const usuario: Usuario = nav.extras.state['usuario'];
          console.log(this.usuario)
          this.password = usuario.password;
          return;
        }
      } else {
      this.router.navigate(['/ingreso']);
      }
  
    });

  }

  ngOnInit() {

  }

  public iniciarSesion(): void {
    this.router.navigate(['/ingreso'])
  }

}
