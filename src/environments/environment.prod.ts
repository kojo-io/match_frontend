import {IEnvironment} from "./ienvironment";

const apiHost = '178.63.13.157:8090/mock-api';
const apiUrl = `http://${apiHost}/api/`

export const environment : IEnvironment = {
  apiHost,
  apiUrl,
  enableDebugTools: false,
  logLevel: 'debug',
  production: true
};
