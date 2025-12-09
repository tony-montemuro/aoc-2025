import read from "../../read.mjs";

function parse(input) {
    return input.split("\n").map(line => line.split(",").map(number => parseInt(number)));
}

function part1(input) {
    const tiles = parse(input);
    const n = tiles.length;
    let maxArea = 0;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 1; j < n; j++) {
            const [x1, y1] = tiles[i];
            const [x2, y2] = tiles[j];
            const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y2 - y1) + 1);

            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
}

async function main() {
    const input = await read();

    const P1 = part1(input);

    console.log(P1);
}

main();
