
export class Note {
  Note: string;
  UpdatedAt: Date;
  OldStatus: boolean;
  NewStatus: boolean;
  CommenterEmail: string;

  getCSSColor(fieldName: string): any {
    const defaultColor = {
      'background-color': '#FFFFFF',
      'white-space': 'normal'
    };

    if (fieldName === 'Note') {
      if (this.NewStatus) {
        return {
          'background-color': '#8bff86',
          'white-space': 'normal'
        };
      }
      return {
        'background-color': '#ffab99',
        'white-space': 'normal'
      };
    }

    return defaultColor;
  }
}
