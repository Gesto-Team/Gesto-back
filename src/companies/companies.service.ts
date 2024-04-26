import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './companies.schema';
import { Model } from 'mongoose';
import { MongooseCompanyService } from 'src/external-services/mongoose-companies/mongoose-companies.service';
import { Cron, CronExpression } from '@nestjs/schedule';
// import * as nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.email,
//     pass: process.env.mdp,
//   },
// });

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private readonly userModel: Model<Company>,
    private mgCompanyService: MongooseCompanyService,
  ) {}

  /**
   * Create a new company
   * @param createCompanyDto company data
   * @returns new company
   */
  public create(createCompanyDto: CreateCompanyDto) {
    return this.mgCompanyService.create({
      name: createCompanyDto.name,
      email: createCompanyDto.email,
      monthlyWaste: createCompanyDto.monthlyWaste,
    });
  }

  /**
   * Find one company
   * @param id
   * @returns company
   */
  public async findOne(id: string): Promise<Company | null> {
    return this.mgCompanyService.findOne(id);
  }

  /**
   * Find one company by name
   * @param name
   * @returns company
   */
  public async findOneByCompanyName(name: string): Promise<Company | null> {
    return this.mgCompanyService.findOneByCompanyName(name);
  }

  /**
   * Find all companies
   * @returns companies
   */
  public async findAll(): Promise<Company[]> {
    return this.mgCompanyService.findAll();
  }

  /**
   * Update a company
   * @param id
   * @param updateCompanyDto company data
   * @returns updated company
   */
  public async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.mgCompanyService.update(id, updateCompanyDto);
  }

  /**
   * Remove a company
   * @param id
   * @returns removed company
   */
  public async delete(id: string): Promise<Company> {
    return this.mgCompanyService.delete(id);
  }

  /**
   * Send email to companies every 10 seconds
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  public async handleCron() {
    try {
      console.log('start emailing');
      // const companies = await this.findAll();

      // companies.forEach(e =>{
      //     let mailOptions = {
      //       from: process.env.email,
      //       to: e.email,
      //       subject: 'Réduction de gaspillage mensuel',
      //       text: 'Bonjour ' + e.name + ', votre gaspillage alimentaire a réduit de ' + e.monthlyWaste + ' ce mois-ci.'
      //     };

      //     transporter.sendMail(mailOptions, (err, info) => {
      //       if (err) console.log(err);
      //       else console.log('Email envoyé: ' + info.response);
      //     });
      //   })
    } catch (e) {
      console.error(e);
    }
  }
}
