// SPDX-License-Identifier: AGPL-3.0-or-later

import { errorToObjectReturn } from "vendor/utils";

export interface gfetchRequest {
  input: RequestInfo | URL;
  init?: RequestInit;
}
export interface gfetchResponse {
  body: Blob;
  options: {
    status: number;
    statusText: string;
    headers: [string, string][];
  };
}
export interface gfetchOk {
  id: string;
  request: gfetchRequest;
  response: gfetchResponse;
  type: "ok";
}
export interface gfetchError {
  id: string;
  request: gfetchRequest;
  error: errorToObjectReturn;
  type: "error";
}

export type gfetchOkOutput = {
  request: gfetchRequest;
  response: Response;
};
export type gfetchErrorOutput = {
  request: gfetchRequest;
  error: gfetchError["error"];
};
