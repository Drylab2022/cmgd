import * as React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";
import { connect } from "react-redux";

import { addColumn, deleteColumn, updateColumn } from "../../actions";
import { SELECT_ALL } from "../../stableVariables";

const checkboxHeight = 45;

class MultipleCheckBoxes extends React.Component {
    constructor(props) {
        super(props);
        const optionsSituations = {};
        for (const option in this.props.options) {
            optionsSituations[this.props.options[option]] = true;
        }
        this.state = {
            checkBoxSituations: optionsSituations,
            allStringAll: true,
            allStringIndeter: false,
        };
        this.allString = SELECT_ALL;
    }

    componentDidUpdate() {
        var trueNumber = 0;

        for (const option in this.state.checkBoxSituations) {
            if (this.state.checkBoxSituations[option]) {
                trueNumber += 1;
            }
        }

        if (this.props.allParams[this.props.title].length > 0) {
            const currentOptions = this.props.allParams[this.props.title];
            const optionsSituations = {};
            if (trueNumber !== currentOptions.length) {
                for (const optionIndex in this.props.options) {
                    const option = this.props.options[optionIndex];
                    if (currentOptions.includes(option)) {
                        optionsSituations[option] = true;
                    } else {
                        optionsSituations[option] = false;
                    }
                }
                this.setState({ checkBoxSituations: optionsSituations });
                if (currentOptions.length === this.props.options) {
                    this.setState({
                        allStringAll: true,
                        allStringIndeter: false,
                    });
                } else if (currentOptions.length > 0) {
                    this.setState({
                        allStringAll: false,
                        allStringIndeter: true,
                    });
                } else {
                    this.setState({
                        allStringAll: false,
                        allStringIndeter: false,
                    });
                }
            }
        }
    }

    generateAllChoices = () => {
        return this.props.options.map((option) => {
            return (
                <FormControlLabel
                    label={
                        <>
                            {option + " "}
                            <Chip
                                label={
                                    this.props.paramsToNums[this.props.title][
                                        option
                                    ]
                                }
                                size="small"
                            />
                        </>
                    }
                    control={
                        <Checkbox
                            checked={this.state.checkBoxSituations[option]}
                            onChange={(event) =>
                                this.handleChange(event, option)
                            }
                            style={{
                                height: checkboxHeight,
                            }}
                        />
                    }
                    key={option}
                />
            );
        });
    };

    handleChange = (event, option) => {
        var newBool = {};
        if (option === this.allString) {
            for (const index in this.props.options) {
                newBool[this.props.options[index]] = event.target.checked;
            }
        } else {
            newBool = {
                ...this.state.checkBoxSituations,
                [option]: event.target.checked,
            };
        }

        const json = {
            checkBoxSituations: newBool,
            colomnName: this.props.title,
        };

        this.props.onChange(json);
    };

    render() {
        if (this.props.options === undefined) {
            return <div> Unfind </div>;
        }

        return (
            <div>
                <Grid item container justifyContent="center">
                    <Grid item xs={10}>
                        <FormControlLabel
                            label={this.allString}
                            control={
                                <Checkbox
                                    checked={this.state.allStringAll}
                                    indeterminate={this.state.allStringIndeter}
                                    onChange={(event) =>
                                        this.handleChange(event, this.allString)
                                    }
                                    style={{
                                        height: checkboxHeight,
                                    }}
                                />
                            }
                        />
                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                ml: 5,
                                height:
                                    this.props.options.length > 6
                                        ? 6 * checkboxHeight
                                        : this.props.options.length *
                                          checkboxHeight,
                                overflow: "auto",
                            }}
                        >
                            {this.generateAllChoices()}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allOptions: state.options,
        paramsToNums: state.params_to_nums,
        allParams: state.params,
    };
};

export default connect(mapStateToProps, {
    addColumn,
    deleteColumn,
    updateColumn,
})(MultipleCheckBoxes);
