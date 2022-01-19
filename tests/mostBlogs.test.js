const list_helper = require('../utils/list_helper')


describe('4.6*: helper functions and unit tests, step4 (mostBlogs)', () => {
  test('when there is none', () => {
    const result = list_helper.mostBlogs([]);

    expect(result).toEqual({
      name: 'Nobody',
      blogs: 0
    });
  });

  test('when there are two authors and three blogs', () => {
    const result = list_helper.mostBlogs([
      {
        _id: '1',
        title: 'Title 1',
        author: 'Edsger W. Dijkstra',
        url: 'http://title1.fi',
        likes: 5,
        __v: 0
      },
      {
        _id: '2',
        title: 'Title 2',
        author: 'Edsger W. Dijkstra',
        url: 'http://title2.fi',
        likes: 4,
        __v: 0
      },
      {
        _id: '3',
        title: 'Title 3',
        author: 'Barbara Liskov',
        url: 'http://title3.fi',
        likes: 4,
        __v: 0
      }
    ]);

    expect(result).toEqual({
      name: 'Edsger W. Dijkstra',
      blogs: 2
    });
  });
});