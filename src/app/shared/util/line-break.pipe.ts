import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {
  transform(text: string | undefined): string {
    if (!text) {
      return '';
    }
    let result = '';
    if(text){
      let i = 0;
      while (i < text.length) {
        result += text.substring(i, i+100)+ '\n';
        i += 100;
      }
    }
    return result;
  }
}
