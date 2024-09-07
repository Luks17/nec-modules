import type { CreateUsuarioDTO } from "@/lib/DTO/Usuario/CreateUsuarioDTO";
import { dbSource } from "../Connection";
import { Usuario } from "../models/Usuario";
import type { FindOptionsWhere } from "typeorm";
import type { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";
import { ChartProps } from "@/lib/ui/charts/Chart";
import { format, subMonths } from "date-fns";

export class UsuarioService {
  static async deleteAll<T extends FindOptionsWhere<Usuario>>(condition: T) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    await usuarioRepository.delete(condition);
  }

  static async deleteOne<T extends FindOptionsWhere<Usuario>>(condition: T) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    const match = await usuarioRepository.findOne({ where: condition });

    if (match) await usuarioRepository.remove(match);
  }

  static async findOne<T extends FindOptionsWhere<Usuario>>(condition: T) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    return await usuarioRepository.findOne({ where: condition });
  }

  static async findAll<T extends FindOptionsWhere<Usuario>>(condition: T) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    return await usuarioRepository.find({
      where: condition,
      loadRelationIds: true,
    });
  }

  static async new(dto: CreateUsuarioDTO) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    const entity = usuarioRepository.create({ ...dto });

    await usuarioRepository.save(entity);

    return entity;
  }

  static async update<
    T extends FindOptionsWhere<Usuario>,
    U extends QueryDeepPartialEntity<Usuario>,
  >(condition: T, updated: U) {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    await usuarioRepository.update(condition, updated);
  }

  static async fetchLastMonthsCount(): Promise<ChartProps> {
    const usuarioRepository = await dbSource.getRepository(Usuario);

    const months = Array.from({ length: 12 }, (_, i) => {
      const date = subMonths(new Date(), i);
      return {
        month: format(date, "MM"),
        year: format(date, "yyyy"),
        date: format(date, "yyyy-MM"),
      };
    }).reverse();

    const data = await usuarioRepository
      .createQueryBuilder("user")
      .select("DATE_FORMAT(user.created_at, '%Y-%m')", "month")
      .addSelect("COUNT(user.id)", "count")
      .where("user.created_at >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)")
      .groupBy("DATE_FORMAT(user.created_at, '%Y-%m')")
      .orderBy("DATE_FORMAT(user.created_at, '%Y-%m')", "ASC")
      .getRawMany();

    const result = {
      items: months.map(({ month, year, date }) => {
        const found = data.find((row) => row.month === date);
        return {
          label: `${month}-${year}`,
          value: found ? Number.parseInt(found.count, 10) : 0,
        };
      }),
    };

    return result;
  }
}
