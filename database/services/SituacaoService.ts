import type { FindOptionsWhere } from "typeorm";
import { dbSource } from "../Connection";
import type { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";
import type { CreateSituacaoDTO } from "@/lib/DTO/Situacao/CreateSituacaoDTO";
import { Situacao } from "../models/Situacao";

export class SituacaoService {
  static async deleteAll<T extends FindOptionsWhere<Situacao>>(condition: T) {
    const situacaoRepository = await dbSource.getRepository(Situacao);

    await situacaoRepository.delete(condition);
  }

  static async deleteOne<T extends FindOptionsWhere<Situacao>>(condition: T) {
    const situacaoRepository = await dbSource.getRepository(Situacao);

    const match = await situacaoRepository.findOne({ where: condition });

    if (match) await situacaoRepository.remove(match);
  }

  static async findOne<T extends FindOptionsWhere<Situacao>>(condition: T) {
    const situacaoRepository = await dbSource.getRepository(Situacao);

    return await situacaoRepository.findOne({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async findAll<T extends FindOptionsWhere<Situacao>>(condition: T) {
    const situacaoRepository = await dbSource.getRepository(Situacao);

    return await situacaoRepository.find({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async new(dto: CreateSituacaoDTO) {
    const situacaoRepository = await dbSource.getRepository(Situacao);

    const entity = situacaoRepository.create({ ...dto });

    await situacaoRepository.save(entity);

    return entity;
  }

  static async update<
    T extends FindOptionsWhere<Situacao>,
    U extends QueryDeepPartialEntity<Situacao>,
  >(condition: T, updated: U) {
    const situacaoRepository = await dbSource.getRepository(Situacao);

    await situacaoRepository.update(condition, updated);
  }
}
