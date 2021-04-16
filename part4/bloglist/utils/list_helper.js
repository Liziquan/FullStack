const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
    return total
}

const favoriteBlog= (blogs) =>{
    if(blogs.length==0){
      return null
    }

    const favorite = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current)

    const favoriteBlog ={
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
    return favoriteBlog
}

module.exports = {
   dummy, totalLikes ,favoriteBlog
}