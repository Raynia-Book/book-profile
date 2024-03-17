import { DataTypes } from "sequelize";
import { sequelize } from "../../../database";
import { Book } from "../Book";

export const RayniaedExplainTypesData = sequelize.define(
    "RayniaedExplainTypesData",
    {
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Book,
                key: 'bookId'
            }
        },
        T: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },
        D: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },
        P: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },
    },
    {paranoid: true}
)