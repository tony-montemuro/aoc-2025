import { promises as fs } from 'fs';

export default async function read() {
    try {
        let useExample = false;

        if (process.argv.length === 3) {
            const flag = process.argv.at(-1);

            if (process.argv.at(-1) === '--example') {
                useExample = true;
            } else {
                throw new Error(`Unknown argument: "${flag}". Use "--example" to read from example input.`);
            }
        }

        const filename = useExample ? 'example.txt' : 'input.txt';
        const data = await fs.readFile(filename, 'utf-8');
        return data.slice(0, -1);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

