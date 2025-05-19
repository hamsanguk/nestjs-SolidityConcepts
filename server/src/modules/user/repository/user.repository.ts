import * as path from 'path';
import fs from 'fs';
import { CreateUserDto } from '../dto/create-user.dto';

const base = path.join(__dirname, '../../../../');
const DB_PATH = path.join(base, 'src/modules/user/repository/users.mock.json');

export class UserRepository {
  async findOne(userId: string) {
    const users = await this.findAll();
    return users.find((u) => u.userId === userId);
  }

  async findAll() {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  }

  async create(createUserDto: CreateUserDto) {
    const { userId, email, password } = createUserDto;
    const users = await this.findAll();

    const newUser = {
      id: users.length + 1,
      userId: userId,
      email: email,
      password: password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf-8');

    return newUser;
  }
}
