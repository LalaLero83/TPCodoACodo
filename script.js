document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('miFormulario').addEventListener('submit', function(event) {
        var nombre = document.getElementById('nombre').value.trim();
        var apellido = document.getElementById('apellido').value.trim();
        var email = document.getElementById('email').value.trim();
        var telefono = document.getElementById('telefono').value.trim();
        var terminos = document.getElementById('terminos').checked;

        if (!nombre || !apellido || !email || !telefono) {
            event.preventDefault();
            swal('Error', 'Por favor, completa todos los campos obligatorios.', 'error');
        } else if (!/^\d+$/.test(telefono)) {
            event.preventDefault();
            swal('Error', 'Por favor, ingresa solo números en el campo de teléfono.', 'error');
        } else if (!terminos) {
            event.preventDefault();
            swal('Error', 'Debes aceptar los términos y condiciones.', 'error');
        } else {
            swal({
                title: 'Éxito',
                text: 'Su mensaje ha sido enviado.',
                icon: 'success',
                buttons: ['Cancelar', 'OK'],
            }).then(function(confirm) {
                if (confirm) {
                    document.getElementById('miFormulario').submit();
                }
            });
            event.preventDefault();
        }
    });
});
