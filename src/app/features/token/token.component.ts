import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  closeButton(event: any) {
    this.router.navigate(["/"]);
  }

}
