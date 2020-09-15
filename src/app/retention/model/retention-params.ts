import { SelectItem } from 'primeng/api';

export class RetentionParams {
  interval: { label: string, value: string };
  tags: SelectItem[];
  since: Date;
  intervals: number;

  describe(): string {
    let s = this.interval.value.charAt(0).toUpperCase() + this.interval.value.slice(1) + ' retention';
    if (this.since) {
      s += ' since ' + this.sinceStr();
    }
    s += ' for ' + this.tags.map(t => t.label).join(', ');
    return s;
  }

  sinceStr(): string {
    return this.since ? this.dateToString(this.since) : '';
  }

  dateToString(date: Date): string {
    return date.getFullYear()
      + '-' + this.leftpad(date.getMonth() + 1, 2)
      + '-' + this.leftpad(date.getDate(), 2);
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength) + String(val)).slice(String(val).length);
  }
}
