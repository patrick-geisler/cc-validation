import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidatorService } from './validator.service';
import { ValidatorDto } from './dto/validator.dto';

@Controller('validator')
export class ValidatorController {
  constructor(private readonly validatorService: ValidatorService) {}

  @Post()
  validate(@Body() validatorDto: ValidatorDto) {
    return this.validatorService.validate(validatorDto);
  }
}
