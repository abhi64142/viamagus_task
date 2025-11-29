import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('tasks')
export class Task {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  description: string;

  @Column()
  due_date: string;

  @Column()
  assignee: string; // team member

  @Column()
  status: string; // pending, in_progress, done
}
