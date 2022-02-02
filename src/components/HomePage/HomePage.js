import React, { Component } from "react";
import "./HomePage.css"
import axios from "axios";
import WorkingPage from "./WorkingPage";
import { Auth } from 'aws-amplify';

const cursorMaximumSize = 999;
const projectStatus = 'active';

class HomePage extends Component{
  
  constructor(props){
    super(props)
    this.state={
      projectId: '',
      samplesInfo: new Map(),
      projects: [],
      username: ''
    }

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
    params.set('size', cursorMaximumSize);
    params.set('cursor', cursor);
    return `https://api.omicidx.cancerdatasci.org/sra/studies/${this.state.projectId}/runs?include_fields=accession&include_fields=sample_accession&include_fields=experiment.platform&include_fields=experiment.library_layout&include_fields=total_spots&include_fields=avg_length&${params.toString()}`;
  }

  calculateTotalSpots(layout, totalSpots) {
    totalSpots = parseInt(totalSpots);
    return layout === 'PAIRED' ? totalSpots * 2 : totalSpots;
  }

  processData(datas) {
    const tempMap = this.state.samplesInfo;

    datas.forEach((data) => {
      const sampleId = data.sample_accession;
      const srrId = data.accession;
      const info = tempMap.get(sampleId);

      if(!info) {
        tempMap.set(sampleId, {
          avgLength: data.avg_length,
          platform: data.experiment.platform,
          totalSpots: this.calculateTotalSpots(data.experiment.library_layout, data.total_spots),
          srrIds: [srrId],
        });
      } else {
        info.avgLength += data.avg_length;
        info.totalSpots += this.calculateTotalSpots(data.experiment.library_layout, data.total_spots);
        info.srrIds.push(srrId);
      }
    });

    this.setState({sampleInfo: tempMap});
  }

  generateJsonObject() {
    const samples = new Array();

    this.state.samplesInfo.forEach((value, key) => {
      samples.push({
        sampleId: key,
        numberOfReads: value.totalSpots,
        avgReadLength: value.avgLength,
        ncbiAccession: value.srrIds.join(';'),
        sequencingPlatform: value.platform
      });
    });

    return {
      projectId: this.state.projectId,
      numberOfSamples: this.state.samplesInfo.size,
      status: projectStatus,
      assignee: this.state.username,
      samples: samples,
    }
  };

  async initializeProject(event){
    event.preventDefault();
    let cursor = '';
    const projectID = this.state.projectID;

    //check if input is empty or whitespace
    if(document.getElementById("projectId").value.trim().length === 0 || document.getElementById("projectId").value === null){
      alert("Please enter a valid value");
    }

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
    try {
      const url = this.generateURL(cursor, projectID);
      const res = await axios.get(url);
      this.processData(res.data.hits);
    } catch (error) {
      alert("Oops! Something went wrong. Please check you have the correct project id.");
    }

    this.state.samplesInfo.forEach((sample) => {
      sample.avgLength /= sample.srrIds.length;
    });

    const json = this.generateJsonObject();

    const createRes = await axios.post("http://localhost:5001/api/project", json);
    const newProject = createRes.data;
    const projects = this.state.projects;
    projects.push(newProject);

    console.log("test", createRes);
    this.setState({
      samplesInfo : new Map(),
      projects: projects,
      projectId : this.state.projectId
    });
  }

  async getUserInfo() {
    const res = await Auth.currentUserInfo();
    const username = res.username;

    let projects = await axios.get(`http://localhost:5001/api/project/${username}`);
    projects = projects.data;

    this.setState({
      projects : projects,
      username : username
    });
  }
  render() {
    return (
      <div className="new">
        <h4>Start a new project: </h4>
        <hr />
        <form name="form" onSubmit={this.initializeProject}>
          <label>
           SRA Project ID: 
            <input id="projectId" type="text" value={this.state.projectID} className="inputText" required="required" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Initialize" className="submitbtn"/>
         </form>
         <WorkingPage projects = {this.state.projects} />
      </div>
    );
  }
}
export default HomePage