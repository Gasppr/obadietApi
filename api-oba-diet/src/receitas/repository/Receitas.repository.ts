import { Injectable } from "@nestjs/common";
import { DoencaEntity } from "../entities/Doenca.entity";
import { RestricaoEntity } from "../entities/Restricao.entity";
import { ReceitaEntity } from '../entities/Receita.entity';

@Injectable()
export class ReceitasRepository {
  private readonly _receitas: ReceitaEntity[] = [];

  async add(Receita: ReceitaEntity) {
    this._receitas.push(Receita);

    return {
      message: 'Receita cadastrada com sucesso',
      data: Receita,
    };
  }

  async list() {
    return this._receitas;
  }

  async search(id: number) {
    const Receita: ReceitaEntity = this._receitas.find(
      (a: ReceitaEntity) => a.id === id,
    );

    return Receita;
  }

  private _getIndex(id: number) {
    const index: number = this._receitas.findIndex(
      (a: ReceitaEntity) => a.id === id,
    );

    return index;
  }

  async update(id: number, Receita: ReceitaEntity) {
    let index = this._getIndex(id);

    if (index < 0) {
      return {
        message: 'Receita não encontrada',
      };
    }

    Receita.id = id;

    this._receitas[index] = Receita;

    return {
      message: 'Receita atualizada com sucesso',
      data: this._receitas[index],
    };
  }

  async remove(id: number) {
    let index = this._getIndex(id);

    if (index < 0) {
      return {
        message: 'Receita não encontrada',
      };
    }

    let Receita = this._receitas.splice(index, 1);

    return {
      message: 'Receita removida com sucesso',
      data: Receita
    };
  }
}
