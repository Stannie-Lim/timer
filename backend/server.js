const express = require('express');
const cors = require('cors');

const app = express();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

app.use(cors());
app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    res.send({ count: (await prisma.counter.findFirst())?.count || 0 });
  } catch (error) {
    next(error);
  }
});

app.get('/counter_history', async (req, res, next) => {
  try {
    const counter = await prisma.counter.findFirst();

    if (counter) {
      res.send(
        await prisma.changelog.findMany({
          where: {
            counterId: counter.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
      );
    } else {
      res.send([]);
    }
  } catch (error) {
    next(error);
  }
});

app.patch('/', async (req, res, next) => {
  const { type, reason } = req.body;

  try {
    const currentCount = (await prisma.counter.findFirst())?.count;

    let newCounter = await prisma.counter.findFirst();
    if (currentCount == null) {
      newCounter = await prisma.counter.create({
        data: {
          count: 0
        },
      });
    }

    const counter = await prisma.counter.update({
      where: {
        id: newCounter.id,
      },
      data: {
        count: type === 'increment' ? currentCount + 1 : currentCount - 1,
      },
    });

    await prisma.changelog.create({
      data: {
        reason,
        count: counter.count,
        counterId: counter.id,
      },
    });

    res.send({ count: counter.count });
  } catch (error) {
    next(error);
  }
});

app.listen(3000);
