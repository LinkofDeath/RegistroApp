// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

/*
Navegar hacia una página en específico:
  cy.visit('http://localhost:8100/').then(() => { ... });

Hacer clic en un botón, usando el texto del botón:
    cy.contains('Ingresa a tu cuenta').click();

Para hacer clic en un botón, usando el id del botón:
    cy.get('#salir').click();

Cambiar el valor de una caja de texto usando su id:
    cy.get('#correo').invoke('val', 'jperez@duocuc.cl');

Comparar el título de la página actual con un valor esperado:
  cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');

Comparar el texto de un control HTML identificado por un id="#saludo":
  cy.get('#saludo').should('contain.text', '¡Bienvenido Juan Pérez González!');
*/

describe('Verificar mi aplicación', () => {
  // Se intentará navegar hacia la página de inicio con un correo inexistente, por lo que
  // será inutil probar si el saludo se le emite al usuario "Juan Pérez González".
  // En este caso se detectará un error y se mostrará un mensaje.

  it('Verificar login con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/').then(() => {
      cy.wait(3000);
      cy.get('#correo').invoke('val', 'correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '1234');
      cy.wait(5000);
      cy.contains('Ingresar').click();
    });
  });

  // Se intentará navegar hacia la página de inicio con el correo "jperez@duocuc.cl", por lo que
  // la Aplicación debe probar si el saludo se le emite al usuario "Juan Pérez González".
  // En este caso debe pasar correctamente la prueba.

  it('Verificar login con credenciales correctas', () => {
    cy.wait(3000);
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', 'atorres@duocuc.cl');
      cy.get('#password').invoke('val', '1234');
      cy.wait(3000);
      cy.contains('Ingresar').click();
      cy.intercept('/inicio')
        .as('route')
        .then(() => {
          cy.wait(3000);
          cy.get('animated-title').should(
            'contain.text',
            'Sistema de Asistencia DUOC'
          );
          cy.get('#saludo').should(
            'contain.text',
            '¡Bienvenido(a) Ana Tores!'
          );
          cy.wait(3000);
          cy.contains('cerrarsesion').click();
        });
    });
  });

  describe('Mis Datos - Validaciones de campos', () => {
    it('Debe mostrar mensajes de error al intentar actualizar con campos incorrectos', () => {
      // Aquí puedes agregar lógica para navegar a la sección de Mis Datos
      cy.wait(3000);
      cy.visit('http://localhost:8100/').then(() => {
        cy.get('#correo').invoke('val', 'cfuentes@duocuc.cl');
        cy.get('#password').invoke('val', 'asdf');
        cy.wait(3000);
        cy.contains('Ingresar').click();
        cy.intercept('/inicio')
        .as('route')
        cy.wait(3000);
        // Completa los campos con datos incorrectos
        cy.get('#nombre').type('juanito'); // Campo obligatorio sin datos
        cy.wait(3000);
        cy.get('#actualozarperfil').click(); // Reemplaza con el identificador correcto de tu botón para guardar cambios

        // Agrega afirmaciones que verifiquen que se muestran mensajes de error para los campos incorrectos
      });
    });
  });

  describe('Mis Datos - Actualización de datos correctamente', () => {
    it('Debe actualizar correctamente los datos en la sección de Mis Datos', () => {
      // Aquí puedes agregar lógica para navegar a la sección de Mis Datos
      cy.wait(5000);
      cy.visit('http://localhost:8100/').then(() => {
        cy.get('#correo').invoke('val', 'cfuentes@duocuc.cl');
        cy.get('#password').invoke('val', 'asdf');
        cy.wait(3000);
        cy.contains('Ingresar').click();
        cy.intercept('/inicio')
        .as('route')
        cy.wait(3000);
        // Completa los campos con datos válidos
        cy.get('#nombre').type('juan'); // Modifica según tus necesidades

        cy.get('#actualozarperfil').click(); // Reemplaza con el identificador correcto de tu botón para guardar cambios
      });
      // Agrega afirmaciones que verifiquen que los datos se han actualizado correctamente
    });
  });

  describe('Foro - Agregar una publicación', () => {
    it('Debe agregar una nueva publicación en el foro', () => {
      // Aquí puedes agregar lógica para navegar a la sección del foro
      cy.wait(5000);
      cy.visit('http://localhost:8100/').then(() => {
        cy.get('#correo').invoke('val', 'atorres@duocuc.cl');
        cy.get('#password').invoke('val', '1234');
        cy.wait(3000);
        cy.contains('Ingresar').click();
        cy.intercept('/inicio')
        .as('route')
        
        cy.get('#foro').click(); // Reemplaza con el identificador correcto de tu botón para agregar nueva publicación

      // Completa los campos del formulario para agregar una publicación
      cy.get('#titulo').type('Título de la publicación');
      cy.get('#contenido').type('prueba de publicación');

      cy.get('#guardar').click(); // Reemplaza con el identificador correcto de tu botón para publicar

      // Agrega afirmaciones que verifiquen que la publicación se ha agregado correctamente
    });
    });
  });

  describe('Foro - Eliminar la publicación', () => {
    it('Debe eliminar la última publicación en el foro', () => {
      // Aquí puedes agregar lógica para navegar a la sección del foro

      // Asegúrate de tener al menos una publicación para eliminar

      // Identifica la última publicación y agrega lógica para eliminarla
      cy.get('.publicacion:last-child').find('.eliminar').click(); // Reemplaza con los identificadores correctos

      // Agrega afirmaciones que verifiquen que la publicación se ha eliminado correctamente
    });
  });
});
