import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
        return null;
    }

    if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
    } else {
        if (confirmPassword.errors) {
            delete confirmPassword.errors['passwordMismatch'];
            if (Object.keys(confirmPassword.errors).length === 0) {
                confirmPassword.setErrors(null);
            } else {
                confirmPassword.setErrors(confirmPassword.errors);
            }
        }
    }

    return null;
};
