import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../shared/models/delivery';
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
export class DeliveryService {

  constructor(private http:HttpClient) { }
  getAll():Observable<Delivery[]>{
    return this.http.get<Delivery[]>(`${BASE_URL}/api/delivery`);
  }
  getOneDeliveryById(id:string):Observable<Delivery>{
    return this.http.get<Delivery>(`${BASE_URL}/api/delivery/${id}`);
  }

  createNewDelivery(data:object,id:string){
    console.log('createNewDelivery')
    return this.http.post<Delivery>(`${BASE_URL}/api/delivery/${id}`, data, httpOptions).subscribe({complete: console.info});
  }
  updateDelivery(id:string, data:object):Observable<Delivery>{
    console.log(id);
    console.log(data);
    return this.http.put<Delivery>(`${BASE_URL}/api/delivery/${id}`, data);
  }
  deleteDelivery(id:string):Observable<Delivery>{
    return this.http.delete<Delivery>(`${BASE_URL}/api/delivery/${id}`);
  }
}
