import React, { Component } from "react";
import "./HomePage.css";
import axios from "axios";
import axiosInternal from "../../axiosConfig";
import WorkingPage from "./WorkingPage";
import { Auth } from "aws-amplify";
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const cursorMaximumSize = 999;
const projectStatus = "active";
const metaDataUrlPrefix = "https://api.omicidx.cancerdatasci.org/sra/studies/";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: "",
      samplesInfo: new Map(),
      projects: [],
      username: "",
      loading: false,
      open: false,
      alertContent: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.initializeProject = this.initializeProject.bind(this);
    this.generateURL = this.generateURL.bind(this);
    this.processData = this.processData.bind(this);
    this.calculateTotalSpots = this.calculateTotalSpots.bind(this);
    this.generateJsonObject = this.generateJsonObject.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  async componentDidMount() {
    this.getUserInfo();
  }

  handleChange(event) {
    this.setState({ projectId: event.target.value });
  }

  generateURL(cursor) {
    const params = new URLSearchParams();
    params.set("size", cursorMaximumSize);
    params.set("cursor", cursor);
    return `https://api.omicidx.cancerdatasci.org/sra/studies/${
      this.state.projectId
    }/runs?include_fields=accession&include_fields=sample_accession&include_fields=experiment.platform&include_fields=experiment.library_layout&include_fields=total_spots&include_fields=avg_length&${params.toString()}`;
  }

  calculateTotalSpots(layout, totalSpots) {
    totalSpots = parseInt(totalSpots);
    return layout === "PAIRED" ? totalSpots * 2 : totalSpots;
  }

  processData(datas) {
    const tempMap = this.state.samplesInfo;

    datas.forEach((data) => {
      const sampleId = data.sample_accession;
      const srrId = data.accession;
      const info = tempMap.get(sampleId);

      if (!info) {
        tempMap.set(sampleId, {
          avgLength: data.avg_length,
          platform: data.experiment.platform,
          totalSpots: this.calculateTotalSpots(
            data.experiment.library_layout,
            data.total_spots
          ),
          srrIds: [srrId],
          curation: data.curation,
        });
      } else {
        info.avgLength += data.avg_length;
        info.totalSpots += this.calculateTotalSpots(
          data.experiment.library_layout,
          data.total_spots
        );
        info.srrIds.push(srrId);
      }
    });

    this.setState({ sampleInfo: tempMap });
  }

  generateJsonObject(projectMetaData) {
    const samples = new Array();

    this.state.samplesInfo.forEach((value, key) => {
      samples.push({
        sampleId: key,
        numberOfReads: value.totalSpots,
        avgReadLength: value.avgLength,
        ncbiAccession: value.srrIds.join(";"),
        sequencingPlatform: value.platform,
        curation: value.curation,
      });
    });

    return {
      projectId: this.state.projectId,
      numberOfSamples: this.state.samplesInfo.size,
      status: projectStatus,
      assignee: this.state.username,
      samples: samples,
      metadata: projectMetaData,
    };
  }

  async initializeProject(event) {
    event.preventDefault();
    let cursor = "";
    const projectID = this.state.projectId;

    //check if input is empty or whitespace
    if (
      document.getElementById("projectId").value.trim().length === 0 ||
      document.getElementById("projectId").value === null
    ) {
      this.setState({
        alert: true,
        alertContent:
          "The projectId you entered dose not match with required format. Please enter ProjectId using standard format.",
      });
      return;
    }

    //display loading on button on submit
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);

    //Todo: Currently we only call the external api once due to the unfixed CORS error,
    // after we figure out how to solve it, we will uncomment the loop to call the api
    // multiple times.

    // while(cursor !== null) {
    //   const url = this.generateURL(cursor, projectID);
    //   const res = await axios.get(url);
    //
    //   cursor = res.data.cursor;
    //   this.processData(res.data.hits);
    // }

    //Single
    let projectMetaData;

    try {
      const url = this.generateURL(cursor, projectID);
      const metaDataUrl = metaDataUrlPrefix + projectID;

      projectMetaData = await axios.get(metaDataUrl);
      projectMetaData = projectMetaData.data;

      const res = await axios.get(url);

      this.processData(res.data.hits);
    } catch (error) {
      this.setState({
        alert: true,
        alertContent:
          "Oops! Something went wrong. Please check you have the correct project id.",
      });
      return;
    }

    this.state.samplesInfo.forEach((sample) => {
      sample.avgLength /= sample.srrIds.length;
    });

    const json = this.generateJsonObject(projectMetaData);

    try {
      const createRes = await axiosInternal.post("/api/project", json);
      const newProject = createRes.data;
      const projects = this.state.projects;
      projects.push(newProject);

      this.setState({
        samplesInfo: new Map(),
        projects: projects,
      });
    } catch (error) {
      this.setState({
        alert: true,
        alertContent: `${error.response.data.errors[0].message}`,
      });
    }
  }

  async getUserInfo() {
    const res = await Auth.currentUserInfo();
    const username = res.username;

    let projects = await axiosInternal.get(`/api/project/${username}`);
    projects = projects.data;

    this.setState({
      projects: projects,
      username: username,
    });
  }

  render() {
    const { loading, alert, alertContent } = this.state;
    return (
      <div className="new">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <h4>Start a new project: </h4>
        <hr />
        <form name="form" onSubmit={this.initializeProject}>
          <label>
            SRA Project ID:
            <input
              id="projectId"
              type="text"
              value={this.state.projectID}
              className="inputText"
              required="required"
              onChange={this.handleChange}
            />
          </label>
          <button
            type="submit"
            value="Initialize"
            className="submitbtn"
            disabled={loading}
          >
            {loading && (
              <i
                className="fa fa-spinner fa-spin"
                style={{ marginRight: "5px" }}
              ></i>
            )}
            {loading && <span>loading</span>}
            {!loading && <span>Initialize</span>}
          </button>
          {alert ? (
            <div>
              <Dialog
                open={alert}
                onClose={() => this.setState({ alert: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {alertContent}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.setState({ alert: false })}>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ) : (
            <></>
          )}
        </form>
        <WorkingPage projects={this.state.projects} />
      </div>
    );
  }
}
export default HomePage;
