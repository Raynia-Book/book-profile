import { sequelize } from "../../database";
import { DataTypes } from "sequelize";
import { Book } from "./Book";
import { BookType } from "./BookType";

export const BooksBookTypesMap = sequelize.define(
    "BooksBookTypesMaps",
    {
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Book,
                key: 'bookId'
            },
        },
        typeName: {
            type: DataTypes.ENUM("เนื้อหา", "โจทย์", "เนื้อหา-โจทย์"),
            primaryKey: true,
            references: {
                model: BookType,
                key: "typeName"
            }
        }
    },
    {paranoid: true}
)