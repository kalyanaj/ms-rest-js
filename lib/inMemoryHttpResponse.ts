// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { HttpHeaders, RawHttpHeaders } from "../lib/httpHeaders";
import { HttpRequest } from "../lib/httpRequest";
import { HttpResponse } from "../lib/httpResponse";

export class InMemoryHttpResponse implements HttpResponse {
  private readonly _headers: HttpHeaders;

  constructor(private _request: HttpRequest, private _statusCode: number, headers: HttpHeaders | RawHttpHeaders, private _bodyText?: string, private readonly _deserializedBody?: any) {
    this._headers = (headers instanceof HttpHeaders ? headers : new HttpHeaders(headers));
  }

  public get request(): HttpRequest {
    return this._request;
  }

  public get statusCode(): number {
    return this._statusCode;
  }

  public get headers(): HttpHeaders {
    return this._headers;
  }

  textBody(): Promise<string | undefined> {
    return Promise.resolve(this._bodyText);
  }

  parsedBody(): Promise<any | undefined> {
    return Promise.resolve(this._bodyText == undefined ? undefined : JSON.parse(this._bodyText));
  }

  deserializedBody(): Promise<any | undefined> {
    return Promise.resolve(this._deserializedBody);
  }

  get readableStreamBody(): ReadableStream | NodeJS.ReadableStream | null {
    // tslint:disable-next-line no-null-keyword
    return null;
  }

  blobBody(): Promise<Blob> {
    return Promise.resolve(new Blob([this._bodyText]));
  }
}
