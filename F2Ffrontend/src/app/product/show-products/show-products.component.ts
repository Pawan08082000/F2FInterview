import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss'],
})
export class ShowProductsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'Edit'];

  ELEMENT_DATA = [] as any;
  id: any;
  dataSource: any;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.showProduct().subscribe((data) => {
      console.log(data);

      for (let i in data) {
        this.id = data[i]._id;
        this.ELEMENT_DATA.push({
          name: data[i].name,
          description: data[i].description,
          Id: data[i]._id,
        });
      }
      console.log(this.ELEMENT_DATA);
      this.dataSource = this.ELEMENT_DATA;
    });
  }

  editProduct(object: any) {
    this.router.navigateByUrl(`/product/add/${object.Id}`);
  }
  deleteProduct(object:any){
    this.productService.deleteProduct(object.Id).subscribe(
      (data)=>{
        console.log(data.message);
      }
    )
  }
  createNewProduct(){
    this.router.navigateByUrl(`/product/add`);
  }
  confirmBox(object:any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(object.Id).subscribe(
          (data)=>{
            console.log(data.message)
          },
          (err)=>{
            console.log(err)
          }
        )
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
  }
}

