import { MinLength } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Solicitacao } from "./Solicitacao";
import { Situacao } from "./Situacao";
import { RoutePermissions } from "@/lib/auth/Permissions";

@Entity("usuarios")
export class Usuario {
  @PrimaryColumn({ type: "char", length: 36 })
  id: string;

  @Column({
    type: "enum",
    enum: RoutePermissions,
    default: RoutePermissions.IS_NEW_USER,
  })
  role: RoutePermissions;

  @Column({ type: "varchar", length: 255 })
  @MinLength(2)
  nome: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  email: string;

  @Column({ type: "char", unique: true, length: 14 })
  cpf: string;

  @Column({ type: "char", unique: true, length: 15 })
  phone: string;

  @Column({ type: "varchar", length: 255 })
  @MinLength(6)
  passwd: string;

  @OneToMany(
    () => Solicitacao,
    (solicitacao) => solicitacao.usuario
  )
  solicitacoes: Solicitacao[];

  @OneToOne(
    () => Situacao,
    (situacao) => situacao.usuario
  )
  situacao: Situacao;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
