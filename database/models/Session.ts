import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Session {
  @PrimaryColumn({ type: "varchar", length: 255 })
  id: string;

  @Column({ type: "datetime" })
  expires_at: Date;

  @ManyToOne(
    () => Usuario,
    (usuario) => usuario.id
  )
  usuario_id: string;
}
