from flask import Blueprint, request, jsonify

from controllers.empleado_controller import (
    listar_empleados,
    obtener_empleado,
    crear_empleado,
    actualizar_empleado,
    eliminar_empleado
)

empleado_bp = Blueprint("empleados", __name__)


@empleado_bp.route("/api/empleados", methods=["GET"])
def get_empleados():
    return jsonify(listar_empleados())


@empleado_bp.route("/api/empleados/<int:id>", methods=["GET"])
def get_empleado(id):
    empleado = obtener_empleado(id)

    if not empleado:
        return jsonify({"error": "Empleado no encontrado"}), 404

    return jsonify(empleado)


@empleado_bp.route("/api/empleados", methods=["POST"])
def post_empleado():
    data = request.get_json()
    respuesta, status = crear_empleado(data)
    return jsonify(respuesta), status


@empleado_bp.route("/api/empleados/<int:id>", methods=["PUT"])
def put_empleado(id):
    data = request.get_json()
    respuesta, status = actualizar_empleado(id, data)
    return jsonify(respuesta), status


@empleado_bp.route("/api/empleados/<int:id>", methods=["DELETE"])
def delete_empleado(id):
    respuesta, status = eliminar_empleado(id)
    return jsonify(respuesta), status