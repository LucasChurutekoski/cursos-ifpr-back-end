import { IsString } from "class-validator";

export class CreateMatriculaDto {

    @IsString({ message: "Id do curso é obrigatório" })
    cursoId!: string
}
