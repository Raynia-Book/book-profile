import { sequelize } from "../../database";
import { DataTypes } from "sequelize";

export const Publisher = sequelize.define(
    "Publishers",
    {
        publisherName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    },
    {paranoid: true}
)