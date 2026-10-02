import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const cargarCategorias = () => {
    fetch("http://127.0.0.1:5000/api/categorias")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setCategorias(data);
      })
      .catch(() => {
        setMensaje("Error al cargar categorias");
      });
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const guardarCategoria = () => {
    if (nombre.trim() === "") {
      setMensaje("Ingrese un nombre");
      return;
    }

    if (editandoId === null) {
      fetch("http://127.0.0.1:5000/api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nombre
        })
      })
        .then((respuesta) => respuesta.json())
        .then((data) => {
          if (data.error) {
            setMensaje(data.error);
          } else {
            setMensaje("Categoria agregada correctamente");
            setNombre("");
            cargarCategorias();
          }
        })
        .catch(() => {
          setMensaje("Error al agregar categoria");
        });
    } else {
      fetch(`http://127.0.0.1:5000/api/categorias/${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nombre
        })
      })
        .then((respuesta) => respuesta.json())
        .then((data) => {
          if (data.error) {
            setMensaje(data.error);
          } else {
            setMensaje("Categoria actualizada correctamente");
            setNombre("");
            setEditandoId(null);
            cargarCategorias();
          }
        })
        .catch(() => {
          setMensaje("Error al actualizar categoria");
        });
    }
  };

  const editarCategoria = (categoria) => {
    setNombre(categoria.nombre);
    setEditandoId(categoria.id);
    setMensaje("");
  };

  const eliminarCategoria = (id) => {
    fetch(`http://127.0.0.1:5000/api/categorias/${id}`, {
      method: "DELETE"
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        if (data.error) {
          setMensaje(data.error);
        } else {
          setMensaje("Categoria eliminada correctamente");
          cargarCategorias();
        }
      })
      .catch(() => {
        setMensaje("Error al eliminar categoria");
      });
  };

  const cancelarEdicion = () => {
    setNombre("");
    setEditandoId(null);
    setMensaje("");
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Categorías
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 2,
          alignItems: "center"
        }}
      >
        <TextField
          label="Nombre"
          size="small"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: 1
          }}
        />

        <Button
          variant="contained"
          onClick={guardarCategoria}
        >
          {editandoId === null ? "Agregar" : "Guardar"}
        </Button>

        {editandoId !== null && (
          <Button
            variant="outlined"
            onClick={cancelarEdicion}
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

      {categorias.map((categoria) => (
        <Box
          key={categoria.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #ccc",
            padding: 1
          }}
        >
          <Typography>
            {categoria.nombre}
          </Typography>

          <Box>
            <Button
              onClick={() => editarCategoria(categoria)}
            >
              Editar
            </Button>

            <Button
              color="error"
              onClick={() => eliminarCategoria(categoria.id)}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Categorias;