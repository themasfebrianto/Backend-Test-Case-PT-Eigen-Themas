import Member from '../../src/modules/master/member/models/model.js';
import Book from '../../src/modules/master/book/models/model.js';
import Borrow from '../../src/modules/master/borrow/models/model.js';

// Define the associations between the models
export const defineAssociations = () => {
    Member.hasMany(Borrow);
    Borrow.belongsTo(Member);

    Book.hasMany(Borrow);
    Borrow.belongsTo(Book);
};