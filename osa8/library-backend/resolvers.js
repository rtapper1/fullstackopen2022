const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filters = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author }).exec()
        filters.author = author.id
      }
      if (args.genre) {
        filters.genres = args.genre
      }
      return Book.find(filters).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => Book.distinct('genres'),
  },

  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root.id }),
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      let author = await Author.findOne({ name: args.author }).exec()
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
        })
        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Creating new book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }
      const newBook = new Book({ ...args, author: author.id })
      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('Creating new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook.populate('author') })

      return newBook.populate('author')
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const editedAuthor = await Author.findOne({ name: args.name }).exec()
      if (!editedAuthor) {
        return undefined
      }
      editedAuthor.born = args.setBornTo
      try {
        await editedAuthor.save()
      } catch (error) {
        throw new GraphQLError('Editing an author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error,
          },
        })
      }
      return editedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return user.save().catch((err) => {
        throw new GraphQLError('Creating new user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            err,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username,
      })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
