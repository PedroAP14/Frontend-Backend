import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Produtos } from '../../../services/produtos';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduto } from '../../../model/IProduto.model';

@Component({
  selector: 'app-atualizar-produto',
  standalone: false,
  templateUrl: './atualizar-produto.html',
  styleUrl: './atualizar-produto.css',
})
export class AtualizarProduto {
  produto: IProduto = {
    nome: '',
    validade: new Date(),
    precoproduto: 0
  }

  private produtosService = inject(Produtos);
  private router = inject(Router);
  activateRouter = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const id = Number(this.activateRouter.snapshot.paramMap.get("id"));
    this.produtosService.buscarPorId(id).subscribe(retorno => {
      this.produto = retorno;
      this.cd.detectChanges();
    });
  }

  salvarProduto(): void {
    this.produtosService.atualizar(this.produto).subscribe(retorno => {
      this.produto = retorno;
      this.produtosService.exibirMensagem(
        "Sistema",
        `${this.produto.nome} foi atualizado com sucesso. ID: ${this.produto.id}`,
        "toast-sucess"
      );
      this.router.navigate(['/produtos']);
    });
  }

}
