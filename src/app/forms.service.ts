import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

	forms:any = []

  constructor() { }
	
	getData(){
		return this.forms
	}

	setData(form:any){
		this.forms.push(form)
	}

}
