import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  async create(
    id: string,
    createUserDto: CreateUserDto,
  ): Promise<UsersDocument> {
    createUserDto.horoscope = this.getHoroscope(createUserDto.birthday);
    createUserDto.zodiac = this.getZodiac(createUserDto.birthday);
    const users = this.usersModel.findByIdAndUpdate(id, createUserDto);

    if (!users) {
      throw new Error('User not found');
    }

    return users;
  }

  findOne(id: string) {
    return this.usersModel.findById(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersDocument> {
    updateUserDto.horoscope = this.getHoroscope(updateUserDto.birthday);
    updateUserDto.zodiac = this.getZodiac(updateUserDto.birthday);
    return this.usersModel.findByIdAndUpdate(id, updateUserDto);
  }

  getHoroscope(birthday: string) {
    const date = new Date(birthday);

    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
      return 'Capricorn';
    } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
      return 'Aquarius';
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
      return 'Pisces';
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
      return 'Aries';
    } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
      return 'Taurus';
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
      return 'Gemini';
    } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
      return 'Cancer';
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
      return 'Leo';
    } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
      return 'Virgo';
    } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
      return 'Libra';
    } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
      return 'Scorpius';
    } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
      return 'Sagittarius';
    } else {
      return 'Error';
    }
  }

  getZodiac(birthday: string) {
    const date = new Date(birthday);

    const zodiacSigns = [
      'Dog',
      'Pig',
      'Rat',
      'Ox',
      'Tiger',
      'Rabbit',
      'Dragon',
      'Snake',
      'Horse',
      'Goat',
      'Monkey',
      'Rooster',
    ];

    const chineseNewYearSigns = {
      1970: '2-6',
      1971: '1-27',
      1972: '1-16',
      1973: '2-3',
      1974: '1-23',
      1975: '2-11',
      1976: '1-31',
      1977: '2-18',
      1978: '2-7',
      1979: '1-28',
      1980: '2-16',
      1981: '2-5',
      1982: '1-25',
      1983: '2-13',
      1984: '2-2',
      1985: '2-20',
      1986: '2-9',
      1987: '1-29',
      1988: '2-17',
      1989: '2-6',
      1990: '1-27',
      1991: '2-15',
      1992: '2-4',
      1993: '1-23',
      1994: '2-10',
      1995: '1-31',
      1996: '2-19',
      1997: '2-7',
      1998: '1-28',
      1999: '2-16',
      2000: '2-5',
      2001: '1-24',
      2002: '2-12',
      2003: '2-1',
      2004: '1-22',
      2005: '2-9',
      2006: '1-29',
      2007: '2-18',
      2008: '2-7',
      2009: '1-26',
      2010: '2-14',
      2011: '2-3',
      2012: '1-23',
      2013: '2-10',
      2014: '1-31',
      2015: '2-19',
      2016: '2-8',
      2017: '1-28',
      2018: '2-16',
      2019: '2-5',
      2020: '1-25',
      2021: '2-12',
      2022: '2-1',
      2023: '1-22',
      2024: '2-10',
      2025: '1-29',
      2026: '2-17',
      2027: '2-6',
      2028: '1-26',
      2029: '2-13',
      2030: '2-3',
    };

    const year = date.getFullYear();
    const chineseNewYear = chineseNewYearSigns[year];
    const chineseNewYearDate = new Date(`${year}-${chineseNewYear}`);
    const isBeforeChineseNewYear = date < chineseNewYearDate;

    var zodiacYear = ((year - 4) % 12) + 2;

    if (isBeforeChineseNewYear) {
      zodiacYear = zodiacYear - 1;
    }

    const zodiac = zodiacSigns[zodiacYear];

    return zodiac;
  }
}
