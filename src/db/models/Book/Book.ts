import { sequelize } from "../../database";
import { DataTypes } from "sequelize";

export const Book = sequelize.define(
    "Books",
    {
        bookId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        minLevel: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 6
            }
        },
        minTerm: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 2
            }
        },
        maxLevel: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 6
            }
        },
        maxTerm: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 2
            }
        }  // validate min < max
    },
    {paranoid: true}
)