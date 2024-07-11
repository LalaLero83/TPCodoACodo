from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#get -> consultar
@app.route('/alumnos', methods=['GET'])
def ver_alumnos():
    db = mysql.connector.connect(
    host='silxus.mysql.pythonanywhere-services.com',
        user='silxus', #mi usuario
        password='qZ.V#wEtm6JpkK6', #mi contraseña
        database='silxus$cursos' #nombre de la base de datos
    )

    cursor = db.cursor(dictionary=True) #en lugar de tener una lista con tuplas, tener un diccionario con clave(campo) y valor(dato)
    cursor.execute("SELECT * FROM alumnos")

    alumnos = cursor.fetchall()

    cursor.close()
    return jsonify(alumnos) #generamos un json como respuesta


#delete -> eliminar

@app.route('/eliminar_alumnos/<int:id>', methods=['DELETE'])
def eliminar_alumno(id):
    db = mysql.connector.connect(
        host='silxus.mysql.pythonanywhere-services.com',
        user='silxus', #mi usuario
        password='qZ.V#wEtm6JpkK6', #mi contraseña
        database='silxus$cursos' #nombre de la base de datos
    )

    cursor = db.cursor()
    cursor.execute("DELETE FROM alumnos WHERE id_usuario = %s", (id,))

    db.commit()
    cursor.close()
    return jsonify({"mensaje":"REGISTRO ELIMINADO CON EXITO!!!"})


# post -> crear un nuevo elemento en el servidor
@app.route('/agregar_alumno', methods=['POST'])
def crear_alumno():
    try:
        info = request.json
        db = mysql.connector.connect(
            host='silxus.mysql.pythonanywhere-services.com',
            user='silxus',  # tu usuario
            password='qZ.V#wEtm6JpkK6',  # tu contraseña
            database='silxus$cursos'  # nombre de tu base de datos
        )

        cursor = db.cursor()
        # Asegúrate de que los nombres de los campos coincidan con los de tu tabla 'alumnos'
        query = "INSERT INTO alumnos (usuario, clave, mail, telefono, acceso) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(query, (info["usuario"], info["clave"], info["mail"], info["telefono"], info["acceso"]))

        db.commit()
        cursor.close()
        return jsonify({"mensaje": "REGISTRO CREADO CON ÉXITO!!!"})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/actualizar_alumno/<int:id>', methods=['PUT'])
def modificar_alumno(id):
    try:
        info = request.json
        db = mysql.connector.connect(
            host='silxus.mysql.pythonanywhere-services.com',
            user='silxus',  # tu usuario
            password='qZ.V#wEtm6JpkK6',  # tu contraseña
            database='silxus$cursos'  # nombre de tu base de datos
        )

        cursor = db.cursor()
        # Asegúrate de que los nombres de los campos coincidan con los de tu tabla 'alumnos'
        query = "UPDATE alumnos SET usuario = %s, clave = %s, mail = %s, telefono = %s, acceso = %s WHERE id_usuario = %s"
        cursor.execute(query, (info["usuario"], info["clave"], info["mail"], info["telefono"], info["acceso"], id))

        db.commit()
        cursor.close()
        return jsonify({"mensaje": "REGISTRO ACTUALIZADO CON ÉXITO!!!"})
    except Exception as e:
        return jsonify({"error": str(e)})



if __name__ == '__main__':
    app.run(debug=True)


