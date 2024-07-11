import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sanction',
  templateUrl: './sanction.component.html',
  styleUrls: ['./sanction.component.scss']
})
export class SanctionComponent implements OnInit {

  ppoSanctionForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.initializer();
  }

  initializer(): void {
    this.ppoSanctionForm = this.fb.group({
      transferredPpoNo: ['', Validators.required],
      ePpoSearchDetails: ['', Validators.required]
    });
  }

  onSearch(): void {
    if (this.ppoSanctionForm.valid) {
      console.log(this.ppoSanctionForm.value); // Replace with your actual search logic
    }
  }
}



