import './Table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const rows = [
  {
    id:1,
    product: 'T Shirt',
    img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/divhtybtltxjtyhhq2i5/sportswear-club-mens-t-shirt-ShrJfX.png',
    customer: 'Mike Doe',
    date: '1 March',
    amount: 900,
    method: "Online Payment",
    status: "Shipped"
  },
  {
    id:2,
    product: 'T Shirt Alternate',
    img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/divhtybtltxjtyhhq2i5/sportswear-club-mens-t-shirt-ShrJfX.png',
    customer: 'Joe Schmoe',
    date: '3 March',
    amount: 70,
    method: "Online Payment",
    status: "Not Shipped"
  },
]


const TableComponent = () => {
  return (
    <div className="table">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='left'>product</TableCell>
            <TableCell align='left'>img</TableCell>
            <TableCell align='left'>customer</TableCell>
            <TableCell align='left'>date</TableCell>
            <TableCell align='left'>amount</TableCell>
            <TableCell align='left'>method</TableCell>
            <TableCell align='left'>status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.product}</TableCell>
              <TableCell align="left">
                  <img style={{width: '50px', height: '50px', borderRadius: '50%'}} src={row.img} alt="img not found"/>
              </TableCell>
              <TableCell align="left">{row.customer}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.amount}</TableCell>
              <TableCell align="left">{row.method}</TableCell>
              <TableCell  align="left">{row.status}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default TableComponent
