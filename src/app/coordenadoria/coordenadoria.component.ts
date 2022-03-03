import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';



interface Food {
  value: string;
  viewValue: string;
}
interface diego {
  value: string;
  viewValue: string;

  
}



@Component({
  selector: 'app-coordenadoria',
  templateUrl: './coordenadoria.component.html',
  styleUrls: ['./coordenadoria.component.css']
})
export class CoordenadoriaComponent implements OnInit {

  
  


  foods: Food[] = [
    {value: 'DF', viewValue: 'Brasilia'},
    {value: 'MG', viewValue: 'Minas'},
    {value: 'RJ', viewValue: 'Cabo Frio'},
  ];

  foodss: diego[] = [
    {value: 'DF', viewValue: 'Brasilia00000000'},
    {value: 'MG', viewValue: 'Minas'},
    {value: 'RJ', viewValue: 'Cabo Frio'},
  ];


  
  



  constructor(

   
    
  ) { 

   

  }

  

  ngOnInit(): void {
  }

}
