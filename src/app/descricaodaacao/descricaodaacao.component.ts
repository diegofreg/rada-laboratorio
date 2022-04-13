import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TermoColeta } from 'src/models/termoColetaAcao';
import {FormsService} from '../forms.service';


interface Outros {
  id:number
  nome: string
  
  
}


interface Local {
  value: string;
  viewValue: string;
  
}



@Component({
  selector: 'app-descricaodaacao',
  templateUrl: './descricaodaacao.component.html',
  styleUrls: ['./descricaodaacao.component.scss']
})
export class DescricaodaacaoComponent implements OnInit {


  localselecionado = "";


  isOpenoutros:boolean=false;


  private _appForm!: FormGroup;
  public get appForm(): FormGroup {
    return this._appForm;
  }
  public set appForm(v: FormGroup) {
    this._appForm = v;
  }

  local1: Local[] = [
    {value: 'DF', viewValue: 'Cantinho dos Bebuns.'},
    {value: 'MG', viewValue: 'Quintal da Boa Ventura '},
    {value: 'RJ', viewValue: 'Flor-de-lis'},
    {value: 'Outros', viewValue: 'Outros'},
  
  ];
	

	descricaodaacao = this.formBuilder.group({
		data: ['', Validators.required],
		horas: ['', Validators.required],
		acao: ['', Validators.required],
		localOutros: [''],
		local: ['', Validators.required],
		tabAtual:['descrição da ação'],
	});   

	get local() {
		return this.descricaodaacao.get('local')
	}

	get horas() {
		return this.descricaodaacao.get('horas')
	}
	get acao() {
		return this.descricaodaacao.get('acao')
	}
	get localOutros() {
		return this.descricaodaacao.get('localOutros')
	}
	get numerodeamostras() {
		return this.descricaodaacao.get('numerodeamostras')
	}

	get data() {
		return this.descricaodaacao.get('data')
	}

  local2: Outros[] =[
    {
      id: 1,
      nome: "",
      
    },
  ]

  constructor(private formBuilder: FormBuilder, private formService:FormsService) {}

  openoutros1(){
  
    this.localselecionado=this.appForm.value.localselecionado
    console.log(this.appForm)

}

  public onSubmit(): void {
    console.warn("Your order has been submitted", this.appForm.value);
    this.appForm.reset();
  }

  // storeClient() {
	// verificar se os campos estão preenchidos
  //   console.log("Entrando no salvar")
  //   var termoSalvar = new TermoColeta();
  //   termoSalvar.acaoTermo = 'F';
  //   termoSalvar.atualizacao = new Date();
  //   termoSalvar.nomeProdutor = 'Diego';
  //   this.http.post('http://localhost:8080/rada-laboratorios/termoColeta/gravarTermoColeta',termoSalvar)
  //   .subscribe(
  //     resultado => {
  //       console.log(resultado)
  //     },
  //     erro => {
  //       if(erro.status >= 400) {
  //         console.log(erro);
  //       }
  //     }
  //   );

  //   console.log("Passou salvar")

  ngOnInit(): void {
		this.descricaodaacao.get('local')?.valueChanges.subscribe(value => {
			this.localselecionado = value
			if(value == 'Outros'){
				this.descricaodaacao.controls['localOutros'].setErrors({'required': true});
				this.descricaodaacao.controls['local'].setErrors(null);
			}else{
				this.descricaodaacao.controls['localOutros'].setErrors(null);
				this.descricaodaacao.controls['local'].setErrors(null);
			}
		})

		this.formService.setData(this.descricaodaacao)
  }
}
