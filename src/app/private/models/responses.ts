import { Note } from './note';
import { Tag } from './tag';

export interface NotesResponse {
  count: number;
  data: Note[];
}

export interface TagsResponse {
  count: number;
  data: Tag[];
}
