import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {
  transform(text: string): string {
    if (!text) {
      return '';
    }
    let result = '';
    let i = 0;
    while (i < text.length) {
      result += text.substring(i, 60) + '\n';
      i += 60;
    }
    return result;
  }
}
