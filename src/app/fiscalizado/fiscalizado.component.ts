import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../Services/consulta-cep.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/models/client';
import { ConsultaPessoaService } from '../Services/consulta-pessoa';
import { TermoColeta } from 'src/models/termoColeta';
import { HttpClient } from '@angular/common/http';
import {FormsService} from '../forms.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-fiscalizado',
  templateUrl: './fiscalizado.component.html',
  styleUrls: ['./fiscalizado.component.scss']
})
export class FiscalizadoComponent implements OnInit {
  
  client: Client = new Client();

  private _appForm!: FormGroup;
  public get appForm(): FormGroup {
    return this._appForm;
  }
  public set appForm(v: FormGroup) {
    this._appForm = v;
    this._appForm.get("ufc")!.disable();

  }

  ngOnInit(): void {
		this.formService.setData(this.appForm)
	}

  constructor(
    private appService: ConsultaCepService,
    private formBuilder: FormBuilder,
    //private receber: DataFormService,
    private appPessoa: ConsultaPessoaService,
    //private enviar: DataFormService,
    private http: HttpClient,
		private formService: FormsService
  ) {

		this.appForm = this.formBuilder.group({
			nomeprodutor : ['',Validators.required],
			cep : [ '',[Validators.required, Validators.minLength(9), Validators.maxLength(9)]], 
			tabAtual:['Identificação do fiscalizado'],
			street: "",
			comp: "",
			bair: "",
			local: "",
			ufc: "",
			cpf: [''],
		}) 
  }

	 validar(field:any){
		 return this.appForm.get(field)?.hasError('required')
	 }

  public onBlur(): void {
    const cep = this.appForm.get("cep")?.value;

    console.log("BLUR", cep);
    this.appService.getAddress(cep).subscribe(
      ({ logradouro, complemento, bairro, localidade, uf, }) => {
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

    return '';
  };
  get cpf(): FormControl {

    const form = this.appForm.get('cpf') as FormControl

    return form.value

  }
  storeClient() {

    if (!this.appForm.valid) {

			Object.keys(this.appForm.controls).forEach(field => { 
			  const control = this.appForm.get(field);            
			  control?.markAsTouched({ onlySelf: true });      
			});

    }else{
    
      const termoSalvar = new TermoColeta()
      termoSalvar.acaoTermo = 'F';
      termoSalvar.atualizacao = new Date();
      termoSalvar.nomeProdutor = 'Diego';
      this.http.post('http://localhost:8080/rada-laboratorios/termoColeta/gravarTermoColeta',termoSalvar)
      .subscribe(
        resultado => {
          console.log(resultado)
        },
        erro => {
          if(erro.status >= 400) {
            console.log(erro);
          }
        }
      );
    }
}
  public onBlur2(): void {
    const cpf = this.appForm.get("cpf")?.value;

    console.log("BLUR", cpf);
    this.appPessoa.getPessoa(cpf).subscribe(
      ({ nomePessoa, endereco, }) => {
        
const{cep}=endereco
const{municipio,nomeBairro,nomeLogradouro,numeroCep}=cep


        console.log(nomePessoa, cep,endereco);
        this.appForm.get("nomeprodutor")?.patchValue(nomePessoa);
        this.appForm.get("cep")?.patchValue(numeroCep);
        this.appForm.get("street")?.patchValue(nomeLogradouro);
        
        this.appForm.get("bair")?.patchValue(nomeBairro);
        
        this.appForm.get("ufc")?.patchValue(municipio);

      });

  }
  
  }


