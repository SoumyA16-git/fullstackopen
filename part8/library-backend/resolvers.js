const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return []
        }
        filter.author = author._id
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const counts = await Book.aggregate([
        { $group: { _id: '$author', count: { $sum: 1 } } }
      ])
      const countMap = {}
      for (const c of counts) {
        if (c._id) {
          countMap[c._id.toString()] = c.count
        }
      }
      return authors.map(author => {
        const a = author.toObject()
        a.id = author._id.toString()
        a.bookCount = countMap[author._id.toString()] || 0
        return a
      })
    },
    me: (root, args, context) => {
      return context.currentUser || null
    }
  },
  Author: {
    bookCount: async (root) => {
      if (root.bookCount !== undefined) {
        return root.bookCount
      }
      return Book.countDocuments({ author: root._id || root.id })
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      try {
        return await user.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(
        userForToken,
        process.env.JWT_SECRET || 'test-secret-key'
      )
      return { value: token }
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      const populatedBook = await book.populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
      return populatedBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      try {
        return await author.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }
    },
    _resetDatabase: async () => {
      await Author.deleteMany({})
      await Book.deleteMany({})
      await User.deleteMany({})
      return true
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
