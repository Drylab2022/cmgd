import axios from "axios";
import awsExports from "./aws-exports";

const axiosConfig = (token) => {
  const settings =
    process.env.REACT_APP_ENV === "local"
      ? {
          BaseURL: "http://localhost:5001",
          headers: {
            "Content-Type": "application/json",
          },
        }
      : {
          BaseURL: awsExports.aws_cloud_logic_custom[0].endpoint,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
  const instance = axios.create({
    baseURL: settings.BaseURL,
    headers: settings.headers,
  });

  return instance;
};

export default axiosConfig;
