import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  apiUrl = 'http://localhost:8080/admin'

  loadFood(){
    return this.http.get(this.apiUrl+'/loadfood')
  }

  togleBlockFood(element:any){
    const stringId = String(element._id)
    const params  = new HttpParams().set('id',stringId)
    return this.http.get(this.apiUrl+'/toggleblockfood',{ params })
  }

  deleteItem(id:any){
    const stringId = String(id)
    const params = new HttpParams().set('id',stringId)
    return this.http.get(this.apiUrl+'/deleteitem',{ params })
  }

  searchFood(value:any){
    const query = String(value)
    console.log(value)
    const params = new HttpParams().set('query',query)
    return this.http.get(this.apiUrl+'/searchfood',{ params })
  }

  selectFood(id:any){
    const stringId = String(id)
    const params = new HttpParams().set('id',id)
    return this.http.get(this.apiUrl+'/selectfood',{ params})
  }

 

}
