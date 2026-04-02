import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesService {
    constructor(private prisma: PrismaService) {}

    async findMyNotes(userId: number) {
        return this.prisma.note.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        }); 
    }

    async create(userId: number, dto: CreateNoteDto) {
        return this.prisma.note.create({
            data: {
                title: dto.title,
                content: dto.content,
                userId,
            },
        });
    }

    async update(userId: number, noteId: number, dto: UpdateNoteDto) {
        const note = await this.prisma.note.findUnique({ where: { id: noteId } });

        if (!note) {
            throw new NotFoundException("Note non trouvée" );
        }

        if (note.userId !== userId) {
            throw new ForbiddenException("Accès interdit à cette note")
        }

        return this.prisma.note.update({
            where: { id: noteId },
            data: dto,
        });
    }

    async remove(userId: number, noteId: number) {
        const note = await this.prisma.note.findUnique({
            where: { id: noteId }
        })

        if (!note) {
            throw new NotFoundException("Note non trouvée" );
        }

        if (note.userId !== userId) {
            throw new ForbiddenException("Accès interdit à cette note")
        }

        await this.prisma.note.delete({
            where: { id: noteId }
        })

        return { message: 'Note supprimée'};
    }
}