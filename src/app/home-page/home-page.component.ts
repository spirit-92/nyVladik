import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../shared/interfaces";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  products: Product[]
  categories: any[]

  constructor(
    private productService: ProductService,
    private toaster: ToastrService,
    private loader: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.loader.show()
    this.productService.getProducts().subscribe(res => {
      this.products = res.product
      this.loader.hide()
    }, error => {
      this.loader.hide()
      this.toaster.error('ошибка сервера')
    })
    this.loader.show()
    this.productService.getCategories().subscribe(res => {
      this.categories = res.category;
    }, error => {
      this.toaster.error('ошибка сервера')
      this.loader.hide()
    })
  }

  getFilter(id: number) {
    this.loader.show()
    this.productService.getProductByCategory(id).subscribe(res => {
      if (res.product) {
        this.products = res.product
        this.loader.hide()
      } else {
        this.toaster.error('товаров в этой категории не найдено')
        this.loader.hide()
      }
    }, error => {
      this.toaster.error('что то пошло не так')
      this.loader.hide()
    })
  }

  AllProduct() {
    this.loader.show()
    this.productService.getProducts().subscribe(res => {
      this.products = res.product
      this.loader.hide()
    }, error => {
      this.toaster.error('ошибка сервера')
      this.loader.hide()
    })
  }
}
