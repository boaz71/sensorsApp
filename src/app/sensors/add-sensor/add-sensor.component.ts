import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { APP_IMPORTS } from '../../app.shared';
import { SensorsService } from '../../services/sensors.service';
import { Router } from '@angular/router';
import { Sensor } from '../../models/sensor.model';
import { DeviceType } from '../../models/deviceType.model';

@Component({
  selector: 'app-add-sensor',
  standalone: true,
  imports: [...APP_IMPORTS],
  templateUrl: './add-sensor.component.html',
  styleUrl: './add-sensor.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddSensorComponent implements OnInit {
  newSensor: Sensor = {
    DeviceId: '',
    WebSiteDeviceName: '',
    DeviceTypeHebrew:'',
    DeviceOK: 1,
    LastReportDate: new Date().toISOString(),
    Picture: '',
    DeviceType: '',
  };

  deviceTypes: DeviceType[] = [];
  selectedDeviceType: string = '';

  constructor(private sensorService: SensorsService, private router: Router) {
    this.sensorService
      .getDeviceTypes()
      .subscribe((data) => (this.deviceTypes = data));
  }

  ngOnInit(): void {}

  saveSensor() {
    this.sensorService.addSensor(this.newSensor);
    this.router.navigate(['/']);
  }

  onSelectionChange() {
    const selectedType = this.deviceTypes.find(
      (type) => type.deviceType === this.selectedDeviceType
    );

    if (selectedType) {
      debugger;
      this.newSensor.DeviceType = selectedType.deviceType;
      this.newSensor.Picture = selectedType.picture;
      this.newSensor.DeviceTypeHebrew = selectedType.deviceTypeHebrew;
    }
  }

  // onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   debugger;
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (this.deviceType !== undefined) {
  //         this.newSensor.DeviceType = this.deviceType.deviceType;
  //         this.newSensor.Picture=this.deviceType.picture;
  //         this.newSensor.WebSiteDeviceName=this.deviceType.deviceTypeHebrew;
  //       }

  //       this.newSensor.Picture = reader.result as string; // שמירה כ-Base64
  //       console.log(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
}
