import {sequelize} from "../../database";
import {DataTypes} from "sequelize";

export const BookType = sequelize.define(
    "BookTypes",
    {
        typeName: {
            type: DataTypes.ENUM("เนื้อหา", "โจทย์"),
            unique: true,
            allowNull: true
        }
    },
    {paranoid: true}
)