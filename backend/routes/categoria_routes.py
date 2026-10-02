from flask import Blueprint, request, jsonify
from controllers.categoria_controller import (
    listar_categorias,
    obtener_categoria,
    crear_categoria,
    actualizar_categoria,
    eliminar_categoria
)

categoria_bp = Blueprint("categorias", __name__)

@categoria_bp.route("/api/categorias", methods=["GET"])
def get_categorias():
    return jsonify(listar_categorias())

@categoria_bp.route("/api/categorias/<int:id>", methods=["GET"])
def get_categoria(id):
    categoria = obtener_categoria(id)

    if not categoria:
        return jsonify({"error": "Categoría no encontrada"}), 404

    return jsonify(categoria)

@categoria_bp.route("/api/categorias", methods=["POST"])
def post_categoria():
    data = request.get_json()
    respuesta, status = crear_categoria(data)
    return jsonify(respuesta), status

@categoria_bp.route("/api/categorias/<int:id>", methods=["PUT"])
def put_categoria(id):
    data = request.get_json()
    respuesta, status = actualizar_categoria(id, data)
    return jsonify(respuesta), status

@categoria_bp.route("/api/categorias/<int:id>", methods=["DELETE"])
def delete_categoria(id):
    respuesta, status = eliminar_categoria(id)
    return jsonify(respuesta), status