import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumValue'
})
export class EnumValuePipe implements PipeTransform {
  transform<T extends { [s: string]: T[keyof T] } | ArrayLike<T[keyof T]>>(data: T): T[keyof T][] {
    return Object.values(data);
  }
}
