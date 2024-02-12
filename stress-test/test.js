
// URL of your Azure Function
import http from 'k6/http';
import { sleep } from 'k6';

const functionUrl = 'https://simplecalc.azurewebsites.net/';

export let options = {
    stages: [
        { duration: '1m', target: 20 }, // Ramp up to 20 users over 1 minute
        { duration: '3m', target: 20 }, // Stay at 20 users for 3 minutes
        { duration: '1m', target: 0 },  // Ramp down to 0 users over 1 minute
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    },
};

export default function () {
    http.get(functionUrl);
    sleep(1); // Wait 1 second between requests
}