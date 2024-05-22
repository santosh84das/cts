import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indent-capture',
  templateUrl: './indent-capture.component.html',
  styleUrls: ['./indent-capture.component.scss']
})
export class IndentCaptureComponent implements OnInit {

  displayInsertModal?: boolean;
  constructor() { }

  ngOnInit(): void {
  }


  showInsertDialog() {
    this.displayInsertModal = true;
  }


  addStampIndent() {
    
  }
}
