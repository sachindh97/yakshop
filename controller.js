const routes = require("express").Router();
const fs = require("fs");
const yakYear = 100;
const maxYakYear = 10; // yak dies at 10 years
const filePath = './data.json';
const data = fs.readFileSync(filePath);
let yakData = JSON.parse(data);

// Calculate stock after T days
function calculateStock(T) {
    let totalMilk = 0;
    let totalSkins = 0;

    yakData.herd.forEach(yak => {
        let ageInDays = yak.age * yakYear
        let lastShaveDay = 0;

        for (let day = 1; day <= T; day++) {
            if (ageInDays >= maxYakYear * yakYear) break;
            // Add daily milk production
            totalMilk += 50 - (ageInDays * 0.03)
            // Check if the yak can be shaved
            const shaveInterval = Math.floor(8 + (ageInDays * 0.01));
            if (day - lastShaveDay >= shaveInterval) {
                totalSkins += 1;
                lastShaveDay = day;
            }
            // Increment age in days
            ageInDays++;
        }
    });

    return { milk: parseFloat(totalMilk.toFixed(2)), skins: totalSkins };
}

routes.get('/stock/:day',(req,res)=>{
    console.log(req.params.day,'stock');
    const stock = calculateStock(req.params.day);
    res.json(stock);
});

routes.get('/herd/:day',(req,res)=>{
    const day = parseInt(req.params.day);
    res.send(`no data found ${day} day`);
});

module.exports = routes;