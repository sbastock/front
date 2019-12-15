import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  IPOid: number;
  price: number;
  opendate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {IPOid: 1, name: 'Hydrogen', price: 1.0079, opendate: '2019-12-15'},
  {IPOid: 2, name: 'Helium', price: 4.0026, opendate: '2019-11-11'},
  {IPOid: 3, name: 'Lithium', price: 6.941, opendate: '2018-10-20'},
  {IPOid: 4, name: 'Beryllium', price: 9.0122, opendate: '2018-09-20'},
  {IPOid: 5, name: 'Boron', price: 10.811, opendate: '2019-11-10'},
  {IPOid: 6, name: 'Carbon', price: 12.0107, opendate: '2018-12-31'},
  {IPOid: 7, name: 'Nitrogen', price: 14.0067, opendate: '2019-01-22'},
  {IPOid: 8, name: 'Oxygen', price: 15.9994, opendate: '2019-02-20'},
  {IPOid: 9, name: 'Fluorine', price: 18.9984, opendate: '2019-06-10'},
  {IPOid: 10, name: 'Neon', price: 20.1797, opendate: '2019-12-01'},
];

@Component({
  selector: 'app-user-ipos',
  templateUrl: './user-ipos.component.html',
  styleUrls: ['./user-ipos.component.css']
})
export class UserIposComponent {

    displayedColumns: string[] = ['IPOid', 'name', 'price', 'opendate'];
    dataSource = ELEMENT_DATA;

  constructor() { }


}
