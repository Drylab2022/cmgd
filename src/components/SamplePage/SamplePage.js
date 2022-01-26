import React from "react";
import TextField from '@mui/material/TextField';
import { IconButton, Stack } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../HomePage/HomePage.css"

class SamplePage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            validatePass: true,
            errorMessage: '',
        };
    }

    //handle the submit action 
    submitForm =(event) => {
        // const { item, onFormSubmit } = this.props;
        // const editMode = !!item;

        // const sampleId = this.sampleIdInput.value.trim();
        // const platForm = this.platFormInput.value.trim();
        // const number = this.numberInput.value.trim();
        // const averageRead = this.averageReadInput.trim();
        // const SRR = this.SRRInput.trim();
        
        // if (sampleId && platForm && number && averageRead && SRR){
        //     if (sampleId)
        // }
    }
    render(){
        return (
            <div className="new">
                <h4>Project SRP 11101</h4>
                <Stack
                    component='form'
                    sx={{
                        width: 500,
                        maxWidth:'100%'}}
                    spacing={2}        
                >
                    <TextField fullWidth label="Sample ID:" id="Sample" />
                    <TextField fullWidth label="Sequencing Platform: " id="Platform" />
                    <TextField fullWidth label="Number-Reads: " id="Number" />
                    <TextField fullWidth label="Average read length: " id="length" />
                    <TextField fullWidth label="SRRs: " id="SRR" />
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton aria-label="upload picture" component="span"><AddCircleOutlineIcon /></IconButton>
                    <h6>Add Metadata</h6>
                </Stack>
            </div>
        );
    }
}
export default SamplePage;