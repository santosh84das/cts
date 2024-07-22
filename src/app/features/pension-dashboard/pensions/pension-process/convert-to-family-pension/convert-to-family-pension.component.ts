import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Customer } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CountryService } from 'src/app/demo/service/country.service';

interface expandedRows {
  [key: string]: boolean;
}
@Component({
  selector: 'app-convert-to-family-pension',
  templateUrl: './convert-to-family-pension.component.html',
  styleUrls: ['./convert-to-family-pension.component.scss']
})
export class ConvertToFamilyPensionComponent implements OnInit {

  selectedDrop: SelectItem = { value: '' };
  countries: any[] | undefined;
  cities: SelectItem[] = [];
  susselectedDrop: SelectItem = { value: '' };
  susType: SelectItem[] = [];
  relationship: SelectItem = {value: ''};
  relatype: SelectItem[] = [];
  relationship1:SelectItem = {value: ''};
  relatype1:SelectItem[] = [];
  relationship2:SelectItem = {value: ''};
  relatype2:SelectItem[] = [];
  relationship3:SelectItem = {value: ''};
  relatype3:SelectItem[] = [];
  relationship4:SelectItem = {value: ''};
  relatype4:SelectItem[] = [];
  relationship5:SelectItem = {value: ''};
  relatype5:SelectItem[] = [];
  selectedDrop1: SelectItem = { value: '' };
  cities1:SelectItem[] = [];
  selectedDrop2: SelectItem = { value: '' };
  cities2:SelectItem[] = [];
  selectedDrop3: SelectItem = { value: '' };
  cities3:SelectItem[] = [];
  selectedDrop4: SelectItem = { value: '' };
  cities4:SelectItem[] = [];
  selectedDrop5: SelectItem = { value: '' };
  cities5:SelectItem[] = [];
  SelectItem = { value: '' };
  
  rowGroupMetadata: any;
  expandedRows: expandedRows = {};
  isExpanded: boolean = false;
  products: Product[] = [];
  valCheck: string[] = []

  customers1: Customer[] = [{
    name: 'amit'
  }];

    customers2: Customer[] = [];
    customers3: Customer[] = [
      {
        name: 'Amit',
        country: { code: 'IN', name: 'India' },
        company: 'Example Company',
        status: 'Active',
        date: '2024-07-21',
        representative: { name: 'John Doe', image: 'john_doe.png' }
      },
      // Add more customer objects as needed
    ];



  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.getCountries().then(countries => {
      return this.countries = countries;
    })
    this.susType = [
      { label: 'Pension', value: { id: 1, name: 'Pension', code: 'Pension' } },
      { label: 'Terminated', value: { id: 2, name: 'Terminated', code: 'terminated' } },
    ];

    this.cities = [
      { label: 'Suspend', value: { id: 1, name: 'Suspend', code: 'suspand' } },
    ];

    this.cities1 = [
      { label: 'Suspend', value: { id: 1, name: 'Suspend', code: 'suspand' } },
    ];

    this.cities2 = [
      { label: 'Suspend', value: { id: 1, name: 'Suspend', code: 'suspand' } },
    ];

    this.cities3 = [
      { label: 'Suspend', value: { id: 1, name: 'Suspend', code: 'suspand' } },
    ];

    this.cities4 = [
      { label: 'Suspend', value: { id: 1, name: 'Suspend', code: 'suspand' } },
    ];

    this.cities5 = [
      { label: 'Suspend', value: { id: 1, name: 'Suspend', code: 'suspand' } },
    ];

    this.relatype=[
      { label: 'Wife', value: { id: 1, name: 'Wife',code:'wife' }},
      { label: 'Son', value: { id: 2, name: 'Son',code:'Son' }},
      { label: 'Daughter', value: { id: 3, name: 'Daughter',code:'Daughter' }},
      { label: 'Select', value: { id: 4, name: 'Select',code:'Select' }}
    ]

    this.relatype1=[
      { label: 'Wife', value: { id: 1, name: 'Wife',code:'wife' }},
      { label: 'Son', value: { id: 2, name: 'Son',code:'Son' }},
      { label: 'Daughter', value: { id: 3, name: 'Daughter',code:'Daughter' }},
      { label: 'Select', value: { id: 4, name: 'Select',code:'Select' }}
    ]

    this.relatype2=[
      { label: 'Wife', value: { id: 1, name: 'Wife',code:'wife' }},
      { label: 'Son', value: { id: 2, name: 'Son',code:'Son' }},
      { label: 'Daughter', value: { id: 3, name: 'Daughter',code:'Daughter' }},
      { label: 'Select', value: { id: 4, name: 'Select',code:'Select' }}
    ]

    this.relatype3=[
      { label: 'Wife', value: { id: 1, name: 'Wife',code:'wife' }},
      { label: 'Son', value: { id: 2, name: 'Son',code:'Son' }},
      { label: 'Daughter', value: { id: 3, name: 'Daughter',code:'Daughter' }},
      { label: 'Select', value: { id: 4, name: 'Select',code:'Select' }}
    ]

    this.relatype4=[
      { label: 'Wife', value: { id: 1, name: 'Wife',code:'wife' }},
      { label: 'Son', value: { id: 2, name: 'Son',code:'Son' }},
      { label: 'Daughter', value: { id: 3, name: 'Daughter',code:'Daughter' }},
      { label: 'Select', value: { id: 4, name: 'Select',code:'Select' }}
    ]

    this.relatype5=[
      { label: 'Wife', value: { id: 1, name: 'Wife',code:'wife' }},
      { label: 'Son', value: { id: 2, name: 'Son',code:'Son' }},
      { label: 'Daughter', value: { id: 3, name: 'Daughter',code:'Daughter' }},
      { label: 'Select', value: { id: 4, name: 'Select',code:'Select' }}
    ]
  }
  onSort() {
    this.rowGroupMetadata();
}


  expandAll() {
    this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');



  }
}
