import {HttpParameterCodec} from '@angular/common/http';

/*  DUE TO
https://medium.com/better-programming/how-to-fix-angular-httpclient-not-escaping-url-parameters-ddce3f9b8746
https://github.com/angular/angular/issues/26979#issuecomment-461027419
 */
export class JSHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
