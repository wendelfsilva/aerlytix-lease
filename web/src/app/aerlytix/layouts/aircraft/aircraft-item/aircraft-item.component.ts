import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { TranslateService } from '@shared/services/translate.service';
import { AircraftService } from 'src/app/aerlytix/services/aircraft.service';

@Component({
  selector: 'app-aircraft-item',
  templateUrl: './aircraft-item.component.html',
  styleUrls: ['./aircraft-item.component.scss']
})
export class AircraftItemComponent implements OnInit {
  formGroup = this.fb.group({
    id: [null],
    description: [null, Validators.required],
    valuation_date: [null, Validators.required],
    appraised_value: [null, Validators.required],
    depreciation_rate: [null, Validators.required],
    initial_used_life: [null, Validators.required],
    check_interval: [null, Validators.required],
    min_check_cost: [null, Validators.required],
    max_check_cost: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private service: AircraftService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
    private title: Title
  ) {
    this.title.setTitle("Aircraft");
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        if (params['action'] !== 'new') {
          this.retrieve(params['action']);
        }
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
        .subscribe(() => {
          this.toast.success('general.successfully_update');
          this.cancel();
        });
    } else {
      this.service.create(this.formGroup.value)
        .subscribe(() => {
          this.toast.success('general.successfully_save');
          this.cancel();
        });
    }
  }

  goTo(route: string): void {
    this.router.navigate([route])
      .then();
  }

  cancel(): void {
    this.goTo('/aircraft');
  }
}
