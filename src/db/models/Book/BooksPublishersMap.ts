import { sequelize } from "../../database";
import { DataTypes } from "sequelize";
import { Book } from "./Book";
import { Publisher } from "./Publisher";

export const BooksPublishersMap = sequelize.define(
    "BooksPublishersMaps",
    {
        bookId: {
            type: DataTypes.INTEGER,
            references: {
                model: Book,
                key: "bookId"
            },
            primaryKey: true
        },
        publisherName: {
            type: DataTypes.STRING,
            references: {
                model: Publisher,
                key: 'publisherName'
            },
            primaryKey: true
        }
    },
    {paranoid: true}
)