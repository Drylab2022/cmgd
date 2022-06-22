import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Divider from "@mui/material/Divider";

import MultipleCheckBoxesForHead from "../Others/MultipleCheckBoxesForHead";
import NestedListSingle from "../Others/NestedListSingle";
import { addColumn, deleteColumn, updateColumn } from "../../actions";
import { ALL_COLUMNS } from "../../stableVariables";

class Menu extends React.Component {
    handleColumnsChange = (columns) => {
        const { checkBoxSituations } = columns;
        for (const option in checkBoxSituations) {
            if (
                option in this.props.currentChoices &&
                !checkBoxSituations[option]
            ) {
                this.props.deleteColumn(option);
            } else if (
                !(option in this.props.currentChoices) &&
                checkBoxSituations[option]
            ) {
                this.props.addColumn(option);
            }
        }
    };

    handleCheckboxChange = (choices) => {
        const { checkBoxSituations, colomnName } = choices;
        this.props.updateColumn(
            colomnName,
            Object.keys(
                _.omitBy(checkBoxSituations, (value) => value === false)
            )
        );
    };

    handleRangeChange = (range) => {
        const { ranges, rangeName } = range;
        this.props.updateColumn(rangeName, [...ranges]);
    };

    generateAllColumns = () => {
        return Object.keys(this.props.currentChoices).map((column) => {
            return (
                <NestedListSingle
                    title={column}
                    options={this.props.allOptions[column]}
                    currentOptions={this.props.currentChoices[column]}
                    open={false}
                    type={this.props.allTypes[column]}
                    onChange={{
                        boxes: this.handleCheckboxChange,
                        ranges: this.handleRangeChange,
                    }}
                    key={column}
                />
            );
        });
    };

    render() {
        if (this.props.allOptions[ALL_COLUMNS] === undefined) {
            return <div> Unfind </div>;
        }

        return (
            <div>
                <MultipleCheckBoxesForHead
                    options={this.props.allOptions[ALL_COLUMNS]}
                    title={ALL_COLUMNS}
                    onChange={this.handleColumnsChange}
                />
                <Divider />
                {this.generateAllColumns()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allOptions: state.options,
        allTypes: state.columns,
        currentChoices: state.params,
    };
};

export default connect(mapStateToProps, {
    addColumn,
    deleteColumn,
    updateColumn,
})(Menu);
