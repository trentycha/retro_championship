const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const SECRET = process.env.WEBHOOK_SECRET;

http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const signature = req.headers['x-hub-signature-256'];
            const hmac = crypto.createHmac('sha256', SECRET);
            const digest = 'sha256=' + hmac.update(body).digest('hex');

            if (signature !== digest) {
                res.statusCode = 401;
                res.end('Unauthorized');
                return;
            }

            const payload = JSON.parse(body);

            if (payload.ref === 'refs/heads/main') {
                console.log('Push sur main détecté, déploiement en cours.');
                exec(
                    'bash /var/www/retro_championship/deploy.sh',
                    (err, stdout) => {
                        if (err) {
                            console.error('Erreur déploiement:', err);
                            return;
                        }
                        console.log(stdout);
                    }
                );
            }

            res.statusCode = 200;
            res.end('OK');
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
}).listen(3002, () => {
    console.log('Webhook server listening on port 3002');
});
