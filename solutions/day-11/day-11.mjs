import read from "../../read.mjs";

function parse(input) {
    const lines = input.split("\n");
    const adjList = new Map();

    for (const line of lines) {
        const data = line.split(": ");
        const from = data[0];
        const to = data[1].split(" ");
        adjList.set(from, to);
    }

    return adjList;
}

function part1(input) {
    const adjList = parse(input);
    const seen = new Set();
    const visited = new Map();
    visited.set('out', 1);

    function dfs(node) {
        if (seen.has(node)) {
            return 0;
        }
        if (visited.has(node)) {
            return visited.get(node);
        }

        seen.add(node);

        let res = 0;
        for (const neighbor of adjList.get(node)) {
            res += dfs(neighbor);
        }

        seen.delete(node);
        visited.set(node, res);
        return res;
    }

    return dfs('you');
}

function part2(input) {
    const adjList = parse(input);

    function calculateWays(src, dst) {
        const seen = new Set();
        const visited = new Map();
        visited.set(dst, 1);

        function dfs(node) {
            if (seen.has(node)) {
                return 0;
            }
            if (visited.has(node)) {
                return visited.get(node);
            }

            let res = 0;
            for (const neighbor of adjList.get(node) ?? []) {
                res += dfs(neighbor);
            }

            seen.delete(node);
            visited.set(node, res);
            return res;
        }

        return dfs(src);
    }

    return calculateWays('dac', 'out') * calculateWays('fft', 'dac') * calculateWays('svr', 'fft');
}

async function main() {
    const input = await read();

    const P1 = part1(input);
    const P2 = part2(input);

    console.log(P1, P2);
}

main();
