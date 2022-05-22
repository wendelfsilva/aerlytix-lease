import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { Subject } from 'rxjs';
import { Aircraft } from 'src/app/aerlytix/models/aircraft';
import { AircraftService } from 'src/app/aerlytix/services/aircraft.service';
import { LeaseService } from 'src/app/aerlytix/services/lease.service';

@Component({
  selector: 'app-lease-item',
  templateUrl: './lease-item.component.html',
  styleUrls: ['./lease-item.component.scss']
})
export class LeaseItemComponent implements OnInit {

  formGroup = this.fb.group({
    id: [null],
    aircraft: [null, Validators.required],
    economic_closing_date: [null, Validators.required],
    net_price: [null, Validators.required],
    start_date: [null, Validators.required],
    end_date: [null, Validators.required],
    monthly_rent: [null, Validators.required],
    monthly_mr_rent: [null, Validators.required],
    expected_irr: [null],
  });

  aircrafts: Aircraft[] = [];

  broker: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private service: LeaseService,
    private aircraftService: AircraftService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
    private title: Title
  ) {
    this.title.setTitle("Lease");
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        if (params['action'] !== 'new') {
          this.retrieve(params['action']);
        }
      });

    this.fetchAircrafs();
  }

  fetchAircrafs(): void {
    this.aircraftService.clearParams();
    this.aircraftService.all()
      .subscribe(response => {
        this.aircrafts = response;
      });
  }

  retrieve(pk: number): void {
    this.service.retrieve(pk)
      .subscribe(response => {
        this.formGroup.reset(response);
      });
  }

  saveOrUpdate(): void {
    if (this.formGroup.value.id) {
      this.service.update(this.formGroup.value.id, this.formGroup.value)
        .subscribe((response) => {
          this.formGroup.reset(response);
          this.toast.success('general.successfully_update');
          this.broker.next();
        });
    } else {
      this.service.create(this.formGroup.value)
        .subscribe((response) => {
          this.formGroup.reset(response);
          this.toast.success('general.successfully_save');
          this.broker.next();
        });
    }
  }

  goTo(route: string): void {
    this.router.navigate([route])
      .then();
  }

  cancel(): void {
    this.goTo('/lease');
  }
}
