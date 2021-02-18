import {PieDataset} from './pie/pie-dataset';
import {PieModel} from './pie/pie-model';

export class Explanation {
  type = '';
  value:       number;
  description: string;
  details:     Explanation[] = [];

  constructor(json: any) {
    this.value = json.value;
    this.description = json.description;
    if ( this.description.includes('weight(channel')) {
      this.type = 'channel';
    } else if ( this.description.includes('weight(name')) {
      this.type = 'name';
    } else if ( this.description.includes('weight(title')) {
      this.type = 'title';
    } else if ( this.description.includes('weight(description')) {
      this.type = 'description';
    } else if ( this.description.includes('weight(name')) {
      this.type = 'name';
    } else if ( this.description.includes('sum of')) {
      this.type = 'sum';
    } else if ( this.description.includes('product of')) {
      this.type = 'product';
    } else if ( this.description.includes('bid_state:controlling')) {
      this.type = 'Controlling';
    } else if ( this.description.includes('+*:*)^50.0')) {
      this.type = 'Thumbnail Exists';
    }

    if (json.details) {
      json.details.forEach(e => {
        this.details.push(new Explanation(e));
      });
    }
  }

  applyToPieDS(pm: PieModel) {
    if ( this.type !== 'sum' && this.type !== 'product' && this.type !== '') {
      pm.datasets[0].data.push(this.value);
      pm.labels.push(this.type);
    }
    if ( this.type === 'sum' ) {
      this.details.forEach(d => {
        if (this.type === 'sum') {
          d.applyToPieDS(pm);
        }
      });
    }
  }
}
