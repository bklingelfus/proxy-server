const express = require('express');
const https = require('https');
const app = express();

app.get('/get-data/:symbol', (req, res) => {
    https.get('https://query1.finance.yahoo.com/v10/finance/quoteSummary/'+[req.params.symbol]+'?modules=assetProfile', { headers: { 'Accept': 'application/json' } }, (apiRes) => {
        let data = '';
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        apiRes.on('end', () => {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        });
    });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
