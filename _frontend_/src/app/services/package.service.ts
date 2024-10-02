import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Package } from '../shared/models/package';
import { BASE_URL } from '../shared/constants/urls';

import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Package[]>{
    console.log(BASE_URL + ' BASE_URL');
    return this.http.get<Package[]>(`${BASE_URL}/api/package`, httpOptions).pipe(map(resp => resp));

  }
  getOnePackageById(id:string):Observable<Package>{
    return this.http.get<Package>(`${BASE_URL}/api/package/${id}`);
  }

  createNewPackage(data: object,id:string){
    console.log("inside sercive " );
    console.log(data );
    console.log(BASE_URL + ' BASE_URL');
    return this.http.post<Package>(`${BASE_URL}/api/package/${id}`, data, httpOptions)
                              // .subscribe(data =>console.log(data), err =>console.error(err));
                              .subscribe({complete: console.info});
  }
  updatePackage(id:string, data:object):Observable<Package>{
    return this.http.put<Package>(`${BASE_URL}/api/package/${id}`, data);
  }
  deletePackage(id:string):Observable<Package>{
    return this.http.delete<Package>(`${BASE_URL}/api/package/${id}`);
  }
}
