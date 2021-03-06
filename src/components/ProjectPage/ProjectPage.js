import React, { Component } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ProjectPage.css";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled } from "@mui/system";
import {
  translateToColumns,
  translateToCurationObject,
} from "../../CurationTranslator/CurationTranslator";

import * as Papa from "papaparse";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const CustomTablePagination = styled(TablePagination)`
  & .css-pdct74-MuiTablePagination-selectLabel {
    margin-top: auto;
  }
  & .css-levciy-MuiTablePagination-displayedRows {
    margin-top: auto;
  }
`;

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: [],
      projectId: "",
      projectPK: "",
      page: 0,
      rowsPerPage: 5,
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.goBack = this.goBack.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.downloadBlob = this.downloadBlob.bind(this);
  }

  handleChangePage(event, newPage) {
    this.setState({ page: newPage });
  }

  handleChangeRowsPerPage(event) {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  }

  componentDidMount() {
    const projectPK = this.props.match.params.id;
    const url = `http://localhost:5001/api/project/${projectPK}/samples`;

    axios
      .get(url)
      .then((res) => {
        this.setState({
          samples: res.data.samples,
          projectPK: res.data.id,
          projectId: res.data.projectId,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  goBack() {
    this.props.history.goBack();
  }

  uploadFile(event) {
    console.log("upload");
    Papa.parse(event.target.files[0], {
      worker: true, // Don't bog down the main thread if its a big file
      header: true,
      complete: function (results) {
        const samples = translateToCurationObject(results.data);

        samples.map((sample, file) => {
          axios.post("http://localhost:5001/api/samples", {
            sampleId: sample.sampleId,
            curation: sample.curation,
            ProjectId: this.state.projectPK,
          });
        });
        this.componentDidMount();
      }.bind(this),
    });
  }

  downloadFile(event) {
    console.log("download");
    const samples = translateToColumns(this.state.samples);

    const csv = Papa.unparse(samples);
    const blob = new Blob([csv]);
    this.downloadBlob(blob, `${this.state.projectId}.csv`);
  }

  downloadBlob(blob, name) {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // Remove link from body
    document.body.removeChild(link);
  }

  render() {
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - this.state.samples.length)
        : 0;
    return (
      <div className="new">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <h4 className="project">
          ProjectID: {this.props.match.params.projectId}
        </h4>

        <button type="submit" value="Initialize" className="projectbtn">
          <span>Reset</span>
        </button>

        <button
          type="submit"
          className="projectbtn"
          onClick={this.downloadFile}
        >
          <span>Download</span>
        </button>

        <label className="projectbtn">
          <input type="file" accept={".csv"} onChange={this.uploadFile} />
          Upload
        </label>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                <TableCell>Sample ID</TableCell>
                <TableCell align="right">Number of Reads</TableCell>
                <TableCell align="right">avgReadLength</TableCell>
                <TableCell align="right">ncbiAccession</TableCell>
                <TableCell align="right">sequencingPlatform</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? this.state.samples.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : this.state.samples
              ).map((sample) => (
                <TableRow key={sample.id}>
                  <TableCell component="th" scope="row">
                    {sample.sampleId}
                  </TableCell>
                  <TableCell align="right">{sample.numberOfReads}</TableCell>
                  <TableCell align="right">{sample.avgReadLength}</TableCell>
                  <TableCell align="right">{sample.ncbiAccession}</TableCell>
                  <TableCell align="right">
                    {sample.sequencingPlatform}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <CustomTablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={this.state.samples.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={this.handleChangePage}
                  onRowsPerPageChange={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <div>
          <button
            type="submit"
            value="Initialize"
            className="returnbtn"
            onClick={this.goBack}
          >
            <i
              className="fa fa-angle-left"
              style={{ paddingRight: "10px" }}
            ></i>
            <span>Return</span>
          </button>
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
export default ProjectPage;
