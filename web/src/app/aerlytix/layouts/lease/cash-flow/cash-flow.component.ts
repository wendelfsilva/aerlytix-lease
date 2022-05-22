import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, tap } from 'rxjs';
import { CashFlow } from 'src/app/aerlytix/models/cash-flow';
import { CashFlowService } from 'src/app/aerlytix/services/cash-flow.service';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit {

  @Input() lease?: number;
  @Input() broker?: Subject<void>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = [
    'due_date',
    'cash_flow',
    'mr_balance',
    'description'
  ];
  dataSource: MatTableDataSource<CashFlow> = new MatTableDataSource<CashFlow>();
  length = 0;

  constructor(
    private service: CashFlowService,
  ) {
  }

  ngOnInit(): void {
    this.createPaginator();
    this.search();

    this.broker?.subscribe(() => this.search());
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

  search(): void {
    this.service.clearParams();
    this.service.addParams('limit', this.paginator.pageSize);
    this.service.addParams('offset', (this.paginator.pageIndex * this.paginator.pageSize));
    this.service.addParams('lease', this.lease);
    this.service.paginated()
      .subscribe((response) => {
        this.length = response.count;
        this.dataSource.data = response.results;
      });
  }
}
