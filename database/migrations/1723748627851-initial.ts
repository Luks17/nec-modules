import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1723748627851 implements MigrationInterface {
    name = 'Initial1723748627851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`solicitacoes\` (\`id\` char(36) NOT NULL, \`descriminador\` enum ('auxilio_medicamento', 'cesta_basica', 'vaga_creche', 'vaga_escola') NOT NULL, \`usuario_id\` char(36) NOT NULL, \`estado\` enum ('pendente', 'reprovada', 'aprovada') NOT NULL DEFAULT 'pendente', \`tipo_problema\` enum ('catastrofe', 'doenca', 'acidente', 'financeiro') NOT NULL, \`descricao_problema\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`vl_auxilio_medicamento\` int NULL, \`quantidade_cestas\` int NULL, \`numero_vagas_creche\` int NULL, \`numero_vagas_escola\` int NULL, INDEX \`IDX_bc9ed6db32ec43afcea758cdd3\` (\`descriminador\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`situacoes\` (\`usuario_id\` char(36) NOT NULL, \`moradia\` enum ('casa_propria', 'aluguel') NOT NULL, \`total_adultos\` int NOT NULL, \`total_criancas\` int NOT NULL, \`renda_familiar\` decimal(10,3) NOT NULL, \`valor_aluguel\` decimal(10,3) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`usuario_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` char(36) NOT NULL, \`role\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '1', \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`cpf\` char(14) NOT NULL, \`phone\` char(15) NOT NULL, \`passwd\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), UNIQUE INDEX \`IDX_ebebcaef8457dcff6e6d69f17b\` (\`cpf\`), UNIQUE INDEX \`IDX_2514d37d064085405337e3cf0b\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` varchar(255) NOT NULL, \`expires_at\` datetime NOT NULL, \`usuarioIdId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`solicitacoes\` ADD CONSTRAINT \`FK_d256cdb0c262eeb14ebc1081b8c\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`situacoes\` ADD CONSTRAINT \`FK_697b5d649c1e1b7407e9619c399\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_921c53cac76eb9ef9625351ee3e\` FOREIGN KEY (\`usuarioIdId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_921c53cac76eb9ef9625351ee3e\``);
        await queryRunner.query(`ALTER TABLE \`situacoes\` DROP FOREIGN KEY \`FK_697b5d649c1e1b7407e9619c399\``);
        await queryRunner.query(`ALTER TABLE \`solicitacoes\` DROP FOREIGN KEY \`FK_d256cdb0c262eeb14ebc1081b8c\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP INDEX \`IDX_2514d37d064085405337e3cf0b\` ON \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_ebebcaef8457dcff6e6d69f17b\` ON \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`situacoes\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc9ed6db32ec43afcea758cdd3\` ON \`solicitacoes\``);
        await queryRunner.query(`DROP TABLE \`solicitacoes\``);
    }

}
