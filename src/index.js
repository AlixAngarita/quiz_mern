//import 'dotenv/config';
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const { models } = require('./models');
const { connectDb } = require('./models');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch'),
  };
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

const eraseDatabaseOnSync = true;

const PORT = 5000;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({}),
    ]);

    createUsersWithMessages();
  }

  app.listen(PORT, () =>
    console.log(`App Escuchando en ${PORT}!`),
  );
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: 'usuario',
  });

  const user2 = new models.User({
    username: 'pepito',
  });

  const message1 = new models.Message({
    text: 'Mensaje1',
    user: user1.id,
  });

  const message2 = new models.Message({
    text: 'Mensaje2',
    user: user2.id,
  });

  const message3 = new models.Message({
    text: 'Mensaje3',
    user: user2.id,
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};
