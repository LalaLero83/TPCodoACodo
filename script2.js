document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productoForm');
    const tableBody = document.getElementById('productosTable').querySelector('tbody');
    let isUpdating = false;

    //async permite que la función se comporte de manera asíncrona, 
    //puede ejecutar operaciones sin bloquear el hilo principal de ejecucion
    const fetchProductos = async () => {
        //luego cambiaremos la url por https://<hostdepanywhere>/productos
        const response = await fetch('https://silxus.pythonanywhere.com/alumnos');// promesa: esperar a que se complete la solicitud HTTP
        const alumnos = await response.json(); //esperar a que se complete la conversión de la respuesta a JSON
        tableBody.innerHTML = '';
        alumnos.forEach(alumno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${alumno.id_usuario}</td>
                <td>${alumno.usuario}</td>
                <td>${alumno.clave}</td>
               <td>${alumno.mail}</td>
               <td>${alumno.telefono}</td>
                <td>${alumno.acceso}</td>
                 <td>
                    <button onclick="editProducto(${alumno.id_usuario}, '${alumno.usuario}', '${alumno.clave}', '${alumno.mail}', '${alumno.telefono}', ${alumno.acceso})">Editar</button>
                    <button onclick="deleteProducto(${alumno.id_usuario})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const addProducto = async (alumno) => {
        await fetch('https://silxus.pythonanywhere.com/agregar_alumno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alumno)
        });
        fetchProductos();
    };

    const updateProducto = async (id, alumno) => {
        await fetch(`https://silxus.pythonanywhere.com/actualizar_alumno/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alumno)
        });
        fetchProductos();
    };

    const deleteProducto = async (id) => {
        await fetch(`https://silxus.pythonanywhere.com/eliminar_alumnos/${id}`, {
            method: 'DELETE'
        });
        fetchProductos();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id_usuario = document.getElementById('id_usuario').value;
        const usuario = document.getElementById('usuario').value;
        const clave = document.getElementById('clave').value;
        const mail = document.getElementById('mail').value;
        const telefono = document.getElementById('telefono').value;
        const acceso = document.getElementById('acceso').value;
        const alumno = { usuario, clave, mail, telefono, acceso };

        if (isUpdating) {
            updateProducto(id_usuario, alumno);
            isUpdating = false;
        } else {
            addProducto(alumno);
        }

        form.reset();
        document.getElementById('id_usuario').value = '';
    });

    window.editProducto = (id_usuario, usuario, clave, mail, telefono, acceso ) => {
    document.getElementById('id_usuario').value = id_usuario;
     document.getElementById('usuario').value = usuario;
     document.getElementById('clave').value = clave;
     document.getElementById('mail').value = mail;
     document.getElementById('telefono').value = telefono;
      document.getElementById('acceso').value = acceso;
        isUpdating = true;
    };

    window.deleteProducto = (id_usuario) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            deleteProducto(id_usuario);
        }
    };

    fetchProductos();
});
