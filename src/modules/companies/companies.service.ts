import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './companies.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerProvider } from './mailer/mailer.interface';
import { CompanyProvider } from './companies.interface';

@Injectable()
export class CompaniesService {
  constructor(
    private mgCompanyService: CompanyProvider,
    private nodeMailerService: MailerProvider<CompanyDocument>,
  ) {}

  /**
   * Create a new company
   * @param createCompanyDto company data
   * @returns new company
   */
  public async create(createCompanyDto: CreateCompanyDto): Promise<any> {
    const company = this.findOneByCompanyName(createCompanyDto.name);
    if (await company) {
      throw new ConflictException(
        `${createCompanyDto.name} has already been taken`,
      );
    }
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
    const company = this.mgCompanyService.findOne(id);
    if (!(await company)) {
      throw new ConflictException(`Company #${id} is not found`);
    }
    return this.mgCompanyService.update(id, updateCompanyDto);
  }

  /**
   * Remove a company
   * @param id
   * @returns removed company
   */
  public async delete(id: string): Promise<Company> {
    const company = this.mgCompanyService.findOne(id);
    if (!(await company)) {
      throw new ConflictException(`Company #${id} is not found`);
    }
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
    const company = this.mgCompanyService.findOne(id);
    if (!(await company)) {
      throw new ConflictException(`Company #${id} is not found`);
    }
    return company;
  }

  /**
   * Find one company by name
   * @param name
   * @returns company
   */
  public async findOneByCompanyName(name: string): Promise<any> {
    return this.mgCompanyService.findOneByCompanyName(name);
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
