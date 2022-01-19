const list_helper = require('../utils/list_helper')


describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(list_helper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{
      _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7
    }]
    expect(list_helper.totalLikes(blogs)).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 },
      { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5 },
      { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12 },
    ]
    expect(list_helper.totalLikes(blogs)).toBe(24)
  })


})