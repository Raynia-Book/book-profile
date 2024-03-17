import { sequelize } from "../../database";
import { DataTypes } from "sequelize";
import { Book } from "./Book";
import { BookTag } from "./BookTag";

export const BooksBookTagsMap = sequelize.define(
    "BooksBookTagsMaps",
    {
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Book,
                key: "bookId"
            }
        },
        tagName: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: BookTag,
                key: "tagName"
            }
        }
    },
    {paranoid: true}
)