import { Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { ThemeService } from './core/services/theme.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  isDarkTheme!: Observable<boolean>;
  dataAtual!: Date;
	
  title = 'termo-coleta';
//   clickedTab = 'Termo de Coleta'
  clickedTab = 'Registro de Amostra'
	tabs = [
		{
			nameTab:'Resultado da Análise'
		},
		{
			nameTab:'Termo de Coleta'
		},
		{
			nameTab:'Registro de Amostra'
		},
		{
			nameTab:'Cadastros',
			isExpansion:true,
			children:[
				{
					nameTab:'Grupo de Análise',
				},
				{
					nameTab:'Material de Análise',
				}
			]
		},
	]

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
	  console.log(environment.production)
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.dataAtual =  new Date();
  }

	mudandoTela(nomeTela:string){
		this.clickedTab = nomeTela
	}

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
