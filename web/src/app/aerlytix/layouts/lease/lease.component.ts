import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@shared/layouts/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { Lease } from '../../models/lease';
import { LeaseService } from '../../services/lease.service';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.scss']
})
export class LeaseComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  formGroup = this.fb.group({
    id: [null],
    aircraft: [null],
    start_date: [null],
    end_date: [null],
  });

  displayedColumns = [
    'id',
    'aircraft',
    'economic_closing_date',
    'net_price',
    'start_date',
    'end_date',
    'monthly_rent',
    'monthly_mr_rent',
    'actions'
  ];
  dataSource: MatTableDataSource<Lease> = new MatTableDataSource<Lease>();
  length = 0;

  constructor(
    private fb: FormBuilder,
    private service: LeaseService,
    private toast: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private title: Title
  ) {
    this.title.setTitle("Lease");
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
    if (this.formGroup.value.aircraft) {
      this.service.addParams('aircraft_description', this.formGroup.value.aircraft);
    }
    if (this.formGroup.value.start_date && this.formGroup.value.end_date) {
      this.service.addParams("start_date", this.formGroup.value.start_date);
      this.service.addParams("start_date", this.formGroup.value.end_date);
    } else if (this.formGroup.value.start_date && !this.formGroup.value.end_date) {
      this.service.addParams("start_date", this.formGroup.value.start_date);
      this.service.addParams("start_date", this.formGroup.value.start_date);
    } else if (!this.formGroup.value.start_date && this.formGroup.value.end_date) {
      this.service.addParams("start_date", this.formGroup.value.end_date);
      this.service.addParams("start_date", this.formGroup.value.end_date);
    }

    this.service.paginated()
      .subscribe((response) => {
        this.length = response.count;
        this.dataSource.data = response.results;
      });
  }

  delete(obj: Lease): void {
    const config = {
      data: {
        title: 'actions.delete',
        message: 'general.confirm_delete',
        detail: `${obj.aircraft_obj?.description}`
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

