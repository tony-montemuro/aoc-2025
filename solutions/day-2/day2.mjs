import read from "../../read.mjs"

function parse(input) {
    return input.split(",").map(line => line.split("-").map(id => parseInt(id)));
}

function part1(input) {
    const ids = parse(input);
    const isInvalid = (s => {
        if (s.length % 2 === 1) {
            return false;
        }

        let m = s.length / 2;

        for (let l = 0, r = m; r < s.length; l++, r++) {
            if (s[l] !== s[r]) {
                return false;
            }
        }

        return true;
    });

    let sum = 0;
    for (const [start, end] of ids) {
        for (let id = start; id <= end; id++) {
            if (isInvalid(id.toString())) {
                sum += id;
            }
        }
    }

    return sum;
}

function part2(input) {
    const ids = parse(input);
    const isInvalid = (s => {
        const n = s.length;
        let m = Math.floor(n / 2);

        for (let i = 1; i <= m; i++) {
            if (n % i === 0) {
                let isInvalid = true;
                for (let j = 0; j < i; j++) {
                    let v = s[j], k = i + j;
                    while (k < n) {
                        if (s[k] !== v) {
                            isInvalid = false;
                            break;
                        }
                        k += i;
                    }
                    if (!isInvalid) {
                        break;
                    }
                }
                if (isInvalid) {
                    return true;
                }
            }
        }

        return false;
    });

    let sum = 0;
    for (const [start, end] of ids) {
        for (let id = start; id <= end; id++) {
            if (isInvalid(id.toString())) {
                sum += id;
            }
        }
    }

    return sum;
}

async function main() {
    const input = await read();
    const P1 = part1(input);
    const P2 = part2(input);

    console.log(P1, P2);
}

main();
