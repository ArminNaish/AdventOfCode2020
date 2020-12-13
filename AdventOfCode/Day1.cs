using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;

namespace AdventOfCode
{
    /// <summary>
    /// todo: try to find an algorithm which solve the problem in one go
    /// </summary>
    public static class Day1
    {
        public class Permutations
        {
            private readonly Node _root;
            
            private Permutations(Node root)
            {
                _root = root;
            }
            
            public static Permutations Of(long[] numbers, int length)
            {
                if (!numbers.Any()) throw new ArgumentException(nameof(numbers));
                if (length <= 0) throw new ArgumentException(nameof(length));
                
                var root = new Node();
                root.Add(numbers, length);
                return new Permutations(root);
            }

            public List<long> FindProductsBySum(long sum)
            {
                return _root.Children
                    .SelectMany(n => n.IterateChildren())
                    .Where(n => n.sum == sum)
                    .Select(n => n.product)
                    .Distinct()
                    .ToList();
            }
        }

        public record Node
        {
            public List<Node> Children { get; } = new List<Node>();
        
            private long Value { get; init; }

            public void Add(long[] numbers, int maxDepth, int depth = 0)
            {
                if (maxDepth == depth) return;
                
                for (var i = 0; i < numbers.Length; i++)
                {
                    var node = new Node {Value = numbers[i]};
                    Children.Add(node);
                    node.Add(numbers.SkipAt(i).ToArray(),  maxDepth, depth +1);
                }
            }

            public IEnumerable<(long sum, long product)> IterateChildren()
            {
                if (!Children.Any())
                {
                    yield return (Value,Value);
                    yield break;
                }

                foreach (var node in Children)
                {
                    foreach (var (sum, product) in node.IterateChildren())
                    {
                        yield return (sum+Value, product*Value);
                    }
                }
            }
        }
        
        
        private static IEnumerable<long> SkipAt(this IEnumerable<long> numbers, int index)
        {
            var counter = 0;
            using var e = numbers.GetEnumerator();
            while (e.MoveNext())
            {
                if (counter != index)
                {
                    yield return e.Current;
                }
            
                counter++;
            }
        }
    }
}