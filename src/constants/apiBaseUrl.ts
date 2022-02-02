namespace APIBaseUrl {
  // export const AUTH = process.env.REACT_APP_AUTH_API_HOST ?? "https://auth.example.com";
  // export const APP = process.env.REACT_APP_APPLICATION_API_HOST ?? "https://api.example.com";
  export const AUTH = process.env.REACT_APP_AUTH_API_HOST + "/auth/v1";
  export const APP = process.env.REACT_APP_APPLICATION_API_HOST + "/v1";
}

export { APIBaseUrl };
