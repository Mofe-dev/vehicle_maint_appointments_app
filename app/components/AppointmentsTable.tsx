import {
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
              <TableCell>Placa</TableCell>
              <TableCell align="right">Fecha reserva</TableCell>
              <TableCell align="right">Estado de la reserva</TableCell>
              <TableCell align="right">Hora</TableCell>
              <TableCell align="right">Estado</TableCell>
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
                <TableCell align="right">{row.BookingDate}</TableCell>
                <TableCell align="right">{row.BookingStatus}</TableCell>

                <TableCell align="right">{row.Hour}</TableCell>
                <TableCell align="right">
                  {row.Status ? "Activo" : "Inactivo"}
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
