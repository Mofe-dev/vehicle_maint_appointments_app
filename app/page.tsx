"use client";
import * as Yup from "yup";
import { useFormik } from "formik";

import styles from "./page.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container, Grid, TextField } from "@mui/material";
import { useState } from "react";
import AppointmentsTable from "./components/AppointmentsTable";
import { API_URL } from "./utils/const";
import NewAppointmentModal from "./components/NewAppointmentModal";
import { enqueueSnackbar } from "notistack";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

export default function Home() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);

  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      plateNumber: "",
    },
    validationSchema: Yup.object().shape({
      plateNumber: Yup.string().required("El # de placa es requerido"),
    }),
    onSubmit: async (values) => {
      console.log("PlateNumber: ", values.plateNumber);

      searchAppointments(values.plateNumber);
    },
  });

  const searchAppointments = async (plateNumber: string) => {
    setNotFound(false);

    await fetch(`${API_URL}/Booking/GetBookings?PlateNumber=${plateNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then(({ Data }: any) => {
        console.log(Data);
        if (Data && Data.length > 0) setAppointments([...Data]);
        else {
          setAppointments([]);
          enqueueSnackbar("No existen registros para este # de placa", {
            variant: "info",
          });
          setNotFound(true);
        }
      });
  };

  const handleNewAppointments = () => {
    setOpen(!open);
  };

  return (
    <main className={styles.main}>
      <Container>
        <Container
          sx={{
            paddingY: 5,
            paddingX: 10,
            border: 1,
            borderColor: "#0101",
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <Grid container justifyContent="center" alignItems="center" mb={5}>
            <Grid item>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                textAlign="center"
              >
                Aplicación de reserva de citas para mantenimiento de autos
              </Typography>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                onClick={handleNewAppointments}
                startIcon={<AddCircleOutlinedIcon />}
              >
                Agendar nueva cita
              </Button>
            </Grid>
          </Grid>

          <Card
            sx={{
              border: 1,
              borderColor: "#0101",
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Buscador de citas
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Ingrese la información solicitada para ver información de sus
                citas
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container mt={2}>
                  <Grid item>
                    <Typography gutterBottom variant="h6" component="div">
                      Número de la placa <b style={{ color: "red" }}>*</b>
                    </Typography>
                    <TextField
                      {...formik.getFieldProps("plateNumber")}
                      id="outlined-basic"
                      label="#"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Grid container justifyContent="flex-end" alignItems="center">
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formik.values.plateNumber}
                      startIcon={<SearchOutlinedIcon />}
                    >
                      Buscar cita
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
          {open && (
            <NewAppointmentModal
              open={open}
              closeModal={handleNewAppointments}
            />
          )}

          {appointments && appointments.length > 0 && (
            <AppointmentsTable appointments={appointments} />
          )}
          {notFound && (
            <Box textAlign="center" mt={5} sx={{ color: "red" }}>
              <b>No se encontraron registros</b>
            </Box>
          )}
        </Container>
      </Container>
    </main>
  );
}
