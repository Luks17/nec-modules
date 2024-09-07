import type { FindOptionsWhere } from "typeorm";
import { dbSource } from "../Connection";
import { Session } from "../models/Session";
import type { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

export class SessionService {
  static async deleteAll<T extends FindOptionsWhere<Session>>(condition: T) {
    const sessionRepository = await dbSource.getRepository(Session);

    await sessionRepository.delete(condition);
  }

  static async deleteOne<T extends FindOptionsWhere<Session>>(condition: T) {
    const sessionRepository = await dbSource.getRepository(Session);

    const match = await sessionRepository.findOne({ where: condition });

    if (match) await sessionRepository.remove(match);
  }

  static async findOne<T extends FindOptionsWhere<Session>>(condition: T) {
    const sessionRepository = await dbSource.getRepository(Session);

    return await sessionRepository.findOne({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async findAll<T extends FindOptionsWhere<Session>>(condition: T) {
    const sessionRepository = await dbSource.getRepository(Session);

    return await sessionRepository.find({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async new(id: string, expires_at: Date, usuario_id: string) {
    const sessionRepository = await dbSource.getRepository(Session);

    const entity = sessionRepository.create({ id, expires_at, usuario_id });

    await sessionRepository.save(entity);

    return entity;
  }

  static async update<
    T extends FindOptionsWhere<Session>,
    U extends QueryDeepPartialEntity<Session>,
  >(condition: T, updated: U) {
    const sessionRepository = await dbSource.getRepository(Session);

    await sessionRepository.update(condition, updated);
  }
}
