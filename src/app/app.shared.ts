import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon"; 
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { importProvidersFrom } from "@angular/core";
import { SensorsService } from "./services/sensors.service";
import { provideHttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";


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
    
];

const providers = [
  provideHttpClient(),
  SensorsService,

];

export const APP_IMPORTS = [
    ...MATERIAL_IMPORTS,
  ];

export const APP_PROVIDERS = [
    importProvidersFrom(...APP_IMPORTS),
    providers
  ];

