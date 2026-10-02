from flask import Flask
from flask_cors import CORS

from extensions import db


def create_app():
    app = Flask(__name__)

    app.config.from_object("config.Config")

    db.init_app(app)
    CORS(app)

    from routes.categoria_routes import categoria_bp
    from routes.medicamento_routes import medicamento_bp
    from routes.empleado_routes import empleado_bp
    from routes.dashboard_routes import dashboard_bp

    app.register_blueprint(categoria_bp)
    app.register_blueprint(medicamento_bp)
    app.register_blueprint(empleado_bp)
    app.register_blueprint(dashboard_bp)

    @app.route("/")
    def inicio():
        return {
            "mensaje": "API Farmacia funcionando"
        }

    with app.app_context():
        from models.categoria import Categoria
        from models.medicamento import Medicamento
        from models.empleado import Empleado

        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)