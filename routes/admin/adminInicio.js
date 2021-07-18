  
const express = require('express');
const router = express.Router();

const showIndex = (req, res) => {
        res.render('adminInicio');
}

router.get('/', showIndex);
module.exports = router;