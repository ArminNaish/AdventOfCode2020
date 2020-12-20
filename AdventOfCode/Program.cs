using System.Collections.Generic;
using System.IO;
using System.Linq;
using static AdventOfCode.Day3;

// day 3
var map = await File.ReadAllTextAsync("/home/armin/code/AdventOfCode/AdventOfCode/day3.txt");

var range = new List<(int, int)> { (1, 1), (3, 1), (5, 1), (7, 1), (1, 2) };

long product = 1;
foreach (var (right, down) in range)
{
    long result = FindRoute(map, right, down).Count(c => c == 'X');
    product *= result;
}

System.Console.WriteLine($"How many trees encountered: {product}");



