import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarEmpleados = () => {
    fetch("http://127.0.0.1:5000/api/empleados")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setEmpleados(data);
      });
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setDni("");
    setEmail("");
    setCargo("");
    setEditandoId(null);
  };

  const guardarEmpleado = () => {
    if (
      nombre === "" ||
      apellido === "" ||
      dni === "" ||
      email === "" ||
      cargo === ""
    ) {
      setMensaje("Complete todos los campos");
      return;
    }

    const datos = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      email: email,
      cargo: cargo
    };

    if (editandoId === null) {
      fetch("http://127.0.0.1:5000/api/empleados", {
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
            setMensaje("Empleado agregado correctamente");
            limpiarFormulario();
            cargarEmpleados();
          }
        });
    } else {
      fetch(`http://127.0.0.1:5000/api/empleados/${editandoId}`, {
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
            setMensaje("Empleado actualizado correctamente");
            limpiarFormulario();
            cargarEmpleados();
          }
        });
    }
  };

  const editarEmpleado = (empleado) => {
    setNombre(empleado.nombre);
    setApellido(empleado.apellido);
    setDni(empleado.dni);
    setEmail(empleado.email);
    setCargo(empleado.cargo);
    setEditandoId(empleado.id);
    setMensaje("");
  };

  const eliminarEmpleado = (id) => {
    fetch(`http://127.0.0.1:5000/api/empleados/${id}`, {
      method: "DELETE"
    })
      .then((respuesta) => respuesta.json())
      .then(() => {
        setMensaje("Empleado eliminado correctamente");
        cargarEmpleados();
      });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Empleados
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
          label="Apellido"
          size="small"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          sx={{ backgroundColor: "white" }}
        />

        <TextField
          label="DNI"
          size="small"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          sx={{ backgroundColor: "white" }}
        />

        <TextField
          label="Email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ backgroundColor: "white" }}
        />

        <TextField
          label="Cargo"
          size="small"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          sx={{ backgroundColor: "white" }}
        />

        <Button
          variant="contained"
          onClick={guardarEmpleado}
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

      {empleados.map((empleado) => (
        <Box
          key={empleado.id}
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
              {empleado.nombre} {empleado.apellido}
            </Typography>

            <Typography variant="body2">
              DNI: {empleado.dni}
              {" | "}
              Email: {empleado.email}
              {" | "}
              Cargo: {empleado.cargo}
            </Typography>
          </Box>

          <Box>
            <Button
              onClick={() => editarEmpleado(empleado)}
            >
              Editar
            </Button>

            <Button
              color="error"
              onClick={() => eliminarEmpleado(empleado.id)}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Empleados;