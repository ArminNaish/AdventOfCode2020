const validator = {
    'byr': validateBirthYear,
    'iyr': validateIssueYear,
    'eyr': validateExpirationYear,
    'hgt': validateHeight,
    'hcl': validateHairColor,
    'ecl': validateEyeColor,
    'pid': validatePassportId,
};

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
        if (passport[field] === null){
            return false;
        }
        if (!validator[field](passport[field])){
            return false;
        }
    }
    return true;
}

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
function validateBirthYear(value){
    return isInRange(1920, 2002, value);
}

// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
function validateIssueYear(value){
    return isInRange(2010, 2020, value);
}

// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
function validateExpirationYear(value){
    return isInRange(2020, 2030, value);
}

// hgt (Height) - a number followed by either cm or in:
//     If cm, the number must be at least 150 and at most 193.
//     If in, the number must be at least 59 and at most 76.
function validateHeight(value){
    const regex = /(\d+)(.+)/i;
    const [number, unit] = value.match(regex).slice(1,3);
    return unit.toLowerCase() === 'cm'
        ? isInRange(150, 193, number)
        : isInRange(59,76, number);
}

// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
function validateHairColor(value){
    const regex = /^#[0-9a-f{6}]+$/;
    const match = value.match(regex);
    return match !== null;
}

// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
function validateEyeColor(value){
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
}

// pid (Passport ID) - a nine-digit number, including leading zeroes.
function validatePassportId(value){
    const regex = /^[0-9]{9}$/;
    const match = value.match(regex);
    return match !== null;
}

function isInRange(from, to, value){
    var number = parseInt(value);
    if (isNaN(number))
        return false;
    return (number >= from && number <= to)
}


const text = await Deno.readTextFile('./input.txt');
const sequences = text.split(/(?:\r\n\r\n|\r\r|\n\n)/g);

let counter = 0;
for(const sequence of sequences){
    const inc = validate(sequence) ? 1 : 0;
    counter += inc; 
}

console.log(counter);