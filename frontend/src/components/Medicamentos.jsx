import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarMedicamentos = () => {
    fetch("http://127.0.0.1:5000/api/medicamentos")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setMedicamentos(data);
      });
  };

  const cargarCategorias = () => {
    fetch("http://127.0.0.1:5000/api/categorias")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setCategorias(data);
      });
  };

  useEffect(() => {
    cargarMedicamentos();
    cargarCategorias();
  }, []);

  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setStock("");
    setFechaVencimiento("");
    setCategoriaId("");
    setEditandoId(null);
  };

  const guardarMedicamento = () => {
    if (
      nombre === "" ||
      precio === "" ||
      stock === "" ||
      fechaVencimiento === "" ||
      categoriaId === ""
    ) {
      setMensaje("Complete todos los campos");
      return;
    }

    const datos = {
      nombre: nombre,
      precio: Number(precio),
      stock: Number(stock),
      fecha_vencimiento: fechaVencimiento,
      categoria_id: Number(categoriaId)
    };

    if (editandoId === null) {
      fetch("http://127.0.0.1:5000/api/medicamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      })
        .then((respuesta) => respuesta.json())
        .then((data) => {
          if (data.error) {
            setMensaje(data.error);
          } else {
            setMensaje("Medicamento agregado correctamente");
            limpiarFormulario();
            cargarMedicamentos();
          }
        });
    } else {
      fetch(`http://127.0.0.1:5000/api/medicamentos/${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      })
        .then((respuesta) => respuesta.json())
        .then((data) => {
          if (data.error) {
            setMensaje(data.error);
          } else {
            setMensaje("Medicamento actualizado correctamente");
            limpiarFormulario();
            cargarMedicamentos();
          }
        });
    }
  };

  const editarMedicamento = (medicamento) => {
    setNombre(medicamento.nombre);
    setPrecio(medicamento.precio);
    setStock(medicamento.stock);
    setFechaVencimiento(medicamento.fecha_vencimiento);
    setCategoriaId(medicamento.categoria_id);
    setEditandoId(medicamento.id);
    setMensaje("");
  };

  const eliminarMedicamento = (id) => {
    fetch(`http://127.0.0.1:5000/api/medicamentos/${id}`, {
      method: "DELETE"
    })
      .then((respuesta) => respuesta.json())
      .then(() => {
        setMensaje("Medicamento eliminado correctamente");
        cargarMedicamentos();
      });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Medicamentos
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          mb: 2
        }}
      >
        <TextField
          label="Nombre"
          size="small"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          sx={{ backgroundColor: "white" }}
        />

        <TextField
          label="Precio"
          type="number"
          size="small"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          sx={{ backgroundColor: "white" }}
        />

        <TextField
          label="Stock"
          type="number"
          size="small"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          sx={{ backgroundColor: "white" }}
        />

        <TextField
          type="date"
          size="small"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
          sx={{ backgroundColor: "white" }}
        />

        <TextField
          select
          label="Categoría"
          size="small"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          sx={{
            backgroundColor: "white",
            minWidth: 180
          }}
        >
          {categorias.map((categoria) => (
            <MenuItem
              key={categoria.id}
              value={categoria.id}
            >
              {categoria.nombre}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={guardarMedicamento}
        >
          {editandoId === null ? "Agregar" : "Guardar"}
        </Button>

        {editandoId !== null && (
          <Button
            variant="outlined"
            onClick={limpiarFormulario}
          >
            Cancelar
          </Button>
        )}
      </Box>

      {mensaje && (
        <Typography sx={{ mb: 2 }}>
          {mensaje}
        </Typography>
      )}

      {medicamentos.map((medicamento) => (
        <Box
          key={medicamento.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
            padding: 1
          }}
        >
          <Box>
            <Typography>
              {medicamento.nombre}
            </Typography>

            <Typography variant="body2">
              Categoría: {medicamento.categoria}
              {" | "}
              Precio: ${medicamento.precio}
              {" | "}
              Stock: {medicamento.stock}
              {" | "}
              Vence: {medicamento.fecha_vencimiento}
            </Typography>
          </Box>

          <Box>
            <Button
              onClick={() => editarMedicamento(medicamento)}
            >
              Editar
            </Button>

            <Button
              color="error"
              onClick={() => eliminarMedicamento(medicamento.id)}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Medicamentos;