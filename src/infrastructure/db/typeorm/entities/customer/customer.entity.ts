import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'customers',
})
export class TypeormCustomerEntity {
  @Column({
    type: 'uuid',
    primary: true,
  })
  declare id: string;

  @Column({
    type: 'varchar',
  })
  declare name: string;

  @Column({
    type: 'varchar',
  })
  declare email: string;

  @Column({
    type: 'varchar',
  })
  declare password: string;

  @Column({
    type: 'boolean',
  })
  declare isEnterprise: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  declare enterpriseName?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  declare document?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  declare street?: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  declare number?: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  declare complement?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  declare neighborhood?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  declare city?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  declare state?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  declare zipCode?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  declare createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  declare updatedAt: Date;
}
