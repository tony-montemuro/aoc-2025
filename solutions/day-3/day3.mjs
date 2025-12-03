import read from "../../read.mjs";

function solve(input, size) {
    const banks = input.split("\n").map(line => line.split('').map(c => parseInt(c)));
    let total = 0;

    for (const bank of banks) {
        let l = 0, r = bank.length - size + 1;
        let joltage = 0;

        for (let exp = size - 1; exp >= 0; exp--) {
            let maxIndex = l;

            for (let i = l; i < r; i++) {
                if (bank[i] > bank[maxIndex]) {
                    maxIndex = i;
                }
            }

            joltage += bank[maxIndex] * Math.pow(10, exp);
            l = maxIndex + 1;
            r++;
        }

        total += joltage;
    }

    return total;

}

async function main() {
    const input = await read();

    const P1 = solve(input, 2);
    const P2 = solve(input, 12);

    console.log(P1, P2);
}

main();
