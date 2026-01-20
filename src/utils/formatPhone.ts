export function formatPhone(v: string) {
    const clean = v.replace(/\D/g, '') 

    if(clean.length > 11) {
        v.slice(0, 15);
    }

    const formatedValue = clean
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2')

        return formatedValue;
}

export function cleanPhone(v: string) {
    const clean = v.replace(/[\(\)\s-]/g, "") 
    return clean;
}