import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { Product } from './product.model';
import { environment } from "../../../environments/environment";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.api+"/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product).pipe(
      map((obj) => obj),
      catchError(e => this.erroHandler(e))
    );
  }

  erroHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url).pipe(
      map((obj) => obj),
      catchError(e => this.erroHandler(e))
    );
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(this.url+`/${id}`).pipe(
      map((obj) => obj),
      catchError(e => this.erroHandler(e))
    );
  }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(this.url+`/${product.id}`, product).pipe(
      map((obj) => obj),
      catchError(e => this.erroHandler(e))
    );
  }

  delete(id: string): Observable<Product>{
    return this.http.delete<Product>(this.url+`/${id}`).pipe(
      map((obj) => obj),
      catchError(e => this.erroHandler(e))
    );
  }
}
