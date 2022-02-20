const User = require('../models/user');
const Site = require('../models/site');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
// const { pool } = require('../uploads/_pool');

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


const createUser = async (req, res) => {
    const data = req.body;
    const authImages = [];
    for (let i = 0; i < 5; i++) {
        authImages.push(req.files['file' + i][0].filename)
    }
    try {
        const newUser = new User(data);
        await newUser.save();
        await User.findByIdAndUpdate(newUser._id, { authImages: authImages });
        await Site.findOneAndUpdate({ name: 'gawds' }, { $push: { pool: { "$each": authImages } }, $inc: { poolLength: 5 } });
        res.status(201).send('Account Created');
    } catch (error) {
        authImages.forEach((f) => {
            try {
                const filePath = 'uploads/pool/' + f;
                fs.unlinkSync(filePath);
            } catch (error) {
                console.log(error.message);
            }
        })
        res.status(409).send('Username Already Taken !!');
    }
};
const createUser2 = async (req, res) => {
    const data = req.body;
    try {
        const newUser = new User({ username: data.username, authImages: data.images2 });
        await newUser.save();
        res.status(201).send('Account Created');
    } catch (error) {
        console.log(error.message);
        res.status(409).send('Username Already Taken !!');
    }
};
const checkUser = async (req, res) => {
    const { data } = req.body;
    try {
        const user = await User.findOne({ username: data });
        const site = await Site.findOne({ username: 'gawds' }, 'poolLength');
        console.log(user);
        if (user === null) {
            throw new Error("error")
        }
        const options = [];
        user.authImages.forEach((i) => options.push(i));
        while (27 - options.length) {
            const ck = Math.floor((Math.random() * (site.poolLength - 1)) + 0);
            const val = await Site.findOne({ username: 'gaawds' }, { "pool": { $arrayElemAt: ["$pool", ck] } });
            if (!options.includes(val.pool[0]))
                options.push(val.pool[0]);
        }
        res.status(200).json({ options: shuffle(options), username: user.fullname });
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: false });
    }
};
const finalCheckUser = async (req, res) => {
    const { data } = req.body;
    try {
        const user = await User.findOne({ username: data.username });
        if (user === null)
            throw new Error("error1")
        console.log(user.authImages, data.selectedImg);
        if (!(user.authImages.length === data.selectedImg.length && user.authImages.every((v, i) => data.selectedImg.includes(v))))
            throw new Error("error2")
        const payload = {
            user: {
                _id: user._id,
                username: user.username
            }
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '720hr' });
        res.cookie('tkn', token, { maxAge: 2592000000, httpOnly: true });
        res.status(200).json({ message: true, userId: user._id, username: user.fullname });
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: false });
    }
};
const checkLogin = async (req, res) => {
    res.status(200).json({ username: req.username });
}
const userLogout = async (req, res) => {
    try {
        res.clearCookie('tkn');
        console.log("logout sucessfully!!");
        res.status(200).send("sucess!!")
    } catch (error) {
        console.log(error.message);
    }
};
const fetchOptions = async (req, res) => {
    try {
        const site = await Site.findOne({ username: 'gawds' }, 'poolLength');
        const options = [];
        while (27 - options.length) {
            const ck = Math.floor((Math.random() * (site.poolLength - 1)) + 0);
            const val = await Site.findOne({ username: 'gaawds' }, { "pool": { $arrayElemAt: ["$pool", ck] } });
            if (!options.includes(val.pool[0]))
                options.push(val.pool[0]);
        }
        res.status(200).json({ options });
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: 'error occured' });
    }
};
module.exports = { userLogout, checkLogin, createUser, checkUser, finalCheckUser, fetchOptions, createUser2 }
// const createUser = async (req, res) => {
//     const data = req.body;
//     const authImages = [];
//     for (let i = 0; i < 5; i++) {
//         authImages.push(req.files['file' + i][0].filename)
//     }
//     try {
//         const newUser = new User(data);
//         await newUser.save();
//         // try {
//         //     fs.renameSync('uploads/user' + req.params.uid, 'uploads/user' + newUser.username);
//         // } catch (err) {
//         //     throw err;
//         // }
//         try {
//             console.log(authImages);
//             await User.findByIdAndUpdate(newUser._id, { authImages: authImages })
//         } catch (error) {
//             console.log(error.message);
//             // try {
//             //     fs.rmdirSync('uploads/user' + newUser.username, { recursive: true })
//             //     console.log(`deleted!`);
//             // } catch (err) {
//             //     console.error(err)
//             //     res.status(409).send('error Occured');
//             // }
//             throw error;
//         }
//         res.status(201).send('Account Created');
//     } catch (error) {
//         // try {
//         //     fs.rmdirSync('uploads/user' + req.params.uid, { recursive: true })
//         //     console.log(`deleted!`);
//         // } catch (err) {
//         //     console.error(err)
//         // }
//         authImages.forEach((f) => {
//             try {
//                 const filePath = 'uploads/pool/' + f;
//                 // console.log(filePath);
//                 fs.unlinkSync(filePath);
//             } catch (error) {
//                 console.log(error.message);
//             }
//         })
//         res.status(409).send('Username Already Taken !!');
//     }
// };
