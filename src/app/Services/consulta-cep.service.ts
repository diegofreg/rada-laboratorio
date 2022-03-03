import { Injectable } from '@angular/core';

import { HttpService } from './http.service';



interface AddressI{

  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  
}


@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpService) { }

   

  public getAddress(cep: string) {
    return this.http.get<AddressI>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
  


