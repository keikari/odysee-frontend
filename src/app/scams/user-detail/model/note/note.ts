
export class Note {
  Note: string;
  UpdatedAt: Date;
  OldStatus: boolean;
  NewStatus: boolean;

  getCSSColor(fieldName: string): any {
    const defaultColor = {
      'background-color': '#FFFFFF'
    };

    if (fieldName === 'Note') {
      if (this.NewStatus) {
        return {
          'background-color': '#8bff86'
        };
      }
      return {
        'background-color': '#ffab99'
      };
    }

    return defaultColor;
  }
}
