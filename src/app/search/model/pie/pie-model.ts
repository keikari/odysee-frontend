import {PieDataset} from './pie-dataset';
import {Explanation} from '../explanation';

export class PieModel {
  labels: string[] = [];
  datasets: PieDataset[] = [];

  constructor(explanation: Explanation, score: number) {
    const ds = new PieDataset();
    ds.backgroundColor = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#36eb39',
      '#eae471',
      '#7888ef',
      '#fcb200',
      '#ee0a36',
      '#70faef',
      '#7240fa',
      '#83f6b1',
      '#e806f8',
      '#e36b02'
    ],
    ds.hoverBackgroundColor = [
        '#f8859d',
        '#5caee5',
        '#fcd577',
        '#5ee760',
        '#e3df8f',
        '#949fea',
        '#f6bb2c',
        '#e83154',
        '#92f6ee',
        '#8960f8',
        '#a8fac9',
        '#e931f6',
        '#e2812d'
    ];
    this.datasets.push(ds);
    ds.data.push(explanation.details[0].details[0].details[1].value);
    this.labels.push('EffectiveAmount');
    ds.data.push(explanation.details[0].details[0].details[2].value);
    this.labels.push('CertificateAmount');
    const recencyFactor = ( explanation.details[0].details[1].value - 1.0 );
    ds.data.push(score * recencyFactor);
    this.labels.push('recency boost');
    explanation.details[0].details[0].applyToPieDS(this);
  }
}
