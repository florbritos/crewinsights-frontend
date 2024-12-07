const field_rules = {
    'id_user': [],
    'first_name':['required:true', 'type:string'],
    'last_name':['required:true', 'type:string'],
    'dob':['required:true', 'format:date', 'not_future'],
    'address':['required:true', 'type:string'],
    'nationality':['required:true', 'type:string'],
    'passport':['required:true', 'type:string'],
    'contact_number':['required:true', 'type:string'],
    'job_title':['required:true', 'type:string'],
    'avatar':['required:true', 'type:string'],
    'role':['required:true', 'type:string'],
    'email': ['required:true', 'format:email'],
    'password': ['required:true'],
    'flight_number': ['required:true'],
    'departure_airport': ['required:true', 'format:iata'],
    'arrival_airport': ['required:true', 'format:iata'],
    'schedule_departure_time': ['required:true', 'format:datetime', 'not_future'],
    'actual_departure_time': ['required:true', 'format:datetime', 'not_future'],
    'schedule_arrival_time': ['required:true', 'format:datetime', 'after:schedule_departure_time', 'not_future'],
    'actual_arrival_time': ['required:true', 'format:datetime', 'after:actual_departure_time', 'not_future'],
    'captain_name': ['required:true'],
    'first_officer_name': ['required:true'],
    'purser_name': ['required:true'],
    'number_cabin_crew': ['required:true', 'format:int', 'min:0'],
    'total_number_pax':['required:true', 'format:int', 'min:0'],
    'total_number_infants': ['required:true', 'format:int', 'min:0'],
    'total_number_pax_special_assistance':['required:true', 'format:int', 'min:0'],
    'delays':['format:boolean'],
    'reason_delay':['required:delays'],
    'diverted_emergency_landing':['format:boolean'],
    'reason_diverted_emergency_landing':['required:diverted_emergency_landing'],
    'technical_issues_aircraft':['format:boolean'],
    'reason_technical_issues_aircraft':['required:technical_issues_aircraft'],
    'safety_incident':['format:boolean'],
    'safety_incident_explanation':['required:safety_incident'],
    'safety_procedure_not_followed':['format:boolean'],
    'safety_procedure_not_followed_explanation':['required:safety_procedure_not_followed'],
    'medical_assistance':['format:boolean'],
    'medical_assistance_explanation':['required:medical_assistance'],
    'unruly_pax':['format:boolean'],
    'unruly_pax_explanation':['required:unruly_pax'],
    'damage_aircraft_equipment':['format:boolean'],
    'damage_aircraft_equipment_explanation':['required:damage_aircraft_equipment'],
    'service_not_completed':['format:boolean'],
    'service_not_completed_explanation':['required:service_not_completed'],
    'pax_complaints':['format:boolean'],
    'pax_complaints_explanation':['required:pax_complaints'],
    'additional_comments':[],
}

export function validateField(field, value, data = {}) {
    let error = ''
    const rules = field_rules[field]
    rules.some(rule => {
        const [rule_name, rule_value] = rule.split(':')
        
        if (rule_name === 'required'){
            if (rule_value === 'true' && value?.trim() === '' || value === null) {
                error = 'This field cannot be empty'
                return true
            }
            if (rule_value !== 'true') {
                if (data[rule_value] && value?.trim() === '' || value === null){
                    error = 'This field cannot be empty'
                    return true
                }
            }
        }

        if (rule_name === 'format') {
            if (rule_value === 'email') {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                if (!regex.test(value)) {
                    error = 'Invalid email format'
                    return true
                }
            }
            if (rule_value === 'iata') {
                const regex = /^[A-Z]{3}$/
                if (!regex.test(value)) {
                    error = 'IATA code should be 3 letters'
                    return true
                }
            }
            if (rule_value === 'date') {
                const regex = /^\d{4}-\d{2}-\d{2}$/
                if (!regex.test(value)) {
                    error = 'Date format expected YYYY-MM-DD'
                    return true
                }
            }
            if (rule_value === 'time') {
                const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
                if (!regex.test(value)) {
                    error = 'Time format expected HH:MM'
                    return true
                }
            }
            if (rule_value === 'datetime') {
                const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
                if (!regex.test(value)) {
                    error = 'Datetime format expected YYYY-MM-DDTHH:MM';
                    return true;
                }
            }
            if (rule_value === 'int') {
                if (!Number.isInteger(Number(value))) {
                    error = 'This field must be an integer'
                    return true
                }
            }
            if (rule_value === 'boolean') {
                if (typeof value !== 'boolean') {
                    error = 'This field must be true or false'
                    return true
                }
            }
        }
        if (rule_name === 'min') {
            const minValue = Number(rule_value);
            if (Number(value) < minValue) {
                error = `The value must be at least ${minValue}`;
                return true;
            }
        }
        if (rule_name === 'not_future') {
            const now = new Date(Date.now()).toISOString()
            if (value > now) {
                error = 'The date and time cannot be in the future';
                return true;
            }
        }
        if (rule_name === 'after') {
            const relatedField = data[rule_value];
            if (relatedField && new Date(value) < new Date(relatedField)) {
                error = `This time must be after ${rule_value.replaceAll('_', ' ')}`;
                return true;
            }
        }

        return false
    })
    return error
}

export function validateObjectFields(obj){
    const list_errors = {}
    for (let field in obj){
        const error = validateField(field, obj[field], obj)
        error && Object.assign(list_errors, { [field]: error })
    }

    return list_errors
}

export function currentDateTime(){
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function getDifferences(obj1, obj2) {
    const differences = {};
    for (const key in obj2) {
        if (obj2[key] !== obj1[key]) {
            differences[key] = obj2[key];
        }
    }
    return differences;
}