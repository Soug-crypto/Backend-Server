const express = require('express');
const router = express.Router();
const BubbleModel = require('../models/Bubbles');
const UserModel = require('../models/Users');

router.get("/", (req, res) => {
    res.send("test");
});

router.post("/create", (req, res) => {
    // Todo validation

    let {name} = req.body;
    BubbleModel.createBubble(name)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

/****
 * Generate temp Token for a bubble
 * @param bubbleId
 * @return the temp link hash
 */
router.post('/temp-token', function (req, res) {
    // Todo validation

    const {bubbleId} = req.body;
    BubbleModel.generateToken(bubbleId)
        .then(result => {
            res.send(result.temp_link);
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

router.delete('/leave', function (req, res) {
    // Todo validation
    const {user_id, bubble_id} = req.body;

    UserModel.leaveBubble(user_id, bubble_id)
        .then(result => {
            console.log({result});
            res.status(200).send();
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

module.exports = router;