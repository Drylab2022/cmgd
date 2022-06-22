import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

class ModalCustom extends React.Component {
  showContent = () => {
    switch (this.props.content) {
      case "get":
        return "Please wait for a moment, the data is loading for you now.";
      case "post":
        return "Please wait for a moment, we need time to deal with the data.";
      case "no-data":
        return "No data returned. Please try again.";
      default:
        return "Please wait for a moment, the page is trying to load。";
    }
  };

  render() {
    return (
      <div>
        <Modal
          open={this.props.status}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Loading...
            </Typography> */}
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {this.showContent()}
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default ModalCustom;
