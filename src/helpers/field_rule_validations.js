const field_rules = {
    "email": ["required:true", "format:email"],
    "password": ["required:true"]
}

export function validateField(field, value){
    let error = ""
    const rules = field_rules[field]
    rules.some(rule => {
        const [rule_name, rule_value] = rule.split(':')
        if (rule_name === "required" && ( value?.trim() === "" || value === null)){
            error = "This field cannot be empty"
            return true
        }

        if (rule_name === "format" && rule_value === "email"){
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            if (!regex.test(value)){
                error = "Invalid email format"
                return true
            }
        }
        return false
    })

    return error
}

export function validateObjectFields(obj){
    const list_errors = {}
    for (let field in obj){
        const error = validateField(field, obj[field])
        error && Object.assign(list_errors, { [field]: error })
    }

    return list_errors
}