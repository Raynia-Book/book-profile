import { sequelize } from "../../database";
import { DataTypes } from "sequelize";

export const Author = sequelize.define(
    "Authors",
    {
        authorName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    },
    {paranoid: true}
)