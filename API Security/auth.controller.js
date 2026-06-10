const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

exports.signup = async (req, res) => {
  try {
    const { first, email, password, image } = req.body;

    // check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email }});

    if (existingUser) {
      return res.status(400).json({
        error: 'Email already exists'
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const user = await prisma.user.create({
      data: {
        first,
        email,
        password: hashedPassword,
        image
      }
    });

    res.status(201).json({
      message: 'User created successfully',
      user
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await prisma.user.findUnique({ where: { email }});

    if (!user) {
      return res.status(400).json({
        error: 'Invalid credentials'
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: 'Invalid credentials'
      });
    }

    // generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        first: user.first,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};