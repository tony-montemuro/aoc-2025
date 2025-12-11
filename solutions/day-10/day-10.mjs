import read from "../../read.mjs";

function parse(input) {
    const machines = [];
    const lines = input.split("\n");
    for (const line of lines) {
        const data = line.split(" ");
        const light = data[0]
            .slice(1, -1)
            .replaceAll(".", "0")
            .replaceAll("#", "1")
            .split("")
            .map(l => parseInt(l === "1" ? l : -1))
        const btns = data
            .slice(1, -1)
            .map(btns => btns.slice(1, -1))
            .map(btns => btns.split(",").map(btn => parseInt(btn)));
        machines.push([light, btns]);
    }
    return machines;
}

function part1(input) {
    const machines = parse(input);
    let res = 0;

    for (const machine of machines) {
        const [lights, buttons] = machine;

        function dfs(depth, prev) {
            const indicies = [];
            for (let i = 0; i < lights.length; i++) {
                if (lights[i] === 1) {

                    indicies.push(i);
                }
            }

            if (indicies.length === 0) {
                return depth;
            }
            if (depth === 10) {
                return Number.MAX_SAFE_INTEGER;
            }

            let min = Number.MAX_SAFE_INTEGER;

            for (let i = 0; i < buttons.length; i++) {
                if (i === prev) {
                    continue;
                }

                const b = buttons[i];
                let j = 0, k = 0, isValid = false;
                while (!isValid && j < indicies.length && k < b.length) {
                    if (indicies[j] < b[k]) {
                        j++;
                    } else if (indicies[j] > b[k]) {
                        k++;
                    } else {
                        isValid = true;
                        j++;
                        k++;
                    }
                }

                if (isValid) {
                    for (const btn of b) {
                        lights[btn] *= -1;
                    }
                    min = Math.min(min, dfs(depth + 1, i));
                    for (const btn of b) {
                        lights[btn] *= -1;
                    }
                }
            }

            return min;
        }

        res += dfs(0, -1);
    }

    return res;
}

async function main() {
    const input = await read();

    const P1 = part1(input);

    console.log(P1);
}

main();
