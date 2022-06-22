import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import { getCurrentPage, getRowNumberPerPage } from "../../actions";

class TableCombination extends React.Component {
    generateTableHead = () => {
        return Object.keys(this.props.showColumns).map((index) => {
            return (
                <TableCell align="center" key={index}>
                    {this.props.showColumns[index]}
                </TableCell>
            );
        });
    };

    generateTableBody = () => {
        const currData = this.props.currentData;
        return Object.keys(currData).map((index) => {
            return (
                <TableRow key={currData[index].id}>
                    {Object.keys(this.props.showColumns).map((indexInShow) => {
                        const nameInShow = this.props.showColumns[indexInShow];
                        return (
                            <TableCell
                                align="center"
                                key={currData[index].id + indexInShow}
                            >
                                {currData[index]["curation"][nameInShow]}
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        });
    };

    render() {
        const CustomTablePagination = styled(TablePagination)`
            & .css-pdct74-MuiTablePagination-selectLabel {
                margin-top: auto;
            }
            & .css-levciy-MuiTablePagination-displayedRows {
                margin-top: auto;
            }
        `;

        return (
            <div>
                <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 500 }}
                        aria-label="custom pagination table"
                    >
                        <TableHead>
                            <TableRow
                                style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                                }}
                            >
                                {this.generateTableHead()}
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.generateTableBody()}</TableBody>
                        <TableFooter>
                            <TableRow>
                                <CustomTablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    count={this.props.dataNumber}
                                    rowsPerPage={this.props.rowsPerPage}
                                    page={this.props.currentPage}
                                    onPageChange={(event, newPage) => {
                                        this.props.getCurrentPage(newPage);
                                    }}
                                    onRowsPerPageChange={(event) => {
                                        this.props.getRowNumberPerPage(
                                            event.target.value
                                        );
                                    }}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentData: state.table,
        showColumns: state.show,
        currentPage: state.page,
        dataNumber: state.allrow,
        rowsPerPage: state.row,
    };
};

export default connect(mapStateToProps, {
    getCurrentPage,
    getRowNumberPerPage,
})(TableCombination);
