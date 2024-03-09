import { Tag } from './tag';

export interface Note {
  _id: string | null;
  title: string;
  content: string;
  tags: Tag[];
  owner: string;
  created: Date;
  updated: Date;
}
