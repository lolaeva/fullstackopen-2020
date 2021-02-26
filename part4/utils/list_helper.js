const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.length === 1 ? blogs[0].likes 
    : blogs.reduce( (sum, {likes}) => sum + likes, 0)
  // without destructuring: blogs.reduce( (sum, cur) => sum + cur.likes, 0)
}
const mostBlog = (blog) => {
  const res = new Object()
  // res.author = ''
  for(let b of blog) {
    let a = b.author
    res[a] ? res[a] = (res[a] + 1) : res[a] = 1
  }
  let max = 0
  let author = ''
  for(let authors of Object.entries(res)) {
    if(authors[1] >= max) {
      max = authors[1]
      author = authors[0]
    }
  }
  return {'author': author, 'blogs': max}
}

const mostLikes = (blog) => {
  let maxLike = 0
  let author = ''

  for(let b of blog) {
    if(b.likes > maxLike) {
      maxLike = b.likes
      author = b.author
    }
  }
  // console.log(author, maxLike)
  return {'author': author, 'likes': maxLike}
}

module.exports = {
  dummy,
  totalLikes,
  mostBlog,
  mostLikes,
}