import { sequelize } from "../../database";
import { DataTypes } from "sequelize";
import { Book } from "./Book";
import { BookSubject } from "./BookSubject";

export const BooksBookSubjectsMap = sequelize.define(
    "BooksBookSubjectsMaps",
    {
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Book,
                key: "bookId"
            }
        },
        subjectName: {
            type: DataTypes.ENUM("คณิตศาสตร์", "วิทยศาสตร์", "ฟิสิกส์", "เคมีวิทยา", "ชีวะวิทยา", "ดาราศาสตร์", "ภาษาอังกฤษ", "ภาษาไทย", "ภาษาอื่นๆ", "สังคมศาสตร์", "ประวัติศาสตร์", "ศาสนาศาสตร์", "กฏหมาย"),
            primaryKey: true,
            references: {
                model: BookSubject,
                key: "subjectName"
            }
        }
    },
    {paranoid: true}
)