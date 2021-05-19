import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const PRODUCT_API = 'http://127.0.0.1:9000/api/product/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  addProduct(name: string, description: string): Observable<any> {
    return this.http.post(
      PRODUCT_API + 'insert',
      {
        name,
        description,
      },
      httpOptions
    );
  }

  showProduct(): Observable<any> {
    return this.http.get(PRODUCT_API + 'show', httpOptions);
  }

  getProductById(id: any): Observable<any> {
    return this.http.get(PRODUCT_API +`get/${id}`, httpOptions);
  }

  deleteProduct(id:any):Observable<any>{
    return this.http.get(PRODUCT_API +`deleteProduct/${id}`, httpOptions);

  }
}
