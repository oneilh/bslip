const fs = require('fs');
const data = JSON.parse(fs.readFileSync("C:/Users/O'Neil/.gemini/antigravity-ide/brain/2284e455-0581-4966-9dfc-2304baa8df3f/.system_generated/steps/103/output.txt", 'utf8'));

const results = [];
data.forEach(b => {
    const ftOdds = b.odds.find(o => o.bettingType === 'HOME_DRAW_AWAY' && o.bettingScope === 'FULL_TIME');
    if (ftOdds) {
        const o1 = ftOdds.odds[0]?.value;
        const oX = ftOdds.odds[2]?.value;
        const o2 = ftOdds.odds[1]?.value;
        results.push(`${b.name}: 1=${o1}, X=${oX}, 2=${o2}`);
    }
});
console.log(results.join('\n'));
