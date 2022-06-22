import React from "react";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import { getFilterDate } from "../../actions";
// import Stack from "@mui/material/Stack";

class TimeSelect extends React.Component {
  // formatCurrentDate = () => {
  //   var d = new Date(),
  //     month = "" + (d.getMonth() + 1),
  //     day = "" + d.getDate(),
  //     year = d.getFullYear(),
  //     hour = "" + d.getHours(),
  //     minute = "" + d.getMinutes();

  //   // console.log(minute);
  //   // console.log("0" + minute);
  //   // console.log(minute.length);

  //   if (month.length < 2) month = "0" + month;
  //   if (day.length < 2) day = "0" + day;
  //   if (hour.length < 2) hour = "0" + hour;
  //   if (minute.length < 2) minute = "0" + minute;

  //   return [year, month, day].join("-") + "T" + [hour, minute].join(":");
  // };

  handleTimeChange = (event) => {
    // console.log(event.target.value);
    this.props.getFilterDate(event.target.value);
  };

  render() {
    // console.log(this.props.currentTime);
    return (
      <div>
        <TextField
          id="datetime-local"
          label="Select Time"
          type="datetime-local"
          value={this.props.currentTime}
          onChange={this.handleTimeChange}
          //   sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTime: state.date,
  };
};

export default connect(mapStateToProps, {
  getFilterDate,
})(TimeSelect);

// export default TimeSelect;
