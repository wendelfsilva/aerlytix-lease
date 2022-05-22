import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { AerlytixRoutingModule } from "./aerlytix-routing.module";
import { AircraftItemComponent } from './layouts/aircraft/aircraft-item/aircraft-item.component';
import { AircraftComponent } from './layouts/aircraft/aircraft.component';
import { HomeComponent } from './layouts/home/home.component';
import { CashFlowComponent } from './layouts/lease/cash-flow/cash-flow.component';
import { LeaseItemComponent } from './layouts/lease/lease-item/lease-item.component';
import { LeaseComponent } from './layouts/lease/lease.component';
import { AircraftService } from './services/aircraft.service';
import { CashFlowService } from './services/cash-flow.service';
import { LeaseService } from './services/lease.service';

@NgModule({
  declarations: [
    HomeComponent,
    AircraftComponent,
    AircraftItemComponent,
    LeaseComponent,
    LeaseItemComponent,
    CashFlowComponent,
  ],
  imports: [
    AerlytixRoutingModule,
    LayoutModule,
    SharedModule,
  ],
  providers: [
    AircraftService,
    LeaseService,
    CashFlowService,
  ]
})
export class AerlytixModule {
}
