const express = require('express');
const cors = require('cors');

const app = express();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

app.use(cors());
app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    res.send({ count: (await prisma.counter.findFirst()).count });
  } catch (error) {
    next(error);
  }
});

app.patch('/', async (req, res, next) => {
  const { type } = req.body;

  try {
    let currentCount = (await prisma.counter.findFirst())?.count;

    if (currentCount == null) {
      await prisma.counter.create({
        data: {
          count: 0
        },
      });
    }

    currentCount = (await prisma.counter.findFirst())?.count;

    const counter = await prisma.counter.update({
      where: {
        id: 1,
      },
      data: {
        count: type === 'increment' ? currentCount + 1 : currentCount - 1,
      },
    });

    res.send({ count: counter.count });
  } catch (error) {
    next(error);
  }
});

app.listen(3000);
