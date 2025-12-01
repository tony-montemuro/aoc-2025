import read from "../../read.mjs";

const SIZE = 100;

function parseReading(line) {
    return [line[0], parseInt(line.slice(1))];
}

function getRotation(magnitude, direction) {
    return direction === 'L' ? -1 * magnitude : magnitude;
}

function part1(input) {
    let dial = 50, res = 0;

    for (const line of input.split("\n")) {
        const [direction, magnitude] = parseReading(line);
        const rotation = getRotation(magnitude, direction);
        dial = (dial + rotation) % SIZE;
        if (dial < 0) {
            dial += SIZE;
        }
        if (dial === 0) {
            res++;
        }
    }

    return res;
}

function part2(input) {
    let dial = 50, res = 0;

    for (const line of input.split("\n")) {
        const [direction, magnitude] = parseReading(line);
        const rotation = getRotation(magnitude, direction);

        res += Math.floor(magnitude / SIZE);

        let d = dial;
        if (direction === 'L' && dial === 0) {
            d = SIZE;
        }
        if (direction === 'R') {
            d = SIZE - dial;
        }
        if (magnitude % SIZE >= d) {
            res++;
        }

        dial = (dial + rotation) % SIZE;
        if (dial < 0) {
            dial += SIZE;
        }
    }

    return res;
}

async function main() {
    let input = await read();
    console.log(part1(input), part2(input))
}

main();
