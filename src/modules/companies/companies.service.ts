import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './companies.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CrudProvider } from 'src/interface/crud.interface';
import { MailerProvider } from './mailer/mailer.interface';

@Injectable()
export class CompaniesService {
  constructor(
    private mgCompanyService: CrudProvider<CompanyDocument>,
    private nodeMailerService: MailerProvider<CompanyDocument>,
  ) {}

  /**
   * Create a new company
   * @param createCompanyDto company data
   * @returns new company
   */
  public create(createCompanyDto: CreateCompanyDto): Promise<any> {
    return this.mgCompanyService.create({
      name: createCompanyDto.name,
      email: createCompanyDto.email,
      monthlyWaste: createCompanyDto.monthlyWaste,
    });
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
   * Find all companies
   * @returns companies
   */
  public async findAll(): Promise<any[]> {
    return this.mgCompanyService.findAll();
  }

  /**
   * Find one company
   * @param id
   * @returns company
   */
  public async findOne(id: string): Promise<any> {
    return this.mgCompanyService.findOne(id);
  }

  /**
   * Find one company by name
   * @param name
   * @returns company
   */
  public async findOneByCompanyName(name: string): Promise<any> {
    return this.mgCompanyService.findOneByName(name);
  }

  /**
   * Send email to all companies every n seconds
   */
  @Cron(CronExpression.EVERY_10_MINUTES)
  public async sendMailToAllCompanies() {
    try {
      console.log('start emailing');
      // TODO remove comments and set loop value
      // const companies = await this.findAll();

      // companies.forEach((company) => {
      //   this.nodeMailerService.sendMail(company);
      // });
    } catch (e) {
      console.error(e);
    }
  }
}
