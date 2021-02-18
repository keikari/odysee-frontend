import {Source} from './source';
import {Explanation} from './explanation';
import {PieModel} from './pie/pie-model';

export class Hit {
  _score:          number;
  _index:          string;
  _type:           string;
  _id:             string;
  _seq_no:         null;
  _primary_term:   null;
  _source:         Source;
  _explanation:    Explanation;
  matched_queries: string[];
  _shard:          string;
  _node:           string;
  pieModel:         PieModel;
}
