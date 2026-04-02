import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllUsers() {
        return this.prisma.user.findMany({
            orderBy: { createdAt: 'desc'},
            select: {
                id: true, 
                email: true,
                role: true,
                isEmailVerified: true,
                createdAt: true
            }
        })
    }

    async findAllNotes() {
        return this.prisma.note.findMany({
            include: {
                user: {
                    select: {
                        id: true, 
                        email: true, 
                        role: true
                    }
                }
            },
            orderBy: { createdAt: 'desc'}
        })
    }
}