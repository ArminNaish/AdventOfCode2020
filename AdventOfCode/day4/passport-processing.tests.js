import { parse, validate } from './passport-processing.js';
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

