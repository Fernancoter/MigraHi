const fs = require('fs');

const lines = fs.readFileSync('C:\\\\Users\\\\FCO\\\\.gemini\\\\antigravity-ide\\\\brain\\\\6ce418a2-49c0-4de9-b75c-7be4b1ac905a\\\\.system_generated\\\\logs\\\\transcript.jsonl', 'utf8').split('\\n');

let bestMatch = null;
for (const line of lines) {
    if (!line) continue;
    try {
        const data = JSON.parse(line);
        const content = data.content;
        if (content && typeof content === 'string' && content.includes('styles: [`') && content.includes('SilosComponent')) {
            bestMatch = content;
        }
    } catch (e) {}
}

if (bestMatch) {
    fs.writeFileSync('C:\\\\KBs\\\\HiCone6\\\\recovered_silos.txt', bestMatch);
    console.log('Recovered to recovered_silos.txt');
} else {
    // Try finding the style block directly
    for (const line of lines) {
        if (!line) continue;
        try {
            const data = JSON.parse(line);
            const content = data.content;
            if (content && typeof content === 'string' && content.includes('styles: [`') && content.includes('.premium-grid')) {
                bestMatch = content;
            }
        } catch (e) {}
    }
    if (bestMatch) {
        fs.writeFileSync('C:\\\\KBs\\\\HiCone6\\\\recovered_silos.txt', bestMatch);
        console.log('Recovered a match with .premium-grid to recovered_silos.txt');
    } else {
        console.log('Could not find original styles block');
    }
}
