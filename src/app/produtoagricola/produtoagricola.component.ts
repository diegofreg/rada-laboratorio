import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import {map, startWith} from "rxjs/operators";
import { ThemeService } from '../core/services/theme.service';
import {FormsService} from '../forms.service';
import {ConsultaPessoaService} from '../Services/consulta-pessoa';
import {lacreInvalido, lacreValido} from '../store/finalizar-action';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-produtoagricola',
  templateUrl: './produtoagricola.component.html',
  styleUrls: ['./produtoagricola.component.css']
})


export class ProdutoagricolaComponent implements OnInit {

  isDarkTheme!: Observable<boolean>;
	lacreStatus:Observable<boolean>

  private _appForm!: FormGroup;
  appService: any;
  public get appForm(): FormGroup {
    return this._appForm;
  }
  public set appForm(v: FormGroup) {
    this._appForm = v;
  }
 
  options :any= [];
  variedades:any = [];
  filteredOptions: any; 
  isClickedYes = "none";
  lacreList = 
	[
		{
			numerolacre:new FormControl('',Validators.required)
		},
	];
	lacresVerificados = ['01','02','03']
  ultimoIndex = 0

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
		this.formService.setData(this.appForm)

		this.consultaPessoa.getCultura().subscribe((data:any)=>{
			this.options = data
		})

    this.filteredOptions = this.appForm.get('cultura')?.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value)),
		);

		this.appForm.get('agro')?.valueChanges.subscribe(value => {
			this.isClickedYes = value
			if(value == 'show'){
				this.appForm.controls['qual'].setErrors({'required': true});
			}else{
				this.appForm.controls['qual'].setErrors(null);
			}
		})
  }

	
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.options.filter((option:any) => option.nomeCultura.toLowerCase().includes(filterValue));

	}
  
	buscandoVariedade (culturaId:any){
		this.appForm.controls['cultura'].disable();
		this.consultaPessoa.getVariedadePelaCultura(culturaId).subscribe((data:any) => {
			this.variedades = data
			const tipoVariedade = this.variedades[0]
			this.appForm.get('variedade')?.patchValue(tipoVariedade.nomeVariedade);
		})
	}

	habilitandoInput (){
		this.appForm.controls['cultura'].enable();
	}

  novoLacre () {


		const  lacreAdicionado = {
			numerolacre:new FormControl('', Validators.required),
		}

		const index = this.lacreList.push(lacreAdicionado)
		this.appForm.controls['numerolacre'].setValue(this.lacreList)
		this.ultimoIndex = index - 1
  }

	apagarLacre(lacreClicado:any) {
		const indexClicado = this.lacreList.indexOf(lacreClicado)
		this.ultimoIndex = indexClicado - 1
		this.lacreList = this.lacreList.filter((item,index) =>  index != this.ultimoIndex)
		this.appForm.controls['numerolacre'].setValue(this.lacreList)
	}

	verificandoLacre (indexAtual:any) {
		const lacres = this.appForm.get('numerolacre')?.value
		const lacreAtual = lacres[indexAtual]
		const Verificado = this.lacresVerificados.includes(lacreAtual.numerolacre.value)

		if(!Verificado){
			this.store.dispatch(lacreValido());
		}else{
			this.store.dispatch(lacreInvalido());
			this._snackBar.open('O Lacre digitado ja foi Utilizado, por favor digite outro', 'ok')
		}

	}


  foods: Food[] = [
    {value: 'Cultura', viewValue: 'Acefato'},
    {value: 'Cultura1', viewValue: 'Aldicarbe'},
    {value: 'Cultura2', viewValue: 'Aldni'},
    {value: 'Cultura 3', viewValue: 'Aletrina'},
    
  ];

  constructor(
    private themeService: ThemeService,
    private formBuilder: FormBuilder,
		private formService: FormsService,
		private consultaPessoa : ConsultaPessoaService,
		private store: Store<{ lacreStatus: any}>,
		private _snackBar: MatSnackBar
  ) {

		this.lacreStatus = store.select('lacreStatus')

    this.appForm = this.formBuilder.group({
      cultura: ['', Validators.required],
      numerolacre: [this.lacreList],
			variedade:[''],
      qual: [''],
			agro:['none'],
			tabAtual:['Descrição do Produto Agrícola'],
    });

   }

	 validar(field:any){
		 return this.appForm.get(field)?.hasError('required')
	 }

 }
