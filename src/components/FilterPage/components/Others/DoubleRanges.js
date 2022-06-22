import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import { connect } from "react-redux";

class DoubleRanges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRanges: [this.props.realRange[0], this.props.realRange[1]],
            upload: false,
        };
    }

    componentDidUpdate() {
        if (this.props.lastCurrRange) {
            if (
                this.props.lastCurrRange[0] === this.props.currRange[0] &&
                this.props.lastCurrRange[1] === this.props.currRange[1] &&
                this.state.upload
            ) {
                this.setState({
                    showRanges: [
                        this.props.currRange[0],
                        this.props.currRange[1],
                    ],
                    upload: false,
                });
            }
        }
    }

    handleChanges = (event, option) => {
        if (this.timeOutId !== undefined) {
            clearTimeout(this.timeOutId);
        }

        var tempRange = [];

        switch (option) {
            case "MIN":
                tempRange = [
                    Number(event.target.value),
                    this.state.showRanges[1],
                ];
                break;
            case "MAX":
                tempRange = [
                    this.state.showRanges[0],
                    Number(event.target.value),
                ];
                break;
            default:
                tempRange = [
                    Number(event.target.value[0]),
                    Number(event.target.value[1]),
                ];
        }

        this.setState({ showRanges: [tempRange[0], tempRange[1]] });

        var uploadRange = [];

        const correctRange = () => {
            if (
                tempRange[0] < this.props.realRange[0] ||
                tempRange[1] > this.props.realRange[1] ||
                tempRange[0] > tempRange[1]
            ) {
                uploadRange = [
                    this.props.realRange[0],
                    this.props.realRange[1],
                ];
            } else {
                uploadRange = [tempRange[0], tempRange[1]];
            }
            this.props.onChange({
                ranges: [uploadRange[0], uploadRange[1]],
                rangeName: this.props.title,
            });
            this.setState({ showRanges: [uploadRange[0], uploadRange[1]] });
        };

        const afterUpload = () => {
            return Promise.resolve(correctRange());
        };

        this.timeOutId = setTimeout(() => {
            afterUpload();
            this.setState({ upload: true });
        }, 1500);
    };

    render() {
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 5, sm: 8, md: 12 }}
                    pt={2}
                    m={2}
                >
                    <Grid item xs={4.5}>
                        <TextField
                            value={this.state.showRanges[0]}
                            type="number"
                            id="outlined-required"
                            label="Min"
                            size="small"
                            inputProps={{ style: { textAlign: "center" } }}
                            sx={{ mx: "auto" }}
                            onChange={(event) =>
                                this.handleChanges(event, "MIN")
                            }
                        />
                    </Grid>
                    <Grid item xs={4.5}>
                        <TextField
                            value={this.state.showRanges[1]}
                            type="number"
                            id="outlined-required"
                            label="Max"
                            size="small"
                            inputProps={{ style: { textAlign: "center" } }}
                            sx={{ mx: "auto" }}
                            onChange={(event) =>
                                this.handleChanges(event, "MAX")
                            }
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    pt={2}
                    m={1}
                >
                    <Grid item xs={8}>
                        <Slider
                            //   key={`slider-${this.state.ranges}`}
                            getAriaLabel={() => "Minimum distance"}
                            value={this.state.showRanges}
                            valueLabelDisplay="auto"
                            size="small"
                            min={
                                this.state.showRanges[0] <
                                this.props.realRange[0]
                                    ? this.state.showRanges[0]
                                    : this.props.realRange[0]
                            }
                            max={
                                this.state.showRanges[1] >
                                this.props.realRange[1]
                                    ? this.state.showRanges[1]
                                    : this.props.realRange[1]
                            }
                            onChange={(event) =>
                                this.handleChanges(event, "RANGES")
                            }
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    var lastCurrRange = null;
    if (
        state.last_params !== undefined &&
        state.last_params["params"] !== undefined &&
        state.last_params["params"][ownProps.title] !== undefined
    ) {
        lastCurrRange = state.last_params["params"][ownProps.title];
    }
    return {
        currRange: state.params[ownProps.title],
        realRange: state.options[ownProps.title],
        lastCurrRange: lastCurrRange,
    };
};

export default connect(mapStateToProps, {})(DoubleRanges);
