import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import MultipleCheckBoxes from "./MultipleCheckBoxes";
import DoubleRanges from "./DoubleRanges";

class NestedListSingle extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.open === undefined) {
            this.state = { open: false };
        } else {
            this.state = { open: this.props.open };
        }
    }

    handleOpen = () => {
        this.setState({ open: !this.state.open });
    };

    showElement = () => {
        if (this.props.type === "boxes") {
            return (
                <MultipleCheckBoxes
                    options={this.props.options}
                    currentOptions={this.props.currentOptions}
                    title={this.props.title}
                    onChange={this.props.onChange[this.props.type]}
                />
            );
        } else if (this.props.type === "ranges") {
            return (
                <DoubleRanges
                    title={this.props.title}
                    ranges={this.props.options}
                    onChange={this.props.onChange[this.props.type]}
                />
            );
        }
    };

    render() {
        return (
            <div>
                <ListItemButton onClick={this.handleOpen}>
                    <ListItemText primary={this.props.title} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={this.state.open} timeout="auto">
                    <List component="div" disablePadding>
                        {this.showElement()}
                    </List>
                </Collapse>
            </div>
        );
    }
}

export default NestedListSingle;
