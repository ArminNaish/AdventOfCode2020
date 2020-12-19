using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    public class Day2
    {
        public static bool VerifyPassword(string record)
        {
            var pattern = @"^(\d+)-(\d+) (.{1}): (.+)$";
            var regex = new Regex(pattern, RegexOptions.ECMAScript);
            var match = regex.Match(record);

            if (!match.Success) return false;
            if (match.Groups.Count != 5) return false;

            var min = int.Parse(match.Groups[1].Value);
            var max = int.Parse(match.Groups[2].Value);
            var letter = char.Parse(match.Groups[3].Value);
            var password = match.Groups[4].Value;

            var dict = new Dictionary<char, int>();
            foreach (var @char in password)
            {
                dict[@char] = dict.GetValueOrDefault(@char) + 1;
            }

            var amount = dict.GetValueOrDefault(letter);
            return amount >= min && amount <= max;
        }

        public static bool VerifyPassword2(string record)
        {
            var pattern = @"^(\d+)-(\d+) (.{1}): (.+)$";
            var regex = new Regex(pattern, RegexOptions.ECMAScript);
            var match = regex.Match(record);

            if (!match.Success) return false;
            if (match.Groups.Count != 5) return false;

            var first = int.Parse(match.Groups[1].Value);
            var second = int.Parse(match.Groups[2].Value);
            var letter = char.Parse(match.Groups[3].Value);
            var password = match.Groups[4].Value;

            // exactly one character must match: pos1 xor pos2
            return password[first-1] == letter ^ password[second-1] == letter;
        }
    }
}