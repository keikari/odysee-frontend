
import { File } from './file';

export class Category {
  ID: bigint;
  Name: string;
  Channel: string;
  SequenceNr = 0;
  IsActive = false;
  Files: File[] = [];
}


