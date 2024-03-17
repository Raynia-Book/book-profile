import { DataTypes } from "sequelize";
import { sequelize } from "../../../database";
import { Book } from "../Book";

export const RayniaedPhysicalData = sequelize.define(
    "RayniaedPhysicalData",
    {
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Book,
                key: 'bookId'
            }
        },
        easyToReadScore: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        },
        easyToUseScore: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        }
    },
    {paranoid: true}
)