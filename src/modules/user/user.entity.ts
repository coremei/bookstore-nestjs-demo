import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetail } from './user.detail.entity';
import { Role } from '../role/role.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', unique: true, length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 8, default: 'active' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(type => UserDetail, { cascade: true, nullable: false, eager: true })
  @JoinColumn({ name: 'detail_id' })
  userDetails: UserDetail;

  @ManyToMany(
    type => Role,
    role => role.users,
    { eager: true },
  )
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}
