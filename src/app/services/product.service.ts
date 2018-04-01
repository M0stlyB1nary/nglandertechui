import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Product } from '../domain/product';
import { PRODUCTS } from '../mocks/mock-products';
import { MessageService } from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

  private productsUrl = 'http://localhost:8080/api/v1/products';
  private productSearchDescUrl = 'http://localhost:8080/api/v1/products/desc';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getMockProducts(): Observable<Product[]> {
    this.messageService.add('Product service: fetched products');
    return of(PRODUCTS);
  }

  getMockProduct(id: string): Observable<Product> {
    this.messageService.add(`ProductService: fetched product productId=${id}`);
    return of(PRODUCTS.find(product => product.id === id));
  }

  getProducts(): Observable<Product[]> {
    this.messageService.add('Product service: fetched products');
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(products => this.log(`fetched products`)),
        catchError(this.handleError('getProducts', []))
      );
  }

  /** GET product by id. Will 404 if id not found */
  getProduct(id: string): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  /** GET product by id. Will 404 if id not found */
  getProductByPid(productId: number): Observable<Product> {
    const url = `${this.productsUrl}/${productId}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product productId=${productId}`)),
      catchError(this.handleError<Product>(`getProduct productId=${productId}`))
    );
  }

  /** PUT: update the product on the server */
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl, product, httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions).pipe(
      tap((productLog: Product) => this.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(product: Product | string): Observable<Product> {
    const id = typeof product === 'string' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  /* GET products whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
    const url = `${this.productSearchDescUrl}?desc=${term}`;
    if (!term.trim()) {
      // if not search term, return empty product array.
      return of([]);
    }
    return this.http.get<Product[]>(url).pipe(
      tap(_ => this.log(`found products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }

  private log(message: string) {
    this.messageService.add('ProductService: ' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
