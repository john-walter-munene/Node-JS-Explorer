const { ObjectId } = require('mongodb');
const express = require('express');

const { query, matchedData, validationResult, param, ExpressValidator} = require('express-validator');
const app = express();

app.use(express.json());

app.get('/hello', query('person').notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return res.send(`Hello, ${data.person}!`);
  }

  res.send({ errors: result.array() });
});

app.post( '/create-user',
    [
        body('email').custom(async value => {
            const user = await UserCollection.findUserByEmail(value);
            if (user) throw new Error('E-mail already in use');
        }),
        body('password').isLength({ min: 5 }),
        body('passwordConfirmation').custom((value, { req }) => {
        return value === req.body.password;
        })
    ],
    (req, res) => {
        // Handle the request
    },
);

app.post(
  '/user/:id',
  param('id').customSanitizer(value => ObjectId(value)),
  (req, res) => {
    // req.params.id is an ObjectId now
  },
);

// Custom validator-level message
body('email')
  .isEmail()
  .custom(async value => {
    const existingUser = await Users.findByEmail(value);
    if (existingUser) {
      // Will use the below as the error message
      throw new Error('A user already exists with this e-mail address');
    }
  });

// Field-level message
body('json_string', 'Invalid json_string')
  // No message specified for isJSON, so use the default "Invalid json_string"
  .isJSON()
  .isLength({ max: 100 })
  // Overrides the default message when `isLength` fails
  .withMessage('Max length is 100 bytes');

const { body, validationResult } = new ExpressValidator(
  {
    isPostID: async value => {
      // Verify if the value matches the post ID format
    },
  },
  {
    muteOffensiveWords: value => {
      // Replace offensive words with ***
    },
  },
);

app.post(
  '/forum/:post/comment',
  param('post').isPostID(),
  body('comment').muteOffensiveWords(),
  (req, res) => {
    const result = validationResult(req);
    // Handle new post validation result
  },
);

app.listen(3000);

