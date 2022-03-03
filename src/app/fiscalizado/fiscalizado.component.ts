import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../Services/consulta-cep.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Validador } from '../helpers/validations.helper';


@Component({
  selector: 'app-fiscalizado',
  templateUrl: './fiscalizado.component.html',
  styleUrls: ['./fiscalizado.component.css']
})
export class FiscalizadoComponent {


  private _appForm!: FormGroup;
  public get appForm(): FormGroup {
    return this._appForm;
  }
  public set appForm(v: FormGroup) {
    this._appForm = v;
  }

  

 
  constructor(
    private appService: ConsultaCepService,
    private formBuilder: FormBuilder
    
   
  ) {

    

    this.appForm = this.formBuilder.group({
      cep: "",
      street: "",
      comp: "",
      bair: "",
      local:"",
      ufc:"",
      nomeprodutor:"",
      
      cpf: new FormControl('',
        Validators.compose([Validators.required, Validador.ValidaCpf])
      )
      

    });   
    
    
        
  }
  

  public onBlur(): void {
    const cep = this.appForm.get("cep")?.value;

    console.log("BLUR", cep);
    this.appService.getAddress(cep).subscribe(
      ({ logradouro, complemento, bairro,localidade, uf, }) => {
        console.log(logradouro, complemento, bairro, localidade, uf);
        this.appForm.get("street")?.patchValue(logradouro);
        this.appForm.get("comp")?.patchValue(complemento);
        this.appForm.get("bair")?.patchValue(bairro);
        this.appForm.get("local")?.patchValue(localidade);
        this.appForm.get("ufc")?.patchValue(uf);
    
     });
    

   
  }



  public onSubmit(): void {
    console.warn("Your order has been submitted", this.appForm.value);
    this.appForm.reset();
  }
 
  
  getErrorcpf() {
         
    return this['cpf'].hasError('cpf') ? 'Not a valid cpf' : '';
  };
  get cpf(): FormControl {
    
    return this.appForm.get('cpf') as FormControl


}

}




