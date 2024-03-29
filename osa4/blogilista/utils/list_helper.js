const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => blog.likes)
    const reducer = (sum, item) => {
        return sum + item
    }

    return likes.length === 0
        ? 0
        : likes.reduce(reducer, 0)
}

const mostBlogs = () => {
    
}

module.exports = {dummy, totalLikes, mostBlogs}