$(document).ready(function() {
    $("#contact-btn").click(function() {
      $("#contact-modal").modal("show");
    });
  });

  

  $(document).ready(function() {
    $("#cotizacion-btn").click(function() {
      $("#cotizacion-modal").modal("show");
    });
  });

// Envio de formulario de proceso y contacto 

  document.addEventListener('DOMContentLoaded', function() {
    // Configurar reglas de validación y mensajes de error usando jQuery validation
    $('#formularioProceso').validate({
        rules: {
            nombreProceso: 'required',
            emailProceso: 'required',
            provincia: 'required',
            cantidad: 'required'
        },
        messages: {
            nombreProceso: 'Por favor ingrese su nombre',
            emailProceso: 'Por favor ingrese el precio',
            provincia:'Por favor seleccione la provincia a viajar',
            cantidad: 'Por favor ingrese la cantidad'
        },
        submitHandler: function(form) {
            // Obtener los valores de los campos del formulario
            var nombre = document.getElementById('nombreProceso').value;
            var email = document.getElementById('emailProceso').value;
            var cantidad = document.getElementById('cantidad').value;
            var provincia = document.getElementById('provinciaProceso');
            var provinciaSelected = this.options[provincia.selectedIndex].text;

            // Realizar cálculos para la cotización
            var subtotal = 20000 * cantidad;
            var impuesto = subtotal * 0.21; // Se asume un impuesto del 21%
            var total = subtotal + impuesto;

            // Generar el resumen de la cotización
            var cotizacion = 'Cotización:\n\n' +
                'Nombre: ' + nombre + '\n' +
                'email: ' + email + '\n' +
                'Cantidad de personas: ' + cantidad + '\n' +
                'Provincia a viajar: ' + provinciaSelected + '\n' +
                'Subtotal: $' + subtotal + '\n' +
                'Impuesto (21%): $' + impuesto + '\n' +
                'Total: $' + total;

            // Mostrar la cotización en un cuadro de diálogo
            alert(cotizacion);

            // Continuar con el resto del código de generación del PDF y descarga del archivo, si es necesario
            // ...
            // Crear un nuevo objeto jsPDF
            var pdf = new jsPDF();

            // Agregar el resumen al documento PDF
            pdf.text(cotizacion, 10, 10);

            // Generar el archivo PDF como Blob
            var pdfBlob = pdf.output('blob');

            // Crear un enlace de descarga
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'resumen_proceso.pdf';
            downloadLink.click();

            // Liberar el objeto Blob
            URL.revokeObjectURL(pdfBlob);
        
        }
    });
    $('#formulario-contacto').validate({
      rules:{
        nombre:{
          required: true,
          minlenght: 4,
        },
        email: {
          required: true,
          email: true,
        },
        provincia:{
          required: true,
        },
        telefono:{
          required: true,
          telefono: true,
        },
        ciudad:{
          required: true,
          minlenght: 3,
        },
        fecha:{
          required: true,
          Date: true,
        },
        mensaje: 'required'
      },
      messages: {

        nombre:{
          required: "Por favor, introduzca un nombre",
          minlenght:"el nombre es muy corto"
        },
  
        email:{
        required: "Por favor, introduzca un email",
        email:"Por favor, introduce una dirección de correo electrónico válida"
      },

      telefono:{
        required: "Por favor, introduzca un telefono",
        telefono: "Por favor, introduce un telefono válido"
      },

      fecha:{
        required: "Por favor, introduzca una fecha",
        Date: "Por favor, introduce una fecha valida"
      },
      mensaje:'Por favor ingrese el motivo del contacto'
      
      },
      submitHandler: function(form) {

        // Obtener los valores de los campos del formulario
        var nombre = $('#nombre').val();
        var email = $('#email').val();
        var provincia = $('#provincia').val();
        var mensaje = $('#mensaje').val();

        // Hacer la petición AJAX para enviar los datos al servidor
        $.ajax({
            url: 'https://reqres.in/api/users?page=2', // URL de regres.in para la petición de contacto
            method: 'POST', // Método HTTP POST
            data: {
                nombre: nombre,
                email: email,
                provincia: provincia,
                mensaje: mensaje
            },
            success: function(response) {
                // Aquí puedes manejar la respuesta del servidor si es necesario
                console.log('Éxito:', response);
                // Puedes mostrar un mensaje de éxito al usuario
                alert('¡Mensaje enviado con éxito!');
            },
            error: function(xhr, status, error) {
                // Aquí puedes manejar los errores de la petición AJAX si es necesario
                console.error('Error:', error);
                // Puedes mostrar un mensaje de error al usuario
                alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
            }
        });
  
      }
  
    });
  
  });
   


