import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Product } from '../domain/product';
import { PRODUCTS } from '../mocks/mock-products';
import { MessageService } from '../message.service';

@Injectable()
export class ProductService {

  constructor(private messageService: MessageService) { }

  getProducts(): Observable<Product[]> {
    this.messageService.add('Product service: fetched products');
    return of(PRODUCTS);
  }

  getProduct(id: number): Observable<Product> {
    this.messageService.add(`ProductService: fetched product id=${id}`);
    return of(PRODUCTS.find(hero => hero.id === id));
  }
}
