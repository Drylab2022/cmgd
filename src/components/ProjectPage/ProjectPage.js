import React, { Component } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme })=>({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, project, samples, status, date) {
    return { id, project, samples, status, date };
  }

const rows = [
  createData('SRP11101', 159, 80, 'In Progress', '12/07/2021'),
  createData('SRP23455', 237, 90, 'Under Review', '11/07/2020'),
  createData('SRP78911', 262, 160, 'Approved', '02/07/2021'),
  createData('SRP78999', 305, 37, 'Approved', '02/03/2021'),
  createData('SRP66666', 356, 160, 'In Progress', '07/07/2021'),
];
class ProjectPage extends Component {

    render() {
        return (
            <div className="new">
                <h4>Project SRP11101</h4>
                
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Project ID</StyledTableCell>
                                <StyledTableCell align="right">Project</StyledTableCell>
                                <StyledTableCell align="right">Number of Samples</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Created Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row)=>(
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component='th' scope='row'>
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.project}</StyledTableCell>
                                    <StyledTableCell align="right">{row.samples}</StyledTableCell>
                                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                                    <StyledTableCell align="right">{row.date}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div>
                    <hr />
                    <h4>Check Project: </h4>
                </div>
            </div>
        );
    }
}
export default ProjectPage