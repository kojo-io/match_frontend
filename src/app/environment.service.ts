import { Injectable } from '@angular/core';
import {IEnvironment} from "../environments/ienvironment";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService implements IEnvironment{

  constructor() { }

  get apiHost() {
    return environment.apiHost;
  };

  get apiUrl() {
    return environment.apiUrl;
  };

  get enableDebugTools() {
    return environment.enableDebugTools;
  };

  get logLevel() {
    return environment.logLevel;
  };

  get production() {
    return environment.production;
  };
}
