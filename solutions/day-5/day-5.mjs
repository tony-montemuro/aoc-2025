import read from "../../read.mjs";

function getRangeAndIds(input) {
    let [ranges, ids] = input.split("\n\n");
    ranges = ranges.split("\n").map(s => s.split("-").map(val => parseInt(val)));
    ids = ids.split("\n").map(s => parseInt(s));
    return [ranges, ids];
}

function part1(input) {
    const [ranges, ids] = getRangeAndIds(input);
    const inRange = id => {
        for (const [begin, end] of ranges) {
            if (id >= begin && id <= end) {
                return true;
            }
        }

        return false;
    };

    let res = 0;
    for (const id of ids) {
        if (inRange(id)) {
            res++;
        }
    }

    return res;
}

function part2(input) {
    const [ranges] = getRangeAndIds(input);
    ranges.sort((a, b) => a[0] - b[0]);

    const merged = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
        const [start, end] = ranges[i];
        const prevEnd = merged.at(-1)[1];

        if (start <= prevEnd) {
            merged.at(-1)[1] = Math.max(prevEnd, end);
        } else {
            merged.push(ranges[i]);
        }
    }

    let res = 0;
    for (const [start, end] of merged) {
        res += end - start + 1;
    }
    return res;
}

async function main() {
    const input = await read();

    const P1 = part1(input);
    const P2 = part2(input);

    console.log(P1, P2);
}

main();
