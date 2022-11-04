export interface Customers {
  id?: number;
  name?: string;
  email?: string;
  isAdmin?: boolean;
}
export interface IEducation {
  school?: string;
  degree?: string;
  field?: string;
  grade?: string;
  startdate?: Date;
  enddate?: Date;
  description?: string;
}
export interface IExperience {
  title?: string;
  company?: string;
  location?: string;
  headline?: string;
  description?: string;
  startdate?: Date;
  enddate?: Date;
}

export class Education implements IEducation {
  constructor(
    public school?: string,
    public degree?: string,
    public field?: string,
    public grade?: string,
    public startdate?: Date,
    public enddate?: Date,
    public description?: string
  ) {}
}
export class Experience implements IExperience {
  constructor(
    public title?: string,
    public company?: string,
    public location?: string,
    public headline?: string,
    public description?: string,
    public startdate?: Date,
    public enddate?: Date
  ) {}
}
