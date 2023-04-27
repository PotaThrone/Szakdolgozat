import {AbstractControl, ValidatorFn} from "@angular/forms";

export function onlyNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const onlyNumbers = /^\d+$/.test(control.value);
    return onlyNumbers ? null : {'onlyNumbers': {value: control.value}};
  };
}
export function onlyNumbersValidatorBankCard(): ValidatorFn{
  return (control: AbstractControl): { [key: string]: any } | null => {
    const onlyNumbers = /^[0-9\s]+$/.test(control.value);
    return onlyNumbers ? null : {'onlyNumbers': {value: control.value}};
  };
}

export function onlyNumbersValidatorExpireDate(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const onlyNumbers = /^[\d\/]+$/.test(control.value);
    if(onlyNumbers && control.value.length == 5){
      const month: number = parseInt(control.value.split('/')[0]);
      const year: number = 2000 + parseInt(control.value.split('/')[1]);
      if(month < 1 || month > 12 || year < 2023){
        return {'onlyNumbers': {value: control.value}};
      }
      const date = new Date(year, month);
      if (date < new Date(Date.now())){
        return {'onlyNumbers': {value: control.value}};
      }
    }


    return onlyNumbers ? null : {'onlyNumbers': {value: control.value}};
  };
}


export function isPositive(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isPositive = control.value > 0;
    return isPositive ? null : { 'positiveNumber': true };
  };
}
