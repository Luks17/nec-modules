import "reflect-metadata";
import {
  DataSource,
  type ObjectLiteral,
  type ObjectType,
  type Repository,
} from "typeorm";
import { logger } from "../lib/logger";

import { Session } from "./models/Session";
import { Situacao } from "./models/Situacao";
import { Solicitacao } from "./models/Solicitacao";
import { Usuario } from "./models/Usuario";
import { AuxilioMedicamento } from "./models/Solicitacao/AuxilioMedicamento";
import { CestaBasica } from "./models/Solicitacao/CestaBasica";
import { VagaCreche } from "./models/Solicitacao/VagaCreche";
import { VagaEscola } from "./models/Solicitacao/VagaEscola";
import { Initial1723748627851 } from "./migrations/1723748627851-initial";

export const dbDataSource = new DataSource({
  type: "mysql",
  url: process.env.MYSQL_URL,
  synchronize: false,
  entities: [
    Session,
    Situacao,
    Solicitacao,
    Usuario,
    AuxilioMedicamento,
    CestaBasica,
    VagaCreche,
    VagaEscola,
  ],
  migrations: [Initial1723748627851],
  subscribers: [],
});

class DatabaseSource {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = dbDataSource;
  }

  async getConnection(): Promise<DataSource> {
    if (!this.dataSource.isInitialized) {
      try {
        await this.dataSource.initialize();
      } catch (e) {
        logger.error("CRITICAL: Failed to Connect to Database!");
        throw e;
      }
    }

    return this.dataSource;
  }

  async getRepository<T extends ObjectLiteral>(
    entity: ObjectType<T>
  ): Promise<Repository<T>> {
    const connection = await this.getConnection();
    return connection.getRepository(entity);
  }
}

export const dbSource = new DatabaseSource();
