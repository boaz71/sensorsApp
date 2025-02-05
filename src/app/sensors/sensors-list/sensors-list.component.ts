import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { APP_IMPORTS,APP_PROVIDERS } from '../../app.shared';
import { SensorsService } from '../../services/sensors.service';
import { Router } from '@angular/router';
import { Sensor } from '../../models/sensor.model';
import { startOfDay, endOfDay, subMonths } from 'date-fns';

@Component({
  selector: 'app-sensors-list',
 
  imports: [...APP_IMPORTS],
  standalone: true,
  templateUrl: './sensors-list.component.html',
  styleUrl: './sensors-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],


})
export class SensorsListComponent implements OnInit {

  searchTerm: string = '';
  startDate!: Date;
  endDate!: Date;

  sensors: Sensor[] = [];
  

  constructor (private sensorService: SensorsService,private router: Router) { 
    this.sensorService.getSensors().subscribe(data => this.sensors = data);
  }

  ngOnInit(): void {
    this.setDefaultDateRange();
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

  resetFilters() {
    
    this.setDefaultDateRange()
    this.searchTerm = '';
  }

  setDefaultDateRange() {

    this.endDate = endOfDay(new Date()); 
    this.startDate = startOfDay(subMonths(new Date(), 1)); 

  }

  getFilteredSensors() {
    return this.sensors.filter(sensor => {
      const matchesName = this.searchTerm
        ? sensor.WebSiteDeviceName.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
  
      const sensorDate = new Date(sensor.LastReportDate);
      const matchesStartDate = this.startDate ? sensorDate >= new Date(this.startDate) : true;
      const matchesEndDate = this.endDate ? sensorDate <= new Date(this.endDate) : true;
  
      return matchesName && matchesStartDate && matchesEndDate;
    });
  }

}


