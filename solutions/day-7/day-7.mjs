import read from "../../read.mjs";

function parse(input) {
    return input.split("\n").map(s => s.split(''));
}

function part1(input) {
    const manifold = parse(input);
    const n = manifold.length;
    const start = manifold[0].indexOf('S');
    const VISITED = '*';

    function dfs(x, y) {
        if (manifold[y][x] === VISITED) {
            return 0;
        }
        if (y + 1 === n) {
            return 0;
        }
        if (manifold[y][x] !== '^') {
            manifold[y][x] = VISITED;
            return dfs(x, y + 1);
        }

        return 1 + dfs(x - 1, y) + dfs(x + 1, y);
    }

    return dfs(start, 0);
}

function part2(input) {
    const manifold = parse(input);
    const n = manifold.length;
    const start = manifold[0].indexOf('S');
    const visited = new Map();

    function dfs(x, y) {
        const key = `${x},${y}`;
        if (visited.has(key)) {
            return visited.get(key);
        }
        if (y + 1 === n) {
            return 1;
        }

        let total = 0;
        if (manifold[y][x] !== '^') {
            total = dfs(x, y + 1);
        } else {
            total = dfs(x - 1, y) + dfs(x + 1, y);
        }

        visited.set(key, total);
        return total;
    }

    return dfs(start, 0);
}

async function main() {
    const input = await read();

    const P1 = part1(input);
    const P2 = part2(input);

    console.log(P1, P2);
}

main();
