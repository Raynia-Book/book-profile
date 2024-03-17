import { DataTypes } from "sequelize";
import { sequelize } from "../../../database";
import { Book } from "../Book";

export const RayniaedContentData = sequelize.define(
    "RayniaedContentData",
    {
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Book,
                key: 'bookId'
            }
        },
        completeScore: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        },
        deptScore: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        },
        contentQuadrant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 4
            }
        }
    },
    {paranoid: true}
)
