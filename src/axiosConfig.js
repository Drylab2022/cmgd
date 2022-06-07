import axios from "axios";
import awsExports from "./aws-exports";

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
          Authorization:
            "eyJraWQiOiJQREU5M0lkNWNqcmJKM2lEaFwvdEhURTI1YmQ2NDZJUGhzTjFVN2dRY2NJYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwYTA2NGQzNS0zNjVmLTRiY2YtOWJlYS1kOGVlNTJjMzc1YjEiLCJjb2duaXRvOmdyb3VwcyI6WyJDdXJhdG9yIiwiUmV2aWV3ZXIiXSwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV93ZXpIRXJmOHMiLCJjb2duaXRvOnVzZXJuYW1lIjoid2FucXVhbjg5Iiwib3JpZ2luX2p0aSI6ImE0MmNlMTVlLThlZDktNGQxYy1hYzI2LWNjMGZhMjU0NThmZSIsImF1ZCI6IjZmYWhyMzhpZ2JhMnYzaGl2MDI2NHNnMmUwIiwiZXZlbnRfaWQiOiI1MzAyYTRjMy0xNGI1LTQxZjEtYjFkYS01MjZmNWU2NjBhZTIiLCJ0b2tlbl91c2UiOiJpZCIsInNjb3BlIjoiQ3VyYXRvci02ZmFocjM4aWdiYTJ2M2hpdjAyNjRzZzJlMCBSZXZpZXdlci02ZmFocjM4aWdiYTJ2M2hpdjAyNjRzZzJlMCIsImF1dGhfdGltZSI6MTY1NDU3MTAyNCwibmFtZSI6IlF1YW4iLCJleHAiOjE2NTQ1NzQ2MjQsImlhdCI6MTY1NDU3MTAyNCwianRpIjoiMzQ0YTdkOWEtMzc4Ny00Nzg5LTk5ODEtN2I1YTUzZDJjOTRhIiwiZW1haWwiOiJ3YW5xdWFuODlAaG90bWFpbC5jb20ifQ.c6_88rYMxrjNAbl5r4rOYssp7MNC3ST1x-0gGqEwZ1ZY6oHlBZxUEOFRYBHxtlraoZ58KNMLGqEvbejuMb9gSYp5sQGbt3jLoNW0MVr6Die0KvOfpYfFZimGHFz0PJ6fMP8L3YYsH-Htv1cOr5U50o09H6-qdcK806xXQtOVFDqvEv9OZ4eLUg301hHvBSx0g_kCd7iEPTXkIWSLYTiP40tLiA83aSbksRxDGiSP54yNsG6bw0jtRH0vr7Rt5_Fmcpot6No4EDFHnNsVqUkGTdNhKhpjNpYuu5uvPdSEIRfFr0U7IRGV_cDhmA2WSiZc0N9EixbLH_iKrsexhGbVyg",
        },
      };

const instance = axios.create({
  baseURL: settings.BaseURL,
  headers: settings.headers,
});

export default instance;
