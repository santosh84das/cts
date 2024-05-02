import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
interface Chequetype {
  name: string;
  code: Number;
}
interface micrcode {
  name: string,
  code: string
}

interface users {
  name: string,
  code: string
}
@Component({
  selector: 'app-new-distribution',
  templateUrl: './new-distribution.component.html',
  styleUrls: ['./new-distribution.component.scss']
})
export class NewDistributionComponent implements OnInit {

  distributionForm!: FormGroup;
  cheques!: Chequetype[];
  micrCodeList!: micrcode[];
  selectedMicrCode?: string;
  isVisible: boolean = false;
  isShowUserList: boolean = false;
  userList!: users[];
  selectedUser?: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cheques = [
      { name: 'Treasury Cheque', code: 1 },
      { name: 'Othres', code: 2 }
    ];
    this.micrCodeList=[
      {name:'1234-1234-1234-1234',code:'1'},
      {name:'2341-3422-44434-2345',code:'1'},
    ]
    this.userList= [
      {name:'User 1',code:'1'},
      {name:'User 2',code:'2'},
      {name:'User 3',code:'3'},
    ]
    this.distributionForm = this.fb.group({
      cheques_type: [''],
      // micr_code: [''],
      user_list: ['']
    })
  }

  showMicrList(){
    this.isVisible = !this.isVisible;
  }

  showUserList(){
    this.isShowUserList = !this.isShowUserList
  }

}
