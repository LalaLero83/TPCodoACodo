document.querySelector('.menu-icon').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('miFormulario').addEventListener('submit', function(event) {
        var nombre = document.getElementById('nombre').value.trim();
        var apellido = document.getElementById('apellido').value.trim();
        var email = document.getElementById('email').value.trim();
        var telefono = document.getElementById('telefono').value.trim();

        if (!nombre || !apellido || !email || !telefono) {
            event.preventDefault();
            swal('Error', 'Por favor, completa todos los campos obligatorios.', 'error');
        } else if (!/^\d+$/.test(telefono)) {
            event.preventDefault();
            swal('Error', 'Por favor, ingresa solo números en el campo de teléfono.', 'error');
        } else {
            // Si todos los campos están completos y el teléfono es válido, se muestra el mensaje de éxito
            swal({
                title: 'Éxito',
                text: 'Su mensaje ha sido enviado.',
                icon: 'success',
                buttons: ['Cancelar', 'OK'], // Agregamos botones para confirmación
            }).then(function(confirm) {
                if (confirm) {
                    // Si el usuario hace clic en "OK", se envía el formulario
                    document.getElementById('miFormulario').submit();
                }
            });
            event.preventDefault(); // Evita que el formulario se envíe automáticamente
        }
    });
});
