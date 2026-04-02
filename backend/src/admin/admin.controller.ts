import { Controller, UseGuards, Get } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { AdminService } from "./admin.service";
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('users')
    findAllUsers() {
        return this.adminService.findAllUsers()
    }

    @Get('notes')
    findAllNotes() {
        return this.adminService.findAllNotes()
    }
}