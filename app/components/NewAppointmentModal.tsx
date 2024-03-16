"use client";

import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { useFormik } from "formik";
import React, { FC } from "react";
import * as Yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { dateFormat, hourFormat } from "../utils/formats";
import { enqueueSnackbar } from "notistack";
import { API_URL } from "../utils/const";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  closeModal: any;
}

const NewAppointmentModal: FC<ModalProps> = ({ open, closeModal }) => {
  const formik = useFormik({
    initialValues: {
      plateNumber: "",
      hour: "",
      date: "",
    },
    validationSchema: Yup.object().shape({
      plateNumber: Yup.string().required("El # de placa es requerido"),
      hour: Yup.string().required("Hora es requerida"),
      date: Yup.string().required("Fecha es requerida"),
    }),
    onSubmit: async (values) => {
      console.log("values: ", values);
      const payload = {
        PlateNumber: values.plateNumber,
        BookingDate: values.date,
        Hour: values.hour,
      };
      // Gurdarmos la reserva
      await fetch(`${API_URL}/Booking/SaveBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((response) => {
        if (response.status === 200) {
          closeModal();
        }
      });
    },
  });

  const handleClose = (event: object, reason: string) => {
    console.log(reason);
  };

  const handleDateChange = (event: any) =>
    formik.setFieldValue("date", dateFormat(event.$d));

  const handleChangeHour = (event: any) =>
    formik.setFieldValue("hour", hourFormat(event.$d));

  return (
    <Modal
      disableEscapeKeyDown={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography gutterBottom variant="h4" component="div">
          Registrar cita
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ingrese la informacion solicitada para agendar su nueva citas
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container gap={2} mt={2} mb={5}>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                Numero de la placa
              </Typography>
              <TextField
                {...formik.getFieldProps("plateNumber")}
                id="outlined-basic"
                label="#"
                variant="outlined"
              />
              {formik.errors.plateNumber ? (
                <Box mt={1} sx={{ color: "red", marginLeft: 1, fontSize: 14 }}>
                  {formik.errors.plateNumber}
                </Box>
              ) : null}
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography gutterBottom variant="h6" component="div">
                  Fecha de la reserva
                </Typography>
                <DatePicker onChange={handleDateChange} format="DD/MM/YYYY" />
                {formik.errors.date ? (
                  <Box
                    mt={1}
                    sx={{ color: "red", marginLeft: 1, fontSize: 14 }}
                  >
                    {formik.errors.date}
                  </Box>
                ) : null}
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography gutterBottom variant="h6" component="div">
                  Hora de atencion
                </Typography>
                <TimePicker
                  onChange={handleChangeHour}
                  timeSteps={{ minutes: 30 }}
                />
                {formik.errors.hour ? (
                  <Box
                    mt={1}
                    sx={{ color: "red", marginLeft: 1, fontSize: 14 }}
                  >
                    {formik.errors.hour}
                  </Box>
                ) : null}
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container gap={2} justifyContent="end">
            <Grid item>
              <Button
                color="secondary"
                type="button"
                variant="contained"
                onClick={closeModal}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default NewAppointmentModal;
