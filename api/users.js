import express from "express";
import db from "#db/client";
const router = express.Router();
export default router;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function verifyToken(req, res, next){
  const authHeader = req.headers['Authorization'];
  const token = authHeader.split(' ')[1];
  const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedJWT
  next();
}

router.get('/', async(req,res,next) => {
  try {
    const allUsers = await db.query(`SELECT * FROM users`);
    if(!allUsers) return res.status(404).send('Cant find users');

    res.status(200).json(allUsers);
  }catch(err){
    console.log(err)
    res.status(400).send('Cant find the info');
  }
})

router.post('/register', async (req, res, next) => {
  const {email, password, first_name, last_name} = req.body;
  try{
    const hashedPassword = await bcrypt.hash(password, 5)
    const newUser = await db.query(`INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`, [first_name, last_name, email, hashedPassword]);
      if(!newUser) return res.status(401).send(`Couldnt create new user`);
      const tooken = jwt.sign({id: newUser.id, email: newUser.email}, process.env.JWT_SECRET);
      res.status(201).json(token)
  }catch(error){
    console.log(error)
    res.send('Error registering')
  }
})

router.post('/login', async(req,res,next) => {
  const {email, password} = req.body;
  try {
    const realUserInfo = await client.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    const isPWMatch = await bcrypt.compare(password, realUserInfo.password);
    if(!isPWMatch) return res.status(401).send('Not authorized');
    const token = jwt.sign({id: realUserInfo.id, email: realUserInfo.email});
    res.status(201).json(token);
  }catch(error){
    console.log('Could not log in')
  }
})

router.get('/favorite', verifyToken, async(req,res,next) => {
  try {
    const favGames = await db.query(`SELECT * FROM users WHERE favorite = true`);
    if(!favGames) return res.status(404).send('Couldnt find favorite game');
    res.status(201).json(favGames);
  }catch(error){
    console.log(error);
    res.send('Error getting favorites')
  }
})