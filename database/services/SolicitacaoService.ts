import type { FindOptionsWhere } from "typeorm";
import { dbSource } from "../Connection";
import { Solicitacao } from "../models/Solicitacao";
import type { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";
import type { CreateSolicitacaoDTO } from "@/lib/DTO/Solicitacao/CreateSolicitacaoDTO";
import { ChartProps } from "@/lib/ui/charts/Chart";
import { EstadosSolicitacao } from "@/lib/enums/Solicitacao";
import { findKey } from "@/lib/enums/common";

export class SolicitacaoService {
  static async deleteAll<T extends FindOptionsWhere<Solicitacao>>(
    condition: T
  ) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    await solicitacaoRepository.delete(condition);
  }

  static async deleteOne<T extends FindOptionsWhere<Solicitacao>>(
    condition: T
  ) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    const match = await solicitacaoRepository.findOne({ where: condition });

    if (match) await solicitacaoRepository.remove(match);
  }

  static async findOne<T extends FindOptionsWhere<Solicitacao>>(condition: T) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    return await solicitacaoRepository.findOne({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async findAll<T extends FindOptionsWhere<Solicitacao>>(condition?: T) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    return await solicitacaoRepository.find({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async new(dto: CreateSolicitacaoDTO) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    const entity = solicitacaoRepository.create({ ...dto });

    await solicitacaoRepository.save(entity);

    return entity;
  }

  static async update<
    T extends FindOptionsWhere<Solicitacao>,
    U extends QueryDeepPartialEntity<Solicitacao>,
  >(condition: T, updated: U) {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    await solicitacaoRepository.update(condition, updated);
  }

  static async fetchStatusCount(): Promise<ChartProps> {
    const solicitacaoRepository = await dbSource.getRepository(Solicitacao);

    const data: { status: EstadosSolicitacao; count: number }[] =
      await solicitacaoRepository
        .createQueryBuilder("s")
        .select("s.estado", "status")
        .addSelect("COUNT(s.id)", "count")
        .groupBy("s.estado")
        .getRawMany();

    const result = {
      items: data.map((item) => {
        return {
          label: findKey(EstadosSolicitacao, item.status)!,
          value: item.count,
        };
      }),
    };

    return result;
  }
}
