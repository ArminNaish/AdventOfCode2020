import { validate } from './passport-processing.js';
import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";

Deno.test("valid: all fields are present", () => {
    const passport =`
        ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
        byr:1937 iyr:2017 cid:147 hgt:183cm
    `;
    const result = validate(passport);
    assertEquals(result, true);
});

Deno.test("invalid: hgt is missing", () => {
    const passport =`
        iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
        hcl:#cfa07d byr:1929
    `;
    const result = validate(passport);
    assertEquals(result, false);
});


Deno.test("valid: cid is optional", () => {
    const passport =`
        hcl:#ae17e1 iyr:2013
        eyr:2024
        ecl:brn pid:760753108 byr:1931
        hgt:179cm
    `;
    const result = validate(passport);
    assertEquals(result, true);
});


Deno.test("invalid: cid and byr is missing", () => {
    const passport =`
        hcl:#cfa07d eyr:2025 pid:166559648
        iyr:2011 ecl:brn hgt:59in
    `;
    const result = validate(passport);
    assertEquals(result, false);
});



// --- part 2 ---


Deno.test("valid 1: all fields are present and valid", () => {
    const passport =`
    pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
    hcl:#623a2f
    `;
    const result = validate(passport);
    assertEquals(result, true);
});

Deno.test("valid 2: all fields are present and valid", () => {
    const passport =`
    eyr:2029 ecl:blu cid:129 byr:1989
    iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm
    `;
    const result = validate(passport);
    assertEquals(result, true);
});

Deno.test("valid 3: all fields are present and valid", () => {
    const passport =`
    hcl:#888785
    hgt:164cm byr:2001 iyr:2015 cid:88
    pid:545766238 ecl:hzl
    eyr:2022
    `;
    const result = validate(passport);
    assertEquals(result, true);
});

Deno.test("valid 4: all fields are present and valid", () => {
    const passport =`
    iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
    `;
    const result = validate(passport);
    assertEquals(result, true);
});


Deno.test("invalid 1: all fields are present but not valid", () => {
    const passport =`
    eyr:1972 cid:100
    hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926
    `;
    const result = validate(passport);
    assertEquals(result, false);
});


Deno.test("invalid 2: all fields are present but not valid", () => {
    const passport =`
    iyr:2019
    hcl:#602927 eyr:1967 hgt:170cm
    ecl:grn pid:012533040 byr:1946
    `;
    const result = validate(passport);
    assertEquals(result, false);
});

Deno.test("invalid 3: all fields are present but not valid", () => {
    const passport =`
    hcl:dab227 iyr:2012
    ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277
    `;
    const result = validate(passport);
    assertEquals(result, false);
});

Deno.test("invalid 4: all fields are present but not valid", () => {
    const passport =`
    hgt:59cm ecl:zzz
    eyr:2038 hcl:74454a iyr:2023
    pid:3556412378 byr:2007
    `;
    const result = validate(passport);
    assertEquals(result, false);
});