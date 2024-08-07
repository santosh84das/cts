//module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { ComponentRateComponent } from './component-rate.component';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext'; // Import InputTextModule
import { FieldsetModule } from 'primeng/fieldset'; // Import FieldsetModule
import { RouterModule, Routes } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MhPrimeDynamicTableModule } from 'mh-prime-dynamic-table';

const routes: Routes = [
  {path: "",component: ComponentRateComponent}
];

@NgModule({
  declarations: [ComponentRateComponent],
  imports: [
    DialogModule,
    CommonModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
    ButtonModule,
    RadioButtonModule,
    InputTextModule, // Add InputTextModule here
    FieldsetModule, // Add FieldsetModule here
    MhPrimeDynamicTableModule, // Add MhPrimeDynamicTableComponent here
    RouterModule.forChild(routes),

  ],
  providers: [DialogService, MessageService, ConfirmationService],
  exports:[ComponentRateComponent],
  bootstrap: [ComponentRateComponent]
})
export class ComponentRateModule { }
