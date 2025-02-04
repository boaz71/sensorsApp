import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { APP_IMPORTS,APP_PROVIDERS } from '../../app.shared';
import { SensorsService } from '../../services/sensors.service';
import { Router } from '@angular/router';
import { Sensor } from '../../models/sensor.model';

@Component({
  selector: 'app-sensors-list',
 
  imports: [...APP_IMPORTS],
  standalone: true,
  templateUrl: './sensors-list.component.html',
  styleUrl: './sensors-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],


})
export class SensorsListComponent implements OnInit {

  sensors: Sensor[] = [];
  

  constructor (private sensorService: SensorsService,private router: Router) { 
    this.sensorService.getSensors().subscribe(data => this.sensors = data);
  }

  ngOnInit(): void {
  }


  getWorkingCount(): number {
    return this.sensors.filter(s => s.DeviceOK).length;
  }

  getFaultyCount(): number {
    return this.sensors.filter(s => !s.DeviceOK).length;
  }

  toggleStatus(sensor: Sensor) {
    sensor.DeviceOK = sensor.DeviceOK ? 0 : 1;
    sensor.LastReportDate = new Date().toISOString();
  }

  navigateToAdd() {
    this.router.navigate(['/add-sensor']);
  }

}
