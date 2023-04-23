import {AbstractControl, ValidatorFn} from "@angular/forms";

export function onlyNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const onlyNumbers = /^\d+$/.test(control.value);
    return onlyNumbers ? null : {'onlyNumbers': {value: control.value}};
  };
}
export function onlyNumbersValidatorBankCard(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const onlyNumbers = /^[0-9\s]+$/.test(control.value);
    return onlyNumbers ? null : {'onlyNumbers': {value: control.value}};
  };
}

export function onlyNumbersValidatorExpireDate(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const onlyNumbers = /^[\d\/]+$/.test(control.value);
    return onlyNumbers ? null : {'onlyNumbers': {value: control.value}};
  };
}


export function isPositive(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isPositive = control.value > 0;
    return isPositive ? null : { 'positiveNumber': true };
  };
}
