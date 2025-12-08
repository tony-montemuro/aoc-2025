import read from "../../read.mjs";

function solve(input, count) {
    function distance(p1, p2) {
        const [x1, y1, z1] = p1;
        const [x2, y2, z2] = p2;

        return Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2);
    }

    function find(i) {
        if (i !== par[i]) {
            par[i] = find(par[i]);
        }
        return par[i];
    }

    function union(i, j) {
        const p1 = find(i), p2 = find(j);

        if (p1 === p2) {
            return rank[p1];
        }

        if (rank[p2] > rank[p1]) {
            par[p1] = p2;
            rank[p2] += rank[p1];
            return rank[p2];
        } else {
            par[p2] = p1;
            rank[p1] += rank[p2];
            return rank[p1];
        }
    }

    function part1() {
        // path compression
        for (let i = 0; i < coordinates.length; i++) {
            find(i);
        }

        const counts = {};
        for (let p of par) {
            counts[p] = 1 + (counts[p] ?? 0);
        }

        return Object.values(counts).toSorted((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1);
    }

    const coordinates = input.split("\n").map(line => line.split(",").map(n => parseInt(n)));
    const n = coordinates.length;
    const par = new Array(n).fill(0).map((_, i) => i);
    const rank = new Array(n).fill(1);
    const connected = new Map();
    let maxRank = 1, prevConnected;
    let ctr = 0, P1, P2;

    while (maxRank < n) {
        let closest;
        let min = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                if (!connected.has(i) || !connected.get(i).has(j)) {
                    const p1 = coordinates[i], p2 = coordinates[j];
                    const dist = distance(p1, p2);
                    if (dist < min) {
                        min = dist;
                        closest = [i, j];
                    }
                }
            }
        }

        const [i, j] = closest;
        if (!connected.has(i)) {
            connected.set(i, new Set());
        }
        connected.get(i).add(j);
        maxRank = Math.max(maxRank, union(i, j));
        prevConnected = [i, j];
        ctr++;
        if (ctr === count) {
            P1 = part1();
        }
    }

    P2 = coordinates[prevConnected[0]][0] * coordinates[prevConnected[1]][0];
    return [P1, P2];
}

async function main() {
    const input = await read();

    const [P1, P2] = solve(input, 1000);

    console.log(P1, P2);
}

main();
