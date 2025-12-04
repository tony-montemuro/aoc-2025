import read from "../../read.mjs";

function solve(input, isRepeated = false) {
    const rows = input.split("\n").map(row => ("." + row + ".").split(''));
    const padding = new Array(rows[0].length).fill(".");
    rows.unshift(padding);
    rows.push(padding);

    const m = rows.length, n = rows[0].length;
    let positions = [], res = 0;

    do {
        while (positions.length > 0) {
            const [x, y] = positions.pop();
            rows[y][x] = '.';
        }

        for (let y = 1; y < m - 1; y++) {
            for (let x = 1; x < n - 1; x++) {
                if (rows[y][x] === '@') {
                    let count = -1;
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            if (rows[y + dy][x + dx] === '@') {
                                count++;
                            }
                        }
                    }
                    if (count < 4) {
                        positions.push([x, y]);
                        res++;
                    }
                }
            }
        }

    } while (positions.length > 0 && isRepeated);

    return res;
}

async function main() {
    const input = await read();

    const P1 = solve(input);
    const P2 = solve(input, true);

    console.log(P1, P2);
}

main();
