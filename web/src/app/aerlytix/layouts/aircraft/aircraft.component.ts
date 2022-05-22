import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@shared/layouts/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@shared/services/translate.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { Aircraft } from '../../models/aircraft';
import { AircraftService } from '../../services/aircraft.service';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss']
})
export class AircraftComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  formGroup = this.fb.group({
    id: [null],
    description: [null]
  });

  displayedColumns = [
    'id',
    'description',
    'valuation_date',
    'appraised_value',
    'depreciation_rate',
    'check_interval',
    'modified_at',
    'actions'
  ];
  dataSource: MatTableDataSource<Aircraft> = new MatTableDataSource<Aircraft>();
  length = 0;

  constructor(
    private fb: FormBuilder,
    private service: AircraftService,
    private toast: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private title: Title
  ) {
    this.title.setTitle("Aircraft");
  }

  ngOnInit(): void {
    this.createPaginator();
    this.search();
  }

  createPaginator(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.paginator.pageSizeOptions = [5, 10, 25, 50];
    this.paginator.showFirstLastButtons = true;
    this.paginator.page
      .pipe(tap(() => this.search()))
      .subscribe();
  }

  search(): any {
    this.service.clearParams();
    this.service.addParams('limit', this.paginator.pageSize);
    this.service.addParams('offset', (this.paginator.pageIndex * this.paginator.pageSize));

    if (this.formGroup.value.id) {
      this.service.addParams('id', this.formGroup.value.id);
    }
    if (this.formGroup.value.description) {
      this.service.addParams('description', this.formGroup.value.description);
    }

    this.service.paginated()
      .subscribe((response) => {
        this.length = response.count;
        this.dataSource.data = response.results;
      });
  }

  delete(obj: Aircraft): void {
    const config = {
      data: {
        title: 'actions.delete',
        message: 'general.confirm_delete',
        detail: `${obj.description}`
      }
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config);
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.service.delete(obj.id!)
          .subscribe(() => {
            this.toast.success('general.successfully_delete');
            this.search();
          });
      }
    });
  }

  goTo(route: string): void {
    this.router.navigate([route])
      .then();
  }
}

