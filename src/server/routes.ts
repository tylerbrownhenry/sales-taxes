import * as express from 'express';

const router = express.Router();

router.get('/api/addtoCart', (req, res, next) => {
    console.log('Test');
    res.json('receipt');
});

export default router;