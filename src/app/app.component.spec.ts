import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { describe } from 'mocha';
import { AuthService } from './services/auth.service';
import { IngresoPage } from './pages/ingreso/ingreso.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataBaseService } from './services/data-base.service';
import { APIClientService } from './services/apiclient.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    });
  });

  it('Probar que el título de la aplicación sea "Asistencia Duoc"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    alert(app.title);
    expect(app.title).equal('Asistencia Duoc');
  });

});

describe('Probar página de ingreso', () => {
  let component: IngresoPage;
  let fixture: ComponentFixture<IngresoPage>; // Fixture: es un objeto que contiene una instancia de un componente y su template

  // Código fuente que se ejecuta antes de cada test
  beforeEach(() => { 
    // Configuración del módulo de testing
    TestBed.configureTestingModule({ 
      imports: [IngresoPage, IonicModule, FormsModule, CommonModule,],
      providers: [DataBaseService, AuthService, Storage, APIClientService
        , HttpClient, HttpHandler],
    }).compileComponents(); // Compila el template y el css del componente

    // Crea una instancia del componente
    fixture = TestBed.createComponent(IngresoPage); 
    // Obtiene la instancia del componente
    component = fixture.componentInstance;
    // Detecta los cambios en el componente, por ejemplo cuando cambia el valor de una variable o se agregan elementos al DOM
    fixture.detectChanges();
  });

  it('Debería poder crear la página de ingreso', () => {
    // Verifica que el componente se haya creado
    expect(component).toBeTruthy(); 
  });



  it('Debería asignar correo y contraseña a nombre de Ana Torres', () => {
    expect(component.correo).toBe('atorres@duocuc.cl');
    expect(component.password).toBe('1234');
  });

  it('Debería poder iniciar sesión con Ana Torres', async () => {
    // Inyecta el servicio AuthService
    const authService = TestBed.inject(AuthService); 
    // Espía el método login del servicio AuthService para verificar que se llame con los parámetros 'atorres@duocuc' y '1234'
    spyOn(authService, 'login');
    // Ejecuta el método ingresar del componente
    component.correo = 'atorres@duocuc.cl';
    component.password = '1234';
    await component.ingresar(); 
    // Verifica que el método login del servicio AuthService haya sido llamado con los parámetros 'atorres@duocuc' y '1234'
    expect(authService.login).toHaveBeenCalledWith('atorres@duocuc.cl', '1234');
  });

});