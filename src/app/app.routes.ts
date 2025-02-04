import { Routes } from '@angular/router';
import { AddSensorComponent } from './sensors/add-sensor/add-sensor.component';
import { SensorsListComponent } from './sensors/sensors-list/sensors-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sensors-list', pathMatch: 'full' },
    { path: 'sensors-list', component: SensorsListComponent },
    { path: 'add-sensor', component: AddSensorComponent }
];

