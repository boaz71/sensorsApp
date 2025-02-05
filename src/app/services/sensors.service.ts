import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sensor } from '../models/sensor.model';
import { DeviceType } from '../models/deviceType.model';
 

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  private sensorsSubject = new BehaviorSubject<Sensor[]>([]);
  sensors$ = this.sensorsSubject.asObservable();

  private deviceTypesSubject = new BehaviorSubject<DeviceType[]>([]);
  deviceTypes$ = this.deviceTypesSubject.asObservable();

  constructor(private http:HttpClient) { 
    this.http.get<Sensor[]>('assets/sensors.json').subscribe(
      data => this.sensorsSubject.next(data),
      error => console.error('Error loading sensors:', error) 
    );

    this.http.get<DeviceType[]>('assets/deviceTypes.json').subscribe( 
      data => this.deviceTypesSubject.next(data),
      error => console.error('Error loading device types:', error) 
    );

  }

  getSensors(): Observable<Sensor[]> {
    return this.sensors$;
  }
  
  getDeviceTypes(): Observable<DeviceType[]> {
    return this.deviceTypes$;
  }

  addSensor(sensor: Sensor) {
    const currentSensors = this.sensorsSubject.value;
    sensor.DeviceId = (currentSensors.length + 1).toString();
    this.sensorsSubject.next([...currentSensors, sensor]);
  }

}
