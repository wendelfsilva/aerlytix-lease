import { DragDropModule } from "@angular/cdk/drag-drop";
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { DateFormatDirective } from "@shared/directives/date-format.directive";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ConfirmDialogComponent } from './layouts/confirm-dialog/confirm-dialog.component';
import { ToastService } from "./services/toast.service";
import { TranslateService } from "./services/translate.service";


const BASE = [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    LayoutModule,
    ReactiveFormsModule,
    TranslateModule,
    CurrencyMaskModule,
];

const MATERIAL = [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTabsModule,
    MatExpansionModule,
    MatGridListModule,
    MatStepperModule,
    MatChipsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDialogModule,
];

const DIRECTIVES = [
    DateFormatDirective,
];


@NgModule({
    declarations: [
        ...DIRECTIVES,
        ConfirmDialogComponent,
    ],
    imports: [
        ...BASE,
        ...MATERIAL,
        DragDropModule,
    ],
    exports: [
        ...BASE,
        ...MATERIAL,
        ...DIRECTIVES,
        DragDropModule,
    ],
    providers: [
        TranslateService,
        ToastService,
        MatDatepickerIntl
    ],
})
export class SharedModule {
}
