const totalLikes = require('../utils/list_helper').totalLikes
const dummy = require('../utils/list_helper').dummy
const blogs = require('../sampleBlogs').blogs

test('dummy allways returns 1', () => {
    const result = dummy([])

    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]
    
    test('of empty list is zero', () => {
        const result = totalLikes([])

        expect(result).toBe(0)
    })

    test('of list with one blog to equal the likes of that blog', () => {
        const result = totalLikes(listWithOneBlog)

        expect(result).toBe(5)
    })

    test('of list with many blogs to be calculated correctly', () => {
        const result = totalLikes(blogs)

        expect(result).toBe(36)
    })
})