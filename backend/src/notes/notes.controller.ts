import { Body, Controller, Delete, Put, Post, Get, Param, UseGuards, ParseIntPipe } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
@UseGuards(JwtAuthGuard)

export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Get('me')
    findMyNotes(@CurrentUser() user: any) {
        return this.notesService.findMyNotes(user.userId);
    }

    @Post()
    create(@CurrentUser() user: any, @Body() dto: CreateNoteDto) {
        return this.notesService.create(user.userId, dto)
    }

    @Put(':id')
    update(
        @CurrentUser() user: any, 
        @Param('id', ParseIntPipe) id: number, 
        @Body() dto: UpdateNoteDto
    ) {
        return this.notesService.update(user.userId, id, dto);
    }

    @Delete(':id')
    remove(
        @CurrentUser() user: any, 
    @Param('id', ParseIntPipe) id: number
    ) {
        return this.notesService.remove(user.userId, id);
    }
}