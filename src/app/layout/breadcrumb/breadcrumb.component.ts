import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/layout/service/breadcrumb-service.service';
import { LayoutService } from '../service/app.layout.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<{ label: string, routerLink: string }> = [];
  home: MenuItem | undefined;
  constructor(public layoutService: LayoutService,private breadcrumbService: BreadcrumbService, private router: Router, private activatedRoute: ActivatedRoute,private location: Location) { }

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateBreadcrumbs(this.activatedRoute.root);
      }
    });

    // Retrieve breadcrumb data from local storage on component initialization
    const storedBreadcrumbs = localStorage.getItem('breadcrumbs');
    if (storedBreadcrumbs) {
      this.breadcrumbs = JSON.parse(storedBreadcrumbs);
    }
  }

  updateBreadcrumbs(route: ActivatedRoute) {
    const breadcrumbs: Array<{ label: string, routerLink: string }> = [];

    while (route) {
      const data = route.snapshot.data;
      if (data && data['breadcrumb']) {
        const existingBreadcrumb = breadcrumbs.find(breadcrumb => breadcrumb.label === data['breadcrumb']);
        if (!existingBreadcrumb) {
          let breadcrumbLabel = data['breadcrumb'];
          // if(data['breadcrumb']==='Application'){
          //   const queryParams = route.snapshot.queryParams;
          //   if (queryParams && queryParams['title']) {
          //     breadcrumbLabel = queryParams['title'];
          //   }
          // }
          
          // breadcrumbs.unshift({ label: breadcrumbLabel, routerLink: route.snapshot.url.map(segment => segment.path) });
          breadcrumbs.unshift({ label: breadcrumbLabel, routerLink: this.router.url});
        }
      }
      route = route.firstChild as ActivatedRoute;
    }

    this.breadcrumbs = breadcrumbs.reverse();

    // Store breadcrumb data in local storage
    localStorage.setItem('breadcrumbs', JSON.stringify(this.breadcrumbs));
  }
  pageReload(){
    window.location.reload();
  }
  goBack(){
    this.location.back();
    // let previousLink = '/';
    // console.log(this.breadcrumbs.length);
    
    // if(this.breadcrumbs.length>1){
    //   previousLink = this.breadcrumbs.slice(-2, -1)[0].routerLink[0];
    // }
    // this.router.navigate([previousLink]);
  }
}
