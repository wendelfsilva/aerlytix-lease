import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AircraftItemComponent } from "./layouts/aircraft/aircraft-item/aircraft-item.component";
import { AircraftComponent } from "./layouts/aircraft/aircraft.component";
import { LeaseItemComponent } from "./layouts/lease/lease-item/lease-item.component";
import { LeaseComponent } from "./layouts/lease/lease.component";

const routes: Routes = [
    { path: "aircraft", component: AircraftComponent },
    { path: "aircraft/:action", component: AircraftItemComponent },
    { path: "lease", component: LeaseComponent },
    { path: "lease/:action", component: LeaseItemComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AerlytixRoutingModule {
}