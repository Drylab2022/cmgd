import * as React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { connect } from "react-redux";

import { addColumn, deleteColumn, updateColumn } from "../../actions";
import { SELECT_ALL } from "../../stableVariables";

const checkboxHeight = 40;

class MultipleCheckBoxesForHead extends React.Component {
    constructor(props) {
        super(props);
        const optionsSituations = {};
        for (const option in this.props.options) {
            optionsSituations[this.props.options[option]] = false;
        }
        this.state = {
            checkBoxSituations: optionsSituations,
            allStringAll: false,
            allStringIndeter: false,
        };
        this.allString = SELECT_ALL;
    }

    generateAllChoices = () => {
        return this.props.options.map((option) => {
            return (
                <FormControlLabel
                    label={option}
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
        var newAllStringAll = true;
        var newAllStringIndeter = true;
        if (option === this.allString) {
            for (const index in this.props.options) {
                newBool[this.props.options[index]] = event.target.checked;
            }
            newAllStringAll = event.target.checked;
            newAllStringIndeter = false;
        } else {
            var falseNum = 0;
            newBool = {
                ...this.state.checkBoxSituations,
                [option]: event.target.checked,
            };
            for (const option in newBool) {
                if (!newBool[option]) {
                    falseNum += 1;
                }
            }
            if (falseNum === 0) {
                newAllStringAll = true;
                newAllStringIndeter = false;
            } else if (falseNum === this.props.options.length) {
                newAllStringAll = false;
                newAllStringIndeter = false;
            } else {
                newAllStringAll = false;
                newAllStringIndeter = true;
            }
        }

        this.setState(
            {
                checkBoxSituations: newBool,
                allStringAll: newAllStringAll,
                allStringIndeter: newAllStringIndeter,
            },
            () => {
                this.props.onChange({
                    ...this.state,
                    colomnName: this.props.title,
                });
            }
        );
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
                                        ? 6 * (checkboxHeight + 8)
                                        : this.props.options.length *
                                          (checkboxHeight + 8),
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
    };
};

export default connect(mapStateToProps, {
    addColumn,
    deleteColumn,
    updateColumn,
})(MultipleCheckBoxesForHead);
