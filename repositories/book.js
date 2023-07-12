const Repository = require('./repository')
class BookRepository extends Repository{

}

module.exports = new BookRepository('book.json')