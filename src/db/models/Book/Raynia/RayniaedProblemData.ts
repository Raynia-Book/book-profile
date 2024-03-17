import { DataTypes } from "sequelize";
import { sequelize } from "../../../database";
import { Book } from "../Book";

export const RayniaedProblemData = sequelize.define(
    "RayniaedProblemData",
    {
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Book,
                key: 'bookId'
            }
        },
        manyScore: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 9
            }
        },
        answerScore: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 9
            }
        },
        hardnessScore: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 9
            }
        },
        problemQuadrant: {
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
