import React, { Component } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

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

class WorkingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.projects !== prevProps.projects) {
            this.setState({ projects: this.props.projects });
        }
    }

    render() {
        return (
            <div className="newWorking">
                <h4>Current working project: </h4>
                <hr />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Project ID</StyledTableCell>
                                <StyledTableCell align="center">Number of Samples</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Created Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.projects.map((project)=>(
                                <StyledTableRow key={project.id}>
                                    <StyledTableCell component='th' scope='row' > 
                                    <Link to={'/projects/: '+ project.projectId}>
                                        {project.projectId}
                                    </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{project.numberOfSamples}</StyledTableCell>
                                    <StyledTableCell align="center">{project.status}</StyledTableCell>
                                    <StyledTableCell align="center">{new Date(project.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' })}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
export default WorkingPage