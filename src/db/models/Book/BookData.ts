import { sequelize } from "../../database";
import { DataTypes } from "sequelize";
import { Book } from "./Book";

export const BookData = sequelize.define(
    "BooksData",
    {
        dataId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        bookId: {
            type: DataTypes.INTEGER,
            references: {
                model: Book,
                key: 'bookId'
            }
        },
        technic: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        length: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        explain: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        example: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        complete: {
            type: DataTypes.INTEGER
        },
        T: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
                max: 100
            }
        },
        D: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
                max: 100
            }
        },
        P: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
                max: 100
            }
        },
        analyze: DataTypes.BOOLEAN,
        applied: DataTypes.BOOLEAN,
        knowledgeTest: DataTypes.BOOLEAN,
        complexNumber: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        step: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        analyzeHardness: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        technicalTermDifficulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        answer: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 3
            }
        },
        surfaceCmW: {
            type: DataTypes.FLOAT,
        },
        surfaceCmH: {
            type: DataTypes.FLOAT,
        },
        weightG: {
            type: DataTypes.FLOAT,
        },
        deepCm: {
            type: DataTypes.FLOAT,
        },
        threadSewing: {
            type: DataTypes.BOOLEAN,
        },
        glue: {
            type: DataTypes.BOOLEAN,
        },
        gram: {
            type: DataTypes.INTEGER,
        },
        cover: {
            type: DataTypes.INTEGER,
        },
        flexibleRidge: {
            type: DataTypes.BOOLEAN,
        },
        fontTyped: {
            type: DataTypes.BOOLEAN,
        },
        fontSize: {
            type: DataTypes.FLOAT,
        },
        eyeCare: {
            type: DataTypes.BOOLEAN,
        },
        blackWhite: {
            type: DataTypes.BOOLEAN,
        },
        oneCharLineSpacing: {
            type: DataTypes.BOOLEAN,
        },
    },
    {paranoid: true}
)