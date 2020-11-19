export interface PageInterface {
  id?: number;
  name: string;
  parent?: null|number;
  content: any[]|any;
  route: string;
}
