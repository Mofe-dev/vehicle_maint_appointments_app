import {
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";

interface TableProps {
  appointments: Appointments[];
}

const AppointmentsTable: FC<TableProps> = ({ appointments }) => {
  return (
    <>
      <Divider sx={{ m: 3 }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Placa</b>
              </TableCell>
              <TableCell align="center">
                <b>Fecha reserva</b>
              </TableCell>
              <TableCell align="center">
                <b>Estado de la reserva</b>
              </TableCell>
              <TableCell align="center">
                <b>Hora</b>
              </TableCell>
              <TableCell align="center">
                <b>Estado</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row) => (
              <TableRow
                key={row.BookingId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.PlateNumber}
                </TableCell>
                <TableCell align="center">{row.BookingDate}</TableCell>
                <TableCell align="center">{row.BookingStatus}</TableCell>

                <TableCell align="center">{row.Hour}</TableCell>
                <TableCell align="center">
                  {row.Status ? (
                    <Chip label="Activo" color="success" />
                  ) : (
                    <Chip label="Inactivo" color="error" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AppointmentsTable;
