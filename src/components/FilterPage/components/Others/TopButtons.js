import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import * as Papa from "papaparse";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import {
    getModalStatus,
    getModalContent,
    getAllPreviousCombinations,
} from "../../actions";
import cmgdAPI from "../../apis/cmgdAPI";

class TopButtons extends React.Component {
    componentDidMount() {
        this.props.getAllPreviousCombinations();
    }

    downloadFile = async () => {
        // set modal be true
        this.props.getModalContent("get");
        this.props.getModalStatus(true);
        const totalData = await cmgdAPI.post(
            "/api/production/search",
            this.props.json
        );
        const data = totalData.data.results;
        const downloadData = [];
        for (const index in data) {
            downloadData.push(data[index]["curation"]);
        }
        console.log(downloadData);
        const csv = Papa.unparse(downloadData);
        const blob = new Blob([csv]);
        this.downloadBlob(blob, "all_data.csv");
        // set modal be false
        this.props.getModalStatus(false);
        this.props.getModalContent("");
    };

    downloadBlob = (blob, name) => {
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
    };

    handleCombination = (event, value) => {
        console.log(value);
    };

    render() {
        return (
            <Grid item container>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Button>Save</Button>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Button onClick={this.downloadFile}>Download</Button>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid
                    item
                    xs={6}
                    style={{ textAlign: "center", justifyContent: "center" }}
                >
                    <Autocomplete
                        onChange={this.handleCombination}
                        disablePortal
                        id="combo-box-demo"
                        options={this.props.combinations}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Previous Parameter Combination"
                            />
                        )}
                    />
                </Grid>
            </Grid>
        );
    }
}

const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
        label: "The Lord of the Rings: The Return of the King",
        year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
    {
        label: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
    },
];

const mapStateToProps = (state) => {
    const columnTypes = state.columns;
    const date = state.date;
    const allRow = state.allrow;
    const filter = {};

    for (const colomnName in state.params) {
        if (columnTypes[colomnName] === "boxes") {
            filter[colomnName] = {
                in: state.params[colomnName],
            };
        } else if (columnTypes[colomnName] === "ranges") {
            filter[colomnName] = {
                gte: state.params[colomnName][0].toString(),
                lte: state.params[colomnName][1].toString(),
            };
        }
    }

    const json = {
        page: 0,
        count: allRow,
        timestamp: {
            lt: date,
        },
        filter: filter,
    };
    return {
        json: json,
        combinations: state.all_combinations,
    };
};

export default connect(mapStateToProps, {
    getModalStatus,
    getModalContent,
    getAllPreviousCombinations,
})(TopButtons);
