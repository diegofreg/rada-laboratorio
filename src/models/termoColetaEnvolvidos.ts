import { TestemunhaProps } from "src/app/envolvidos/envolvidos.component";

export class TermoColeta {
    numeromasp!: number;
    nome!: string;
    cargo!:string;
    representante!:string;
    identidade!:string;
    assinado!:boolean;

    testemunhas!: TestemunhaProps[]
}
  