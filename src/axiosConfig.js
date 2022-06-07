import axios from "axios";
import awsExports from "./aws-exports";

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === "local"
      ? "http://localhost:5001"
      : awsExports.aws_cloud_logic_custom[0].endpoint,
});

export default instance;
