USE farmacia_db;

SET SQL_SAFE_UPDATES = 0;

-- Limpiar datos anteriores
DELETE FROM medicamentos;
DELETE FROM empleados;
DELETE FROM categorias;

-- Reiniciar IDs
ALTER TABLE medicamentos AUTO_INCREMENT = 1;
ALTER TABLE empleados AUTO_INCREMENT = 1;
ALTER TABLE categorias AUTO_INCREMENT = 1;

-- =========================
-- CATEGORIAS
-- =========================

INSERT INTO categorias (nombre) VALUES
('Analgesicos'),
('Antibioticos'),
('Antialergicos'),
('Vitaminas'),
('Digestivos');

-- =========================
-- MEDICAMENTOS
-- =========================

INSERT INTO medicamentos
(nombre, precio, stock, fecha_vencimiento, categoria_id)
VALUES
('Ibuprofeno 600mg', 4200, 25, '2028-06-30', 1),
('Paracetamol 500mg', 2800, 30, '2027-10-10', 1),
('Diclofenac 50mg', 3500, 18, '2027-12-15', 1),
('Amoxicilina 500mg', 6500, 20, '2027-08-20', 2),
('Azitromicina 500mg', 7800, 12, '2028-01-15', 2),
('Loratadina 10mg', 3100, 22, '2027-11-30', 3),
('Cetirizina 10mg', 3300, 15, '2028-03-12', 3),
('Vitamina C', 2500, 40, '2028-09-01', 4),
('Complejo B', 3900, 16, '2028-05-20', 4),
('Omeprazol 20mg', 4500, 28, '2028-02-25', 5);

-- =========================
-- EMPLEADOS
-- =========================

INSERT INTO empleados
(nombre, apellido, dni, email, cargo)
VALUES
('Lautaro', 'Altamirano', '42243511', 'lautaro@farmacia.com', 'Vendedor'),
('Juan', 'Perez', '40111222', 'juan@farmacia.com', 'Vendedor'),
('Maria', 'Gomez', '39555111', 'maria@farmacia.com', 'Farmaceutica'),
('Lucia', 'Fernandez', '41333222', 'lucia@farmacia.com', 'Cajera'),
('Martin', 'Lopez', '38777888', 'martin@farmacia.com', 'Encargado');

SET SQL_SAFE_UPDATES = 1;

-- =========================
-- VERIFICACION
-- =========================

SELECT * FROM categorias;
SELECT * FROM medicamentos;
SELECT * FROM empleados;