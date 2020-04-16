import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';

interface IOrder{
  pid: number;
  image: string;
  description: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<any> = [];
  name = '';
  errorMessage = '';
  confirmMessage = '';
  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {
  }

  async ngOnInit() {
    this.loadDefaultOrders();
  }

  loadDefaultOrders(){
    this.orders=[{
      'pid': '1',
      'image':'assets/sm_android.jpeg',
      'description': 'Android',
      'price': 150.00,
      'quantity': 2
    }, {
      'pid': '2',
      'image':'assets/sm_iphone.jpeg',
      'description': 'IPhone',
      'price': 200.00,
      'quantity': 1
    }, {
      'pid': '3',
      'image':'assets/sm_windows.jpeg',
      'description': 'Windows Phone',
      'price': 110.00,
      'quantity': 2
    }]
  }


delete(index: number) {
  this.orders.splice(index,1);
  }

addItem(item: string){
  switch (item) {
      case 'android':
        this.orders.unshift({
        'pid': '1',
        'image':'assets/sm_android.jpeg',
        'description': 'Android',
        'price': 150.00,
        'quantity': 1
          });
          break;
      case 'iphone':
          this.orders.unshift({
            'pid': '2',
            'image':'assets/sm_iphone.jpeg',
            'description': 'IPhone',
            'price': 200.00,
            'quantity': 1
          });
          break;
      case 'windows phone':
      this.orders.unshift({
        'pid': '3',
        'image':'assets/sm_windows.jpeg',
        'description': 'Windows Phone',
        'price': 110.00,
        'quantity': 1
          });
          break;
      }
    }

    submit(){
      const commaIndex = this.name.indexOf(', ');
      const firstName = this.name.slice(commaIndex + 1, this.name.length);
      const lastName = this.name.slice(0, commaIndex);
      const fullName = firstName + ' ' + lastName;
      let error = false;
      console.log('this.name', this.name, 'commaIndex', commaIndex, 'firstName', firstName, 'lastName', lastName);


      if(this.name === ''){
        console.log('Name must not be empty!')
        error = true;
        this.errorMessage = 'Name must not be empty!';
      }

      else if(commaIndex === -1){
        console.log('Name must have a comma!');
        error = true;
        this.errorMessage = 'Name must have a comma!';

      }


      if(!error){ 
      const firstName = this.name.slice(commaIndex + 1, this.name.length);
      const lastName = this.name.slice(0, commaIndex);
      const fullName = firstName + ' ' + lastName;
      this.calculate();
      const calculation = this.calculate();
      this.confirmMessage = `Thank you for your order ${fullName}. Your sub total is: ${calculation.subTotal}. Your tax amount is ${calculation.taxAmount}. Your total is ${calculation.total}`;
      this.flexModal.openDialog('confirm-modal');
      }

      else {
        this.flexModal.openDialog('error-modal');
      }
     }
     
     clear (){
      this.orders == this.orders.map((item,i) => {
      item.quantity = '';
      item.price='';
      return item;
      });
      }
    
  calculate(){
    const total = this.orders.reduce((inc, item, i, arr) => {
        inc += item.price * item.quantity;
        return inc;
    }, 0);
    const taxAmount = total *.15;
    const subTotal = total- taxAmount;

    console.log('from calculate() total: ', total, 'taxAmount', taxAmount, 'subTotal', subTotal, );
    return{
      total: total,
      taxAmount: taxAmount,
      subTotal: subTotal
    }
  }

}

