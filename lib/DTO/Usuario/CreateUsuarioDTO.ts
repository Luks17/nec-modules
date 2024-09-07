import type { SignupFormData } from "@/lib/ui/forms/auth/signupSchema";
import { generateId } from "lucia";
import type { NextRequest } from "next/server";
import argon2 from "@node-rs/argon2";

export class CreateUsuarioDTO {
  private constructor(
    public id: string,
    public nome: string,
    public cpf: string,
    public phone: string,
    public email: string,
    public passwd: string
  ) {}

  static async fromFormData(data: SignupFormData) {
    return new this(
      generateId(36),
      data.nome,
      data.cpf,
      data.phone,
      data.email,
      await argon2.hash(data.passwd)
    );
  }

  static async fromRequest(request: NextRequest) {
    const data: SignupFormData = await request.json();
    return await this.fromFormData(data);
  }
}
