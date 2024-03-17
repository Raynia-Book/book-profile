import {sequelize} from "../../database";
import {DataTypes} from "sequelize";

export const BookSubject = sequelize.define(
    "BookSubjects",
    {
        subjectName: {
            type: DataTypes.ENUM("คณิตศาสตร์", "วิทยศาสตร์", "ฟิสิกส์", "เคมีวิทยา", "ชีวะวิทยา", "ดาราศาสตร์", "ภาษาอังกฤษ", "ภาษาไทย", "ภาษาอื่นๆ", "สังคมศาสตร์", "ประวัติศาสตร์", "ศาสนาศาสตร์", "กฏหมาย"),
            unique: true,
            allowNull: true
        }
    },
    {paranoid: true}
)