const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();

const allowedOrigins = ['https://finance-app-fe.herokuapp.com/'];

// app.use(cors({
//     origin: function (origin, callback) {
//         // allow requests with no origin 
//         // (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     }
// }));
app.use(cors());

app.get('/yahoo-finance/:module/:symbol', (req, res) => {
    https.get('https://query1.finance.yahoo.com/v10/finance/quoteSummary/'+[req.params.symbol]+'?modules='+[req.params.module], { headers: { 'Accept': 'application/json' } }, (apiRes) => {
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

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});
