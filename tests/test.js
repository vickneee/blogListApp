const { test, describe } = require('node:test')
const assert = require('assert')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../index.js')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ]

  test('returns 36', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })

  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('GET /api/blogs', () => {
  test('returns the correct amount of blog posts in JSON format', async () => {
    const response = await supertest(app).get('/api/blogs');

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(Array.isArray(response.body), true);
    // Replace 3 with the expected number of blog posts
    assert.strictEqual(response.body.length, 3);

    // Check that the first blog post has an 'id' property, and does not have an '_id' property
    assert.strictEqual(response.body[0].id !== undefined, true);
    assert.strictEqual(response.body[0]._id, undefined);
  });
});


describe('POST /api/blogs', () => {
  test('creates a new blog post', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Test Author',
      url: 'https://testurl.com',
      likes: 5
    };

    // Get the initial number of blogs
    const initialBlogs = await supertest(app).get('/api/blogs');
    const initialBlogCount = initialBlogs.body.length;

    // Make a POST request to create a new blog
    const response = await supertest(app)
      .post('/api/blogs')
      .send(newBlog);

    assert.strictEqual(response.statusCode, 201);
    assert.deepStrictEqual(response.body, { ...newBlog, id: response.body.id });

    // Get the number of blogs after the POST request
    const finalBlogs = await supertest(app).get('/api/blogs');
    const finalBlogCount = finalBlogs.body.length;

    // Check that the number of blogs has increased by one
    assert.strictEqual(finalBlogCount, initialBlogCount + 1);
  });
});
