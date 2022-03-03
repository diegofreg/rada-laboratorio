import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public get<Type>(url: string): Observable<Type> {
    return this.httpClient.get<Type>(url, { responseType: "json" });
  }
}
