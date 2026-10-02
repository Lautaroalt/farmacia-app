from flask import Blueprint, jsonify

from models.medicamento import Medicamento
from models.categoria import Categoria
from models.empleado import Empleado


dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/api/dashboard", methods=["GET"])
def get_dashboard():
    return jsonify({
        "medicamentos": Medicamento.query.count(),
        "categorias": Categoria.query.count(),
        "empleados": Empleado.query.count()
    })