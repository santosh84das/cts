import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { RouterLink } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Master',
                items: [
                    { 
                        label: 'Pension', icon: 'pi pi-fw pi-box',
                        items: [ 
                            { label: 'Primary', icon: 'pi pi-fw pi-bookmark',routerLink: ['/master/app-pension/app-primary'] },
                            { label: 'Sub Category', icon: 'pi pi-fw pi-bookmark',routerLink: ['/master/app-pension/app-sub-category'] },

                     ]
                        
                     },
                     { label: 'Component', icon: 'pi pi-fw pi-box',routerLink: ['/master/app-pension/component'] },
                     { label: 'Component Rate', icon: 'pi pi-fw pi-box',routerLink: ['/master/app-pension/component-rate'] },
                     { label: 'Classification', icon: 'pi pi-fw pi-box' },
                     { label: 'Classification type', icon: 'pi pi-fw pi-box' },
                ]
            },
            {
                label: 'Pension',
                items: [
                    {
                        label: 'Pension Process', icon: 'assets/layout/images/icons/pension-process.png',
                        items: [
                            {
                                label: 'PPO', icon: 'assets/layout/images/icons/vendor-entry.png',
                                items: [
                                    { label: 'Entry', icon: 'assets/layout/images/icons/pension-entry.png',
                                        items: [
                                            { label: 'PPO Details', icon: 'assets/layout/images/icons/copywriter.png' , routerLink: ['/pension/modules/pension-process/ppo/entry/ppodetails'] },
                                        ]
                                     },
                                    { label: 'Convert to Family Pension', icon: 'assets/layout/images/icons/family-pension.png' , routerLink: ['/pension/modules/pension-process/ppo/convert-to-family-pension'] },
                                    { label: 'Life Certificate', icon: 'assets/layout/images/icons/life-certification.png' , routerLink: ['/pension/modules/pension-process/ppo/life-certificate'] },
                                    // { label: 'PPO Search', icon: 'assets/layout/images/icons/work-in-progress.png'  },
                                    // { label: 'Convert Family to Family', icon: 'assets/layout/images/icons/work-in-progress.png'  },
                                    // { label: 'CPF- Cum Gratuity', icon: 'assets/layout/images/icons/work-in-progress.png'  },
                                    // { label: 'ePPO', icon: 'assets/layout/images/icons/work-in-progress.png'  },
                                    { label: 'Manual PPO Receipt', icon: 'assets/layout/images/icons/ppo-receipt.png', routerLink: ['/pension/modules/pension-process/ppo/manualPpoReceipt'] },
                                ]
                            },
                            {
                                label: 'Pensioner Details', icon: 'assets/layout/images/icons/work-in-progress.png', routerLink: ['/pension/modules/pension-process/pensioner-details']
                                // items: [
                                //     { label: 'Revision of Components', icon: 'pi pi-fw pi-bookmark' },
                                //     { label: 'By Transfer', icon: 'pi pi-fw pi-bookmark' },
                                //     { label: 'EFP/CVP/ Age calc', icon: 'pi pi-fw pi-bookmark' },
                                // ]
                            },
                            {
                                label: 'Pension Bill', icon: 'assets/layout/images/icons/bills.png', routerLink: ['/pension/modules/pension-process/pension-bill']
                                // items: [
                                //     { label: 'First Pension', icon: 'pi pi-fw pi-bookmark',
                                //         items: [
                                //             { label: 'General', icon: 'pi pi-fw pi-bookmark',routerLink: ['/pension/modules/pension-process/pension-bill']  },
                                           
                                //         ]
                                //      },
                                //     { label: 'Regular Pension', icon: 'pi pi-fw pi-bookmark' },
                                //     { label: 'Arrear Pension', icon: 'pi pi-fw pi-bookmark' },
                                //     { label: 'Life Time Arrear', icon: 'pi pi-fw pi-bookmark' },
                                //     { label: 'Money Pension', icon: 'pi pi-fw pi-bookmark' },
                                //     { label: 'Transfer', icon: 'pi pi-fw pi-bookmark' },
                                //     { label: 'Extragia Pension', icon: 'pi pi-fw pi-bookmark' },
                                //     { label: 'DA Arrear Pension', icon: 'pi pi-fw pi-bookmark' },
                                //     { label: 'LTA Classification Bill', icon: 'pi pi-fw pi-bookmark' },
                                // ]
                            },
                            // {
                            //     label: 'Approval', icon: 'assets/layout/images/icons/work-in-progress.png',
                            //     items: [
                            //         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            //         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            //         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                            //     ], 
                            //     routerLink: ['/']
                            // },
                            // {
                            //     label: 'Bill Print', icon: 'assets/layout/images/icons/work-in-progress.png',
                            //     items: [
                            //         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            //         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            //         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                            //     ]
                            //     routerLink: ['/']
                            // }
                            // {
                            //     label: 'File Upload', icon: 'pi pi-fw pi-bookmark',
                            //     items: [
                            //         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                            //     ]
                            // },
                            // {
                            //     label: 'Send to Epradan', icon: 'pi pi-fw pi-bookmark',
                                
                            // },
                            // {
                                
                            //     label: 'Court Case entry', icon: 'pi pi-fw pi-bookmark',
                                
                            // },
                        ]
                    },
                    {
                        label: 'Pension Report', icon: 'assets/layout/images/icons/work-in-progress.png',
                        items: [
                            {label: 'Manual PPO Register', icon: 'assets/layout/images/icons/ppo-receipt.png', routerLink: ['/pension/modules/pension-reports/manual-ppo-register'] }
                            // {
                            //     label: 'PPO Details', icon: 'pi pi-fw pi-bookmark',
                            //     items: [
                            //         { label: 'Components Payable details', icon: 'pi pi-fw pi-bookmark' },
                            //         { label: 'TDS Details', icon: 'pi pi-fw pi-bookmark',
                            //             items: [
                            //                 { label: 'TDS Summery -EC-110', icon: 'pi pi-fw pi-bookmark' },
                            //                 { label: 'TDS Pension Details TR 10 IFMS | EC-111', icon: 'pi pi-fw pi-bookmark' },
                            //             ]
                            //          },
                            //          { label: 'Approved PPO DetailsEC-112', icon: 'pi pi-fw pi-bookmark' },
                            //          { label: 'Life Certificate Not Submitted', icon: 'pi pi-fw pi-bookmark' },
                            //     ]
                            // },
                            // {
                            //     label: 'Bill', icon: 'pi pi-fw pi-bookmark',
                            //     items: [
                            //         { label: 'Bank Register(All Bills)-EC-114', icon: 'pi pi-fw pi-bookmark' },
                            //         { label: 'Bank Register-EC-115', icon: 'pi pi-fw pi-bookmark' },
                            //         { label: ' Transferred PPOs Register-EC-116', icon: 'pi pi-fw pi-bookmark' },
                            //     ]
                            // },
                            // { label: 'Pension Master-EC-117', icon: 'pi pi-fw pi-bookmark' },  
                            // { label: 'Pensioner Bank Details-EC-118', icon: 'pi pi-fw pi-bookmark' },
                            // { label: 'Suspended PPO-EC-119', icon: 'pi pi-fw pi-bookmark' },
                            // { label: 'Pensioner Master-EC-120', icon: 'pi pi-fw pi-bookmark' },
                            // { label: 'Pension EFP TO NFP-EC-121', icon: 'pi pi-fw pi-bookmark' },
                            // { label: 'Converted Family Pension-EC-122', icon: 'pi pi-fw pi-bookmark' },
                            // { label: 'Pension Component Rate-EC-123', icon: 'pi pi-fw pi-bookmark' },
                            // { label: 'PPO Master-EC-124', icon: 'pi pi-fw pi-bookmark' },
                                                  
                            
                        ]
                    },
                    {
                        label: 'Pension Query', icon: 'assets/layout/images/icons/work-in-progress.png', 
                        // items: [
                        //     {
                        //         label: 'Pensioner Details', icon: 'pi pi-fw pi-bookmark',
                        //         items: [
                        //             { label: 'Breakup Details', icon: 'pi pi-fw pi-bookmark' },
                                   
                        //         ]
                        //     },
                            
                        // ],
                        routerLink: ['/pension/modules/pension-query']
                    },
                    // {                             
                    //     label: 'Festival Master', icon: 'assets/layout/images/icons/work-in-progress.png'//, routerLink: ['/']
                        
                    // },
                    // {
                                
                    //     label: 'Festival Details', icon: 'assets/layout/images/icons/work-in-progress.png'//, routerLink: ['/']
                        
                    // },
                ]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Prime Blocks',
                items: [
                    { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },
            {
                label: 'Utilities',
                items: [
                    { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                    { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                    }
                ]
            }
        ];
    }
}
