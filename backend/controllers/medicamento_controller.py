from datetime import datetime

from extensions import db
from models.medicamento import Medicamento
from models.categoria import Categoria


def listar_medicamentos():
    medicamentos = Medicamento.query.all()
    return [medicamento.to_dict() for medicamento in medicamentos]


def obtener_medicamento(id):
    medicamento = Medicamento.query.get(id)

    if not medicamento:
        return None

    return medicamento.to_dict()


def crear_medicamento(data):
    nombre = data.get("nombre")
    precio = data.get("precio")
    stock = data.get("stock")
    fecha_vencimiento = data.get("fecha_vencimiento")
    categoria_id = data.get("categoria_id")

    if not nombre:
        return {"error": "El nombre es obligatorio"}, 400

    if precio is None or precio <= 0:
        return {"error": "El precio debe ser mayor a 0"}, 400

    if stock is None or stock < 0:
        return {"error": "El stock no puede ser negativo"}, 400

    if not categoria_id:
        return {"error": "La categoria es obligatoria"}, 400

    categoria = Categoria.query.get(categoria_id)

    if not categoria:
        return {"error": "La categoria no existe"}, 400

    try:
        fecha = datetime.strptime(
            fecha_vencimiento,
            "%Y-%m-%d"
        ).date()
    except (ValueError, TypeError):
        return {"error": "La fecha de vencimiento no es valida"}, 400

    medicamento = Medicamento(
        nombre=nombre,
        precio=precio,
        stock=stock,
        fecha_vencimiento=fecha,
        categoria_id=categoria_id
    )

    db.session.add(medicamento)
    db.session.commit()

    return medicamento.to_dict(), 201


def actualizar_medicamento(id, data):
    medicamento = Medicamento.query.get(id)

    if not medicamento:
        return {"error": "Medicamento no encontrado"}, 404

    nombre = data.get("nombre")
    precio = data.get("precio")
    stock = data.get("stock")
    fecha_vencimiento = data.get("fecha_vencimiento")
    categoria_id = data.get("categoria_id")

    if not nombre:
        return {"error": "El nombre es obligatorio"}, 400

    if precio is None or precio <= 0:
        return {"error": "El precio debe ser mayor a 0"}, 400

    if stock is None or stock < 0:
        return {"error": "El stock no puede ser negativo"}, 400

    categoria = Categoria.query.get(categoria_id)

    if not categoria:
        return {"error": "La categoria no existe"}, 400

    try:
        fecha = datetime.strptime(
            fecha_vencimiento,
            "%Y-%m-%d"
        ).date()
    except (ValueError, TypeError):
        return {"error": "La fecha de vencimiento no es valida"}, 400

    medicamento.nombre = nombre
    medicamento.precio = precio
    medicamento.stock = stock
    medicamento.fecha_vencimiento = fecha
    medicamento.categoria_id = categoria_id

    db.session.commit()

    return medicamento.to_dict(), 200


def eliminar_medicamento(id):
    medicamento = Medicamento.query.get(id)

    if not medicamento:
        return {"error": "Medicamento no encontrado"}, 404

    db.session.delete(medicamento)
    db.session.commit()

    return {"mensaje": "Medicamento eliminado correctamente"}, 200