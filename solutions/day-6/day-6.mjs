import read from "../../read.mjs";

function parse(input) {
    const lines = input.split("\n");
    const rows = new Array(lines.length - 1).fill(0).map(_ => []);
    const operations = [];
    const last = lines.at(-1);

    let i = 0;
    while (i < last.length) {
        let curr = i;
        operations.push(last[i++]);
        while (i < last.length && last[i] === ' ') {
            i++;
        }
        let end = i === last.length ? i : i - 1;
        for (let j = 0; j < rows.length; j++) {
            rows[j].push(lines[j].slice(curr, end));
        }
    }

    return [rows, operations];
}

function part1(input) {
    const [rows, operations] = parse(input);
    for (let i = 0; i < rows.length; i++) {
        rows[i] = rows[i].map(n => parseInt(n.trim()));
    }

    let res = rows[0];
    for (let i = 1; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (operations[j] === '+') {
                res[j] += rows[i][j];
            } else {
                res[j] *= rows[i][j];
            }
        }
    }

    return res.reduce((a, b) => a + b, 0);
}

function part2(input) {
    const [rows, operations] = parse(input);

    const cols = new Array(rows[0].length).fill(0).map(_ => []);
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            const number = rows[i][j];
            for (let k = 0; k < number.length; k++) {
                if (cols[j].length === k) {
                    cols[j].push('');
                }
                if (number[k] !== ' ') {
                    cols[j][k] += number[k];
                }
            }
        }
    }

    let res = [];
    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        let ans = operation === '*' ? 1 : 0;

        for (const n of cols[i]) {
            if (operation === '*') {
                ans *= parseInt(n);
            } else {
                ans += parseInt(n);
            }
        }

        res.push(ans);
    }

    return res.reduce((a, b) => a + b, 0);
}

async function main() {
    const input = await read();

    const P1 = part1(input);
    const P2 = part2(input);

    console.log(P1, P2);
}

main();
