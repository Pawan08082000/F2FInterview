import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addProductForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
  });

  urlLength: any;
  productId: any;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

ngOnInit() {
    console.log(window.location.href.split('/'))
    this.urlLength = window.location.href.split('/').length;
    console.log(this.urlLength);
    if (this.urlLength == 6) {
      this.activatedRoute.params.subscribe((params) => {
        this.productId = params.id;
      });
      console.log(this.productId);
      this.productService.getProductById(this.productId).subscribe(
        (data) => {
          this.addProductForm.patchValue(data);
        },
        (err) => {}
      );
    }
  }

  onSubmit(): void {
    console.log(this.addProductForm);
    if (this.addProductForm) {
      this.productService
        .addProduct(
          this.addProductForm.value.name,
          this.addProductForm.value.description
        )
        .subscribe(() => {
          this.router.navigateByUrl('/product/show');
        });
    }
  }
}
