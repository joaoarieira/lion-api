import { Injectable } from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

@Injectable()
export class CampusesService {
  create(createCampusDto: CreateCampusDto) {
    return 'This action adds a new campuses';
  }

  findAll() {
    return `This action returns all campuses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campuses`;
  }

  update(id: number, updateCampusDto: UpdateCampusDto) {
    return `This action updates a #${id} campuses`;
  }

  remove(id: number) {
    return `This action removes a #${id} campuses`;
  }
}
