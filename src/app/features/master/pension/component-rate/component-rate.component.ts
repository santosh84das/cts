import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-component-rate',
  templateUrl: './component-rate.component.html',
  styleUrls: ['./component-rate.component.scss']
})
export class ComponentRateComponent implements OnInit {
  ComponentRateForm = new FormGroup({
    // added
    rate:  new FormControl('',Validators.required),
    pensionCategoryId: new FormControl('',Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onRefresh(){
    console.log(this.ComponentRateForm.value);
  }

  searchOne(){
    console.log("Search One");
  }

  searchTwo(){
    console.log("Search Two");
  }

}