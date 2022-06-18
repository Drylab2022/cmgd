import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

class WorkingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };
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
                            <TableRow
                                style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                                }}
                            >
                                <TableCell>Project ID</TableCell>
                                <TableCell align="center">
                                    Number of Samples
                                </TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">
                                    Created Date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell component="th" scope="row">
                                        <Link to={"/project/" + project.id}>
                                            {project.projectId}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        {project.numberOfSamples}
                                    </TableCell>
                                    <TableCell align="center">
                                        {project.status}
                                    </TableCell>
                                    <TableCell align="center">
                                        {new Date(
                                            project.createdAt
                                        ).toLocaleString("en-US", {
                                            timeZone: "America/New_York",
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
export default WorkingPage;
