import { Component, OnInit } from '@angular/core';
import { Sector } from '../models/Sector';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  sectors: Sector[];

  constructor() {
  }

  ngOnInit() {
  }

}
