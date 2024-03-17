import { sequelize } from "../../database";
import { DataTypes } from "sequelize";
import { Book } from "./Book";
import { Author } from "./Author";

export const BooksAuthorsMap = sequelize.define(
    "BooksAuthorsMaps",
    {
        bookId: {
            type: DataTypes.INTEGER,
            references: {
                model: Book,
                key: "bookId"
            },
            primaryKey: true
        },
        authorName: {
            type: DataTypes.STRING,
            references: {
                model: Author,
                key: 'authorName'
            },
            primaryKey: true
        }
    },
    {paranoid: true}
)