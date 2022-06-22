import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

class TopButtons extends React.Component {
    render() {
        return (
            <Grid item container>
                <Grid
                    item
                    xs={1}
                    sx={{ backgroundColor: "white" }}
                    style={{ textAlign: "center" }}
                >
                    <Button>Save</Button>
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{ backgroundColor: "white" }}
                    style={{ textAlign: "center" }}
                >
                    <Button>Download</Button>
                </Grid>
            </Grid>
        );
    }
}

export default TopButtons;
