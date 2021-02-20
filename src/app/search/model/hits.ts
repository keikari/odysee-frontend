import {Hit} from './hit';
import {Explanation} from './explanation';
import {Source} from './source';
import {PieModel} from './pie/pie-model';

export class Hits {
  total:     number;
  max_score: number;
  hits:      Hit[] = [];

  constructor(json: any) {
    console.log(json);
    this.total = json.total;
    this.max_score = json.max_score;
    if (json.hits) {
      json.hits.forEach(h => {
        this.hits.push(this.parseHit(h));
      });
    }
  }

  private parseHit(h: any): Hit {
    const hit = new Hit();
    hit._id = h._id;
    hit._score = h._score;
    hit._source = new Source(h._source);
    hit._explanation = new Explanation(h._explanation);
    hit.pieModel = new PieModel(hit._explanation, hit._score);
    return hit;
  }
}
