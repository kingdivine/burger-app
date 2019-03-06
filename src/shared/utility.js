export const checkFieldValidity = (value, rules) =>{
    let isValid = false;
    if(rules && rules.required){
        isValid = value.trim() !== '';
    }
    if(rules && rules.minLength && isValid){
        isValid = value.length >= rules.minLength;
    }
    return isValid;
}


