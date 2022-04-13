import { Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
  clickedTab = 'Termo de Coleta'
	tabs = [
		{
			nameTab:'cliente'
		},
		{
			nameTab:'Termo de Coleta'
		},
		{
			nameTab:'Entrada no Laboratório'
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
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.dataAtual =  new Date();
  }

	mudandoTela(nomeTela:string){
		console.log(nomeTela)
		this.clickedTab = nomeTela
	}

}
