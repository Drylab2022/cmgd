import React, { Component } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./ProjectPage.css"

const StyledTableCell = styled(TableCell)(({ theme })=>({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.common.black,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.common.white,
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
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="new">
                <h4 className='project'>ProjectID  { this.props.match.params.projectId }</h4>

                <button type="submit" value="Initialize" className="projectbtn">
                    <span>Reset</span>
                </button>
                <button type="submit" value="Initialize" className="projectbtn">
                    <span>Download</span>
                </button>
                <button type="submit" value="Initialize" className="projectbtn">
                    <span>Upload</span>
                </button>
                
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Sample ID</StyledTableCell>
                                <StyledTableCell align="right">Number of Reads</StyledTableCell>
                                <StyledTableCell align="right">avgReadLength</StyledTableCell>
                                <StyledTableCell align="right">ncbiAccession</StyledTableCell>
                                <StyledTableCell align="right">sequencingPlatform</StyledTableCell>
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
                    <button type="submit" value="Initialize" className="checkbtn">
                        <span>Check</span>
                    </button>

                    <hr />
                    <h4>Check Project: </h4>
                </div>
            </div>
        );
    }
}
export default ProjectPage