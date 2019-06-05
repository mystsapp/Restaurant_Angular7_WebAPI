import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orderList;

  constructor(private orderService: OrderService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.orderService.getOrderList().then(res => this.orderList = res);
  }

  openForEdit(orderID: number) {
    this.router.navigate(['/order/edit/' + orderID]);
  }

  onOrderDelete(id: number) {

    if(confirm('Are you sure to delete this record?')) {
      this.orderService.deleteOrder(id).then( res => {
        this.refreshList();
        this.toastr.warning('Deleted Successfully', 'Restaurant App.');
      });
    }
  }

}
