# Implementing Pensioner Status Component

This guide describes how to implement the existing pensioner-status component in any component of your Angular application.

## Steps to Implement

1. Import PensionerStatusComponent in your module:
   Ensure that the module where you want to use the pensioner-status component imports it. In your module file (e.g., `app.module.ts` or a feature module):

   ```typescript
   import { PensionerStatusComponent } from './path-to/pensioner-status.component';

   @NgModule({
     declarations: [
       // ... other components
       PensionerStatusComponent
     ],
     // ... other module metadata
   })
   export class YourModule { }

2. Use the component in your template:
In the template of the component where you want to use pensioner-status, add the following:
    ```typescript
   <app-pensioner-status
    [approvedText]="'Active'"
    [notApprovedText]="'Inactive'"
    [readonly]="false"
    [ppoId]="123"
    [statusFlag]="1"
    ></app-pensioner-status>

3. If using within a reactive form:
In your component's TypeScript file:
    ```typescript
    import { FormBuilder, FormGroup } from        '@angular/forms';

    export class YourComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
    this.form = this.fb.group({
      // ... other form controls
      pensionerStatus: [''] // Add form control for pensioner status
            });
        }
    }

4. Then in the template 
    ```typescript
   <form [formGroup]="form">
    <!-- ... other form fields -->
    <app-pensioner-status
    formControlName="pensionerStatus"
    [approvedText]="'Active'"
    [notApprovedText]="'Inactive'"
    [readonly]="false"
    [ppoId]="123"
    [statusFlag]="1"
  ></app-pensioner-status>
</form>

5. Customize the component:
You can customize the pensioner-status component by changing the input values:

    * approvedText: Text for approved status (default: 'Approved')
    * notApprovedText: Text for not approved status (default: 'Not Approved')
    * readonly: Set to true to make the dropdown read-only (default: false)
    * ppoId: The PPO ID to use for API calls
    * statusFlag: The status flag to use for API calls


6. Handle status changes:
If you need to react to status changes, you can add an event binding:
    ```typescript
    <app-pensioner-status
    (statusChange)="onStatusChange($event)"
    ...
    ></app-pensioner-status>

7. Then in your component:
    ```typescript
    onStatusChange(newStatus: number) {
    console.log('New status:', newStatus);
    // Handle the status change
    }

8. Ensure necessary services are provided:
Make sure that the PensionerStatusService and ToastService (or equivalents) are provided in your module or component.

    

    