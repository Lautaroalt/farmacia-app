from flask import Blueprint, request, jsonify

from controllers.medicamento_controller import (
    listar_medicamentos,
    obtener_medicamento,
    crear_medicamento,
    actualizar_medicamento,
    eliminar_medicamento
)

medicamento_bp = Blueprint("medicamentos", __name__)


@medicamento_bp.route("/api/medicamentos", methods=["GET"])
def get_medicamentos():
    return jsonify(listar_medicamentos())


@medicamento_bp.route("/api/medicamentos/<int:id>", methods=["GET"])
def get_medicamento(id):
    medicamento = obtener_medicamento(id)

    if not medicamento:
        return jsonify({"error": "Medicamento no encontrado"}), 404

    return jsonify(medicamento)


@medicamento_bp.route("/api/medicamentos", methods=["POST"])
def post_medicamento():
    data = request.get_json()
    respuesta, status = crear_medicamento(data)
    return jsonify(respuesta), status


@medicamento_bp.route("/api/medicamentos/<int:id>", methods=["PUT"])
def put_medicamento(id):
    data = request.get_json()
    respuesta, status = actualizar_medicamento(id, data)
    return jsonify(respuesta), status


@medicamento_bp.route("/api/medicamentos/<int:id>", methods=["DELETE"])
def delete_medicamento(id):
    respuesta, status = eliminar_medicamento(id)
    return jsonify(respuesta), status