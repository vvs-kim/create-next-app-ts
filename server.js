const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

app.prepare().then(() => {
    const https = require('https');
    const fs = require('fs');
    const options = {
        key: fs.readFileSync('cert/localhost-key.pem'),
        cert: fs.readFileSync('cert/localhost.pem'),
    };
    https
        .createServer(options, function (req, res) {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl);
        })
        .listen(PORT, err => {
            if (err) throw err;
            console.log(`> Ready on https://localhost:${PORT}`);
        });
});
