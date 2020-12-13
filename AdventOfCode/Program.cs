using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using static AdventOfCode.Day1;

// day 1 - expense report
var assemblyPath = Assembly.GetExecutingAssembly().Location;
var projectDir = Path.GetDirectoryName(assemblyPath);
var path = Path.Combine(projectDir, "day1.txt");
var expenses = File.ReadAllLines(path).Select(long.Parse).ToArray();

// part 1 - solution: 259716
Permutations
    .Of(expenses, 2)
    .FindProductsBySum(2020)
    .ForEach(p => Console.WriteLine($"The total expenses of 2020 by 2 are: {p}"));


// part 2 - solution: 120637440
Permutations
    .Of(expenses, 3)
    .FindProductsBySum(2020)
    .ForEach(p => Console.WriteLine($"The total expenses of 2020 by 3 are: {p}"));
   
