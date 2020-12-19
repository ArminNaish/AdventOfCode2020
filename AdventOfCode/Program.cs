using System.IO;
using System.Linq;
using System.Reflection;
using static AdventOfCode.Day2;

// day 2 - password philosophy
var validPasswords = File
    .ReadLines("/home/armin/RiderProjects/AdventOfCode/AdventOfCode/day2.txt")
    .Count(VerifyPassword2);

System.Console.WriteLine($"How many passwords are valid: {validPasswords}");



