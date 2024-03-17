import { sequelize } from "../../database";
import { DataTypes } from "sequelize";

export const BookTag = sequelize.define(
    "BookTags",
    {
        tagName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    },
    {paranoid: true}
)