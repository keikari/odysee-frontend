export class RetentionParams {
  interval: { label: string, value: string };
  tag: { label: string, value: string };
  since: Date;

  describe(): string {
    return this.interval.value.charAt(0).toUpperCase() + this.interval.value.slice(1) +
      ' retention for ' + this.tag.value +
      ' since ' + this.sinceStr();
  }

  sinceStr(): string {
    return this.dateToString(this.since);
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
