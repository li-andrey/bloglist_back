const list_helper = require('../utils/list_helper')

describe('4.7*: helper functions and unit tests, step5 (mostLikes)', () => {
  test('when there are no blogs', () => {
    const result = list_helper.mostLikes([]);

    expect(result).toEqual({
      author: 'Nobody',
      likes: 0
    });
  });

  test('when there are two blog with more likes than the third one', () => {
    const result = list_helper.mostLikes([
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
      author: 'Edsger W. Dijkstra',
      likes: 9
    });
  });

  test('when a third blog has more likes', () => {
    const result = list_helper.mostLikes([
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
        likes: 10,
        __v: 0
      }
    ]);

    expect(result).toEqual({
      author: 'Barbara Liskov',
      likes: 10
    });
  });
})