const express = require('express');
const Redis = require('ioredis');

const app = express();

const redis = new Redis({
    host: 'localhost',
    port: 6379,
    password: '#!50745'
});

app.get('/message', async (req, res) => {
    try {
        const cachedData = await redis.get('data');
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        } else {
            const data = {
                message: 'Hi code viewer',
                message1: 'This is node app with redis integration',
                message3: 'Follow read me to execute this app and try redis operations.'
            };
            await redis.setex('message', 300, JSON.stringify(data));
            return res.json(data);
        }
    } catch (error) {
        console.error('Something went wrong while retrieving/putting the data from redis:', error);
        return res.status(500).json({ error: 'Something went wrong while retrieving/putting the data from redis'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
