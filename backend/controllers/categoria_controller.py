from extensions import db
from models.categoria import Categoria

def listar_categorias():
    categorias = Categoria.query.all()
    return [categoria.to_dict() for categoria in categorias]

def obtener_categoria(id):
    categoria = Categoria.query.get(id)
    return categoria.to_dict() if categoria else None

def crear_categoria(data):
    nombre = data.get("nombre")

    if not nombre:
        return {"error": "El nombre es obligatorio"}, 400

    existente = Categoria.query.filter_by(nombre=nombre).first()

    if existente:
        return {"error": "La categoría ya existe"}, 400

    categoria = Categoria(nombre=nombre)

    db.session.add(categoria)
    db.session.commit()

    return categoria.to_dict(), 201

def actualizar_categoria(id, data):
    categoria = Categoria.query.get(id)

    if not categoria:
        return {"error": "Categoría no encontrada"}, 404

    nombre = data.get("nombre")

    if not nombre:
        return {"error": "El nombre es obligatorio"}, 400

    categoria.nombre = nombre

    db.session.commit()

    return categoria.to_dict(), 200

def eliminar_categoria(id):
    categoria = Categoria.query.get(id)

    if not categoria:
        return {"error": "Categoría no encontrada"}, 404

    db.session.delete(categoria)
    db.session.commit()

    return {"mensaje": "Categoría eliminada correctamente"}, 200