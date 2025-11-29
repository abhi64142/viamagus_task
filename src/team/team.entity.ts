import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('teams')
export class Team {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  members: string[]; // array of member names/emails
}
