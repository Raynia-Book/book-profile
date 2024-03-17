import { sequelize } from "../../database";
import { DataTypes } from "sequelize";
import { Book } from "./Book";


export const BooksImage = sequelize.define(
    "BooksImages",
    {
        imagePath: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        bookId: {
            type: DataTypes.INTEGER,
            references: {
                model: Book,
                key: 'bookId'
            },
            allowNull: false,
        },
    },
    {paranoid: true}
)