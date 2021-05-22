import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product } from '../products/product.model';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.api+"/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(this.url+`/${id}`);
  }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(this.url+`/${product.id}`, product);
  }

  delete(id: string): Observable<Product>{
    return this.http.delete<Product>(this.url+`/${id}`);
  }
}
