from extensions import db
from models.empleado import Empleado


def listar_empleados():
    empleados = Empleado.query.all()
    return [empleado.to_dict() for empleado in empleados]


def obtener_empleado(id):
    empleado = Empleado.query.get(id)

    if not empleado:
        return None

    return empleado.to_dict()


def crear_empleado(data):
    nombre = data.get("nombre")
    apellido = data.get("apellido")
    dni = data.get("dni")
    email = data.get("email")
    cargo = data.get("cargo")

    if not nombre:
        return {"error": "El nombre es obligatorio"}, 400

    if not apellido:
        return {"error": "El apellido es obligatorio"}, 400

    if not dni:
        return {"error": "El DNI es obligatorio"}, 400

    if not email or "@" not in email:
        return {"error": "El email no es valido"}, 400

    if not cargo:
        return {"error": "El cargo es obligatorio"}, 400

    dni_existente = Empleado.query.filter_by(dni=dni).first()

    if dni_existente:
        return {"error": "El DNI ya existe"}, 400

    empleado = Empleado(
        nombre=nombre,
        apellido=apellido,
        dni=dni,
        email=email,
        cargo=cargo
    )

    db.session.add(empleado)
    db.session.commit()

    return empleado.to_dict(), 201


def actualizar_empleado(id, data):
    empleado = Empleado.query.get(id)

    if not empleado:
        return {"error": "Empleado no encontrado"}, 404

    nombre = data.get("nombre")
    apellido = data.get("apellido")
    dni = data.get("dni")
    email = data.get("email")
    cargo = data.get("cargo")

    if not nombre:
        return {"error": "El nombre es obligatorio"}, 400

    if not apellido:
        return {"error": "El apellido es obligatorio"}, 400

    if not dni:
        return {"error": "El DNI es obligatorio"}, 400

    if not email or "@" not in email:
        return {"error": "El email no es valido"}, 400

    if not cargo:
        return {"error": "El cargo es obligatorio"}, 400

    empleado.nombre = nombre
    empleado.apellido = apellido
    empleado.dni = dni
    empleado.email = email
    empleado.cargo = cargo

    db.session.commit()

    return empleado.to_dict(), 200


def eliminar_empleado(id):
    empleado = Empleado.query.get(id)

    if not empleado:
        return {"error": "Empleado no encontrado"}, 404

    db.session.delete(empleado)
    db.session.commit()

    return {"mensaje": "Empleado eliminado correctamente"}, 200