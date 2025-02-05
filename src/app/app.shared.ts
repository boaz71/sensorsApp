import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { importProvidersFrom } from '@angular/core';
import { SensorsService } from './services/sensors.service';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  DateAdapter,
} from '@angular/material/core';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const MATERIAL_IMPORTS = [
  FormsModule,
  CommonModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

const providers = [
  provideHttpClient(),
  SensorsService,
  MatNativeDateModule,

  { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }, 
  { provide: MAT_DATE_LOCALE, useValue: 'he-IL' }, 
  { provide: DateAdapter, useClass: DateFnsAdapter }, 
];

export const APP_IMPORTS = [...MATERIAL_IMPORTS];

export const APP_PROVIDERS = [importProvidersFrom(...APP_IMPORTS), providers];
