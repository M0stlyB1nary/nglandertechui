import { Component, OnInit } from '@angular/core';
import { Product } from '../domain/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  add(productName: string): void {
    productName = productName.trim();
    if (!productName) { return; }
    this.productService.addProduct({ productName } as Product)
      .subscribe(hero => {
        this.products.push(hero);
      });
  }

  delete(product: Product): void {
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product).subscribe();
  }
}
