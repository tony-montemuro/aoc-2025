import read from "../../read.mjs";

function parse(input) {
    const sections = input.split("\n\n").map(section => section.split("\n"));

    const shapes = [];
    for (let i = 0; i < sections.length - 1; i++) {
        shapes.push(Array.from(sections[i].join('')).filter(c => c === '#').length);
    }

    const regions = [];
    const data = sections.at(-1);
    for (let i = 0; i < data.length; i++) {
        let [dimensions, indices] = data[i].split(": ");
        const area = dimensions.split("x").map(n => parseInt(n)).reduce((a, b) => a * b, 1);
        const map = new Map();
        indices = indices.split(" ").map(n => parseInt(n));
        for (let i = 0; i < indices.length; i++) {
            map.set(i, indices[i]);
        }
        regions.push([area, map]);
    }

    return [shapes, regions];
}

function part1(input) {
    const [shapes, regions] = parse(input);

    let sum = 0;
    for (const region of regions) {
        const [area, map] = region;
        let min = 0;
        for (let i = 0; i < shapes.length; i++) {
            min += (shapes[i] * map.get(i));
        }
        if (min < area) {
            sum++;
        }
    }

    return sum;
}

async function main() {
    const input = await read();

    const P1 = part1(input);

    console.log(P1);
}

main();
