import { IsNumber, IsString } from "class-validator";

export class CreateCursoDto {
    @IsString()
    titulo!: string

    @IsString()
    descricao!: string

    @IsNumber()
    cargaHoraria!: number

    @IsString()
    idCategoria!: string
}
