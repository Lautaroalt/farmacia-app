import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Toolbar,
  Typography
} from "@mui/material";

import Categorias from "./components/Categorias";
import Medicamentos from "./components/Medicamentos";
import Empleados from "./components/Empleados";

function App() {
  const [vista, setVista] = useState("dashboard");

  const [datos, setDatos] = useState({
    medicamentos: 0,
    categorias: 0,
    empleados: 0
  });

  const cargarDashboard = () => {
    fetch("http://127.0.0.1:5000/api/dashboard")
      .then((respuesta) => respuesta.json())
      .then((data) => setDatos(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    cargarDashboard();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Sistema de Farmacia
          </Typography>

          <Button
            color="inherit"
            onClick={() => {
              setVista("dashboard");
              cargarDashboard();
            }}
          >
            Dashboard
          </Button>

          <Button
            color="inherit"
            onClick={() => setVista("categorias")}
          >
            Categorías
          </Button>

          <Button
            color="inherit"
            onClick={() => setVista("medicamentos")}
          >
            Medicamentos
          </Button>

          <Button
            color="inherit"
            onClick={() => setVista("empleados")}
          >
            Empleados
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {vista === "dashboard" && (
          <>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap"
              }}
            >
              <Card sx={{ width: 250 }}>
                <CardContent>
                  <Typography variant="h6">
                    Medicamentos
                  </Typography>

                  <Typography variant="h3">
                    {datos.medicamentos}
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ width: 250 }}>
                <CardContent>
                  <Typography variant="h6">
                    Categorías
                  </Typography>

                  <Typography variant="h3">
                    {datos.categorias}
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ width: 250 }}>
                <CardContent>
                  <Typography variant="h6">
                    Empleados
                  </Typography>

                  <Typography variant="h3">
                    {datos.empleados}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {vista === "categorias" && <Categorias />}

        {vista === "medicamentos" && <Medicamentos />}

        {vista === "empleados" && <Empleados />}
      </Container>
    </>
  );
}

export default App;