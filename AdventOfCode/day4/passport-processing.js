export function validate(sequence){
    const passport = parse(sequence);
    return verify(passport);
}

function parse(sequence){
    let obj = {}
    sequence = sequence.replace(/(?:\r\n|\r|\n)/g, ' ');
    for (let field of ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'cid', 'hgt']){
        const regex = new RegExp(`${field}:([^\\s]*)`, 'gi');
        const match = regex.exec(sequence);
        obj[field] = match ? match[1] : null;
    }
    return obj;
}

function verify(passport){
    for (let field of ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt']){
        if (!passport.hasOwnProperty(field) ) {
            return false;
        }
        if (passport[field] == null){
            return false;
        }
    }
    return true;
}




const text = await Deno.readTextFile('./input.txt');
const sequences = text.split(/(?:\r\n\r\n|\r\r|\n\n)/g);

let counter = 0;
for(const sequence of sequences){
    const inc = validate(sequence) ? 1 : 0;
    counter += inc; 
}

console.log(counter);