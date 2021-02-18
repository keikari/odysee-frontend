import {Hits} from './hits';
import construct = Reflect.construct;
import {Hit} from './hit';
import {Explanation} from './explanation';

export class SearchResult {
  took:    number;
  hits:    Hits;
  _shards: string;

  constructor(json: any) {
    this.took = json.took;
    this._shards = json._shards;
    this.hits = new Hits(json.hits);
  }
}
