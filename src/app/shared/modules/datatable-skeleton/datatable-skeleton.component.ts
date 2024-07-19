import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable-skeleton',
  templateUrl: './datatable-skeleton.component.html',
  styleUrls: ['./datatable-skeleton.component.scss']
})
export class DatatableSkeletonComponent implements OnInit {

  products: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.products = ["Item #0", "Item #1", "Item #2", "Item #3", "Item #4"]
  }

}
