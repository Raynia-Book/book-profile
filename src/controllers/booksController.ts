import { Request, Response } from 'express';
import { Book } from '../db/models/Book/Book';
import { Author } from '../db/models/Book/Author';
import { BooksAuthorsMap } from '../db/models/Book/BooksAuthorsMap';
import { BookTag } from '../db/models/Book/BookTag';
import { BooksBookTagsMap } from '../db/models/Book/BooksBookTagsMap';
import { BookType } from '../db/models/Book/BookType';
import { BooksBookTypesMap } from '../db/models/Book/BooksBookTypesMap';
import { BookData } from '../db/models/Book/BookData';
import { AddBookI, findBooks } from '../interfaces/ApiInterfaces';
import { BooksImage } from '../db/models/Book/BooksImage';
import { Publisher } from '../db/models/Book/Publisher';
import { BooksPublishersMap } from '../db/models/Book/BooksPublishersMap';
import { BookSubject } from '../db/models/Book/BookSubject';
import { BooksBookSubjectsMap } from '../db/models/Book/BooksSubjectsMap';
import { RayniaedContentData } from '../db/models/Book/Raynia/RayniaedContentData';
import { RayniaedPhysicalData } from '../db/models/Book/Raynia/RayniaedPhysicalData';
import { RayniaedProblemData } from '../db/models/Book/Raynia/RayniaedProblemData';
import { RayniaedExplainTypesData } from '../db/models/Book/Raynia/RayniaedExplainTypesData';
import { rayniaPhysical } from '../calculate/rayniaCal/rayniaPhysical';
import { rayniaContent } from '../calculate/rayniaCal/rayniaContent';
import { rayniaProblem } from '../calculate/rayniaCal/rayniaProblem';
import { sequelize } from '../db/database';
import { HasMany, Op, Sequelize, where } from 'sequelize';
import { rayniaContentQuadrant, rayniaDeptScore, rayniaHardness, rayniaManyScore, rayniaProblemQuadrant } from '../calculate/rayniaCal/rayniaSubCal';
/* 
{
    book: {
        name: "bookName",
        price: 123.12,
        description: "asdf;lkjsadflajsf;",
        minLevel: 3,
        minTerm: 1,
        maxLevel: 6,
        maxTerm: 1,
    },
    bookData: {
        technic: 0,
        length: 2,
        explain: 0,
        example: 4,
        complete: 0,
        T: 23,
        D: 5,
        P: 55,
        analyze: true,
        applied: true,
        knowledgeTest: true,
        complexNumber: 5,
        step: 5,
        analyzeHardness: 5,
        technicalTermDifficulty: 5,
        answer: 3, // 3 2 1 0 (3 is explain every choice)
        surfaceCmW: 100,
        surfaceCmH: 20,
        weightG: 800,
        deepCm: 12,
        threadSewing: true,
        glue: true,
        gram: 200,
        cover: 23,
        flexibleRidge: true,
        fontTyped: true,
        fontSize: 12,
        eyeCare: true,
        blackWhite: true,
        oneCharLineSpacing: true,
    },
    authorName: "Chaiya Promso",
    publisherName: "Prayat Sutiprapa",
    bookTypes: ['เนื้อหา', 'โจทย์'] | ['เนื้อหา'] | ['โจทย์'],
    bookTags: ['test', 'random', 'ez'],
    bookSubjects: ['คณิตศาสตร์'],
    bookImages: ['path/path', 'path/path1']
}
*/

const validateInputLevel = (data: any) => {
    if (data.minLevel > data.maxLevel || (data.minLevel === data.maxLevel && data.minTerm > data.maxTerm)) {
        throw new Error("Minimum level cannot be greater than maximum level") 
    }
}

const validateInputTDP = (data: any) => {
    if ((data.D !== undefined && data.P !== undefined && data.T !== undefined) && (data.D + data.P + data.T !== 100)) {
        throw new Error("The sum of D, P, and T must be equal to 100")
    }
}

// /api/v1/books/add
const addBook = async (req: Request, res: Response) => {
    const t = await sequelize.transaction();
    try {
        const body: AddBookI = req.body
        validateInputLevel(body.book)
        validateInputTDP(body.bookData)

        const book = await Book.create(body.book, { transaction: t })

        await Author.findOrCreate({
            where: {
                authorName: body.authorName
            },
            defaults: {
                authorName: body.authorName
            },
            transaction: t
        })
        await BooksAuthorsMap.create({ bookId: book.dataValues.bookId, authorName: body.authorName }, { transaction: t })

        await Publisher.findOrCreate({
            where: {
                publisherName: body.publisherName
            },
            defaults: {
                publisherName: body.publisherName
            },
            transaction: t
        })
        await BooksPublishersMap.create({ bookId: book.dataValues.bookId, publisherName: body.publisherName }, { transaction: t })


        for (const tag of body.bookTags) {
            await BookTag.findOrCreate({
                where: {
                    tagName: tag
                },
                defaults: {
                    tagName: tag
                },
                transaction: t
            })
            await BooksBookTagsMap.create({ bookId: book.dataValues.bookId, tagName: tag }, { transaction: t })
        }

        for (const typeName of body.bookTypes) {
            await BookType.findOrCreate({
                where: {
                    typeName: typeName
                },
                defaults: {
                    typeName: typeName
                },
                transaction: t
            })
            await BooksBookTypesMap.create({ bookId: book.dataValues.bookId, typeName: typeName }, { transaction: t })
        }

        for (const path of body.bookImages) {
            await BooksImage.create({ bookId: book.dataValues.bookId, imagePath: path }, { transaction: t })
        }

        for (const subjectName of body.bookSubjects) {
            await BookSubject.findOrCreate({
                where: {
                    subjectName: subjectName
                },
                defaults: {
                    subjectName: subjectName
                },
                transaction: t
            })
            await BooksBookSubjectsMap.create({ bookId: book.dataValues.bookId, subjectName: subjectName }, { transaction: t })
        }

        let bookData: any = body.bookData
        bookData.bookId = book.dataValues.bookId
        await BookData.create(bookData, {transaction: t})
        const data = body.bookData
        const physical: any = rayniaPhysical(data)
        const content: any = rayniaContent(data)
        const problem: any = rayniaProblem(data)
        if (physical !== undefined) {
            physical.bookId = book.dataValues.bookId
            await RayniaedPhysicalData.create(physical, { transaction: t })
        }
        if (content !== undefined) {
            content.bookId = book.dataValues.bookId
            await RayniaedContentData.create(content, { transaction: t })
        }
        if (problem !== undefined) {
            problem.bookId = book.dataValues.bookId
            await RayniaedProblemData.create(problem, { transaction: t })
        }
        if (data.T !== undefined && data.D !== undefined && data.P !== undefined) {
            await RayniaedExplainTypesData.create({
                bookId: book.dataValues.bookId,
                T: data.T,
                D: data.D,
                P: data.P
            }, { transaction: t })
        }

        await t.commit();

        res.json({ message: "Added book to database" });
    } catch (error: any) {
        await t.rollback();
        res.status(400).json({ error: error.message || "An error occurred while adding the book" });
    }
}



// /api/v1/books?search=bookName

// post
const findBooks = async (req: Request, res: Response) => { // validate price
    try {
        const { search } = req.query;
        const {filter, orderBy}: findBooks = req.body;
        let query: any = {
            where: {},
            order: []
        };

        if (search !== undefined) {
            query.where.name = {
                [Op.substring]: search
            } /*{'$BooksBookTypesMaps.typeName$': { [Op.in]: ['เนื้อหา', 'โจทย์']}, [Op.and]: {'$RayniaedProblemData.problemQuadrant$': 1, '$RayniaedContentData.contentQuadrant$': 2}}*/
        }

        if (filter !== undefined) {
            const { subjects, level, types, problemQuadrant, contentQuadrant, author, publisher } = filter
            // if (subjects !== undefined) {
            //     let arr = []
            //     for (const subjectName of subjects) { 
            //         arr.push(subjectName)
            //     }
            //     query.where["$BooksBookSubjectsMaps.subjectName$"] = {[Op.in]: arr}
            // }
            // if (types !== undefined) {
            //     let arr = []
            //     for (const typeName of types) {
            //         arr.push(typeName)
            //     } 
            //     query.where["$BooksBookTypesMaps.typeName$"] = {[Op.in]: arr}
            // }
            if (author !== undefined) {
                query.where["$BooksAuthorsMaps.authorName$"] = {
                    [Op.substring]: author
                }
            }
            if (publisher !== undefined) {
                query.where["$BooksPublishersMaps.publisherName$"] = {
                    [Op.substring]: publisher
                }
            }
            if (level !== undefined) {
                query.where.maxLevel = {[Op.gte]: level}
                query.where.minLevel ={[Op.lte]: level}
            }
            // if (problemQuadrant !== undefined) {
            //     query.where['$RayniaedProblemData.problemQuadrant$'] = problemQuadrant
            // }
            // if (contentQuadrant !== undefined) {
            //     query.where['$RayniaedContentData.contentQuadrant$'] = contentQuadrant
            // }
        }
            
        if (orderBy) {
            const { ascPrice } = orderBy
            if (ascPrice !== undefined) {
                if (ascPrice === true) {
                    query.order.push(['price', 'ASC'])
                } else {
                    query.order.push(['price', 'DESC'])
                }
            }
        }

        const data = await Book.findAll({
            attributes: [
                'name',
                'price',
                'description',
                'minLevel',
                'minTerm',
                'maxLevel',
                'maxTerm',
            ],
            where: query.where, /*{'$BooksBookTypesMaps.typeName$': { [Op.in]: ['เนื้อหา', 'โจทย์']}, [Op.and]: {'$RayniaedProblemData.problemQuadrant$': 1, '$RayniaedContentData.contentQuadrant$': 2}}*/
            order: query.order,
            include: [
                { model: BooksImage, as: 'bookId', association: new HasMany(Book, BooksImage, {foreignKey: "bookId"})},
                { model: BooksBookTagsMap, as: 'bookId', association: new HasMany(Book, BooksBookTagsMap, {foreignKey: "bookId"})},
                { model: BooksAuthorsMap, as: 'bookId', association: new HasMany(Book, BooksAuthorsMap, {foreignKey: "bookId"}), /*where: query.where.author*/ },
                { model: BooksPublishersMap, as: 'bookId', association: new HasMany(Book, BooksPublishersMap, {foreignKey: "bookId"}),  /*where: query.where.publisher*/ },
                { model: BooksBookTypesMap, as: 'bookId', association: new HasMany(Book, BooksBookTypesMap, {foreignKey: "bookId"}), /*where: { [Op.and]: {[Op.in]: ['โจทย์'], [Op.in]: ['เนื้อหา']}*/ },
                { model: BooksBookSubjectsMap, as: 'bookId', association: new HasMany(Book, BooksBookSubjectsMap, {foreignKey: "bookId"}), /*where: query.where.subject*/ },
                { model: RayniaedContentData, as: 'bookId', association: new HasMany(Book, RayniaedContentData, {foreignKey: "bookId"}), /*where: query.where.content*/ },
                { model: RayniaedProblemData, as: 'bookId', association: new HasMany(Book, RayniaedProblemData, {foreignKey: "bookId"}), /*where: query.where.problem*/ },
                { model: RayniaedPhysicalData, as: 'bookId', association: new HasMany(Book, RayniaedPhysicalData, {foreignKey: "bookId"}) },
                { model: RayniaedExplainTypesData, as: 'bookId', association: new HasMany(Book, RayniaedExplainTypesData, {foreignKey: "bookId"}) }
            ]
        });

        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "An error occurred while fetching books" });
    }
}

// /api/v1/books/book/:id
const getBook = async (req: Request, res: Response) => { // !!!!!!!!!!!! OPTIMIZE THIS
    try {
        const { id } = req.params
        const data = await Book.findAll({
            where: {bookId: id},
            include: [
                { model: BooksImage, as: 'bookId', association: new HasMany(Book, BooksImage, {foreignKey: "bookId"})},
                { model: BooksAuthorsMap, as: 'bookId', association: new HasMany(Book, BooksAuthorsMap, {foreignKey: "bookId"})},
                { model: BooksPublishersMap, as: 'bookId', association: new HasMany(Book, BooksPublishersMap, {foreignKey: "bookId"})},
                { model: BooksBookTagsMap, as: 'bookId', association: new HasMany(Book, BooksBookTagsMap, {foreignKey: "bookId"})},
                { model: BooksBookTypesMap, as: 'bookId', association: new HasMany(Book, BooksBookTypesMap, {foreignKey: "bookId"})},
                { model: BooksBookSubjectsMap, as: 'bookId', association: new HasMany(Book, BooksBookSubjectsMap, {foreignKey: "bookId"})},
                { model: RayniaedContentData, as: 'bookId', association: new HasMany(Book, RayniaedContentData, {foreignKey: "bookId"})},
                { model: RayniaedProblemData, as: 'bookId', association: new HasMany(Book, RayniaedProblemData, {foreignKey: "bookId"})},
                { model: RayniaedPhysicalData, as: 'bookId', association: new HasMany(Book, RayniaedPhysicalData, {foreignKey: "bookId"})},
                { model: RayniaedExplainTypesData, as: 'bookId', association: new HasMany(Book, RayniaedExplainTypesData, {foreignKey: "bookId"})}
            ]
        });
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "An error occurred while fetching book" });
    }
}

/*
{
    technic?: number;
    length?: number;
    explain?: number;
    example?: number;
    T?: number;
    D?: number;
    P?: number;
    analyze?: boolean;
    applied?: boolean;
    knowledgeTest?: boolean;
    complexNumber?: number;
    step?: number;
    analyzeHardness?: number;
    technicalTermDifficulty?: number;
}
*/

// /api/v1/books/put/:id
const putBook = async (req: Request, res: Response) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params
        const body = req.body
        validateInputTDP(body)
        body.bookId = id
        await BookData.create(body, {transaction: t})

        let datas = await BookData.findAll({
            attributes: [
                'length',
                'explain',
                'example',
                'technic',
                'T',
                'D',
                'P',
                'analyze',
                'applied',
                'knowledgeTest',
                'complexNumber',
                'step',
                'analyzeHardness',
                'technicalTermDifficulty',
            ],
            where: {bookId: id},
        })

        /*
        {
            "length": 2,
            "explain": 0,
            "example": 4,
            "technic": 0,
            "T": 23,
            "D": 5,
            "P": 55,
            "analyze": true,
            "applied": true,
            "knowledgeTest": true,
            "complexNumber": 5,
            "step": 5,
            "analyzeHardness": 5,
            "technicalTermDifficulty": 5
        }
        */

        let sumData: {
            length: number;
            explain: number;
            example: number;
            technic: number;
            T: number;
            D: number;
            P: number;
            manyScore: number;
            complexNumber: number;
            step: number;
            analyzeHardness: number;
            technicalTermDifficulty: number;
        } = {
            length: 0,
            explain: 0,
            example: 0,
            technic: 0,
            T: 0,
            D: 0,
            P: 0,
            manyScore: 0,
            complexNumber: 0,
            step: 0,
            analyzeHardness: 0,
            technicalTermDifficulty: 0,
        };

        datas = datas.filter((data) => {
            const { length, explain, example, technic, T, D, P, analyze, applied, knowledgeTest, complexNumber, step, analyzeHardness, technicalTermDifficulty} = data.dataValues
            if (
                (
                    length === null ||
                    explain === null ||
                    example === null ||
                    technic === null ||
                    T === null ||
                    D === null ||
                    P === null
                )
                &&
               (
                    analyze == null ||
                    applied == null ||
                    knowledgeTest == null ||
                    complexNumber === null ||
                    step === null ||
                    analyzeHardness === null ||
                    technicalTermDifficulty === null
                )){ return false}
            else {return true}
        })

        for (let i = 0; i < datas.length; i++) {
            if (i === 0) {
                const {analyze, applied, knowledgeTest, complexNumber, step, analyzeHardness, technicalTermDifficulty, example, explain, technic, T, D, P, length} = datas[i].dataValues 
                if (length !== undefined) {
                    sumData.length = length
                }
                if (explain !== undefined) {
                    sumData.explain = explain
                }
                if (example !== undefined) {
                    sumData.example = example
                }
                if (technic !== undefined) {
                    sumData.technic = technic
                }
                if (T !== undefined) {
                    sumData.T = T
                }
                if (D !== undefined) {
                    sumData.D = D
                }
                if (P !== undefined) {
                    sumData.P = P
                }
                if (analyze != undefined && applied != undefined && knowledgeTest != undefined) {
                    sumData.manyScore = rayniaManyScore({analyze: analyze, applied: applied, knowledgeTest: knowledgeTest})
                }
                if (complexNumber !== undefined) {
                    sumData.complexNumber = complexNumber
                }
                if (step !== undefined) {
                    sumData.step = step
                }
                if (analyzeHardness !== undefined) {
                    sumData.analyzeHardness = analyzeHardness
                }
                if (technicalTermDifficulty !== undefined) {
                    sumData.technicalTermDifficulty = technicalTermDifficulty
                }
            } else {
                const {analyze, applied, knowledgeTest, complexNumber, step, analyzeHardness, technicalTermDifficulty, example, explain, technic, T, D, P, length} = datas[i].dataValues 
                if (length !== undefined) {
                    sumData.length += length
                }
                if (explain !== undefined) {
                    sumData.explain += explain
                }
                if (example !== undefined) {
                    sumData.example += example
                }
                if (technic !== undefined) {
                    sumData.technic += technic
                }
                if (T !== undefined) {
                    sumData.T += T
                }
                if (D !== undefined) {
                    sumData.D += D
                }
                if (P !== undefined) {
                    sumData.P += P
                }
                if (analyze != undefined && applied != undefined && knowledgeTest != undefined) {
                    sumData.manyScore += rayniaManyScore({analyze: analyze, applied: applied, knowledgeTest: knowledgeTest})
                }
                if (complexNumber !== undefined) {
                    sumData.complexNumber += complexNumber
                }
                if (step !== undefined) {
                    sumData.step += step
                }
                if (analyzeHardness !== undefined) {
                    sumData.analyzeHardness += analyzeHardness
                }
                if (technicalTermDifficulty !== undefined) {
                    sumData.technicalTermDifficulty += technicalTermDifficulty
                }
            }
        }

        let key: keyof typeof sumData
        for (key in sumData) {
            sumData[key] = sumData[key] / datas.length
        }
        const {P, D, T, manyScore, complexNumber, step, analyzeHardness, technicalTermDifficulty, length, example, explain, technic} = sumData


        let completeScore: undefined | number = undefined;
        const completeScores = await RayniaedContentData.findAll({
            where: { bookId: id },
            attributes: ['completeScore'],
        });

        if (completeScores.length > 0) {
            completeScore = completeScores[0].get('completeScore') as number;
        }
        if (completeScore !== undefined) {
            let deptScore: number = rayniaDeptScore({length: length, example: example, explain: explain, technic: technic})
            let contentQuadrant: number = rayniaContentQuadrant({deptScore: deptScore, completeScore: completeScore})
            await RayniaedContentData.update({deptScore: deptScore, contentQuadrant: contentQuadrant}, {where: {bookId: id}, transaction: t})
            await RayniaedExplainTypesData.update({
                T: T,
                D: D,
                P: P
            }, {where: {bookId: id}, transaction: t})
        }


        if (datas[0].dataValues.complexNumber !== null) {
            let hardnessScore: number = rayniaHardness({complexNumber: complexNumber, step: step, analyzeHardness: analyzeHardness, technicalTermDifficulty: technicalTermDifficulty})
            let problemQuadrant: number = rayniaProblemQuadrant({manyScore: manyScore, hardnessScore: hardnessScore})
            await RayniaedProblemData.update({manyScore: manyScore, hardnessScore: hardnessScore, problemQuadrant: problemQuadrant}, {where: {bookId: id}, transaction: t})
        } // query bookTypes

        await t.commit();

        res.json({ message: "Updated book in database" });

    } catch (error: any) {
        await t. rollback();
        res.status(400).json({ error: error.message || "An error occurred while updating the book" });
    }
}

// /api/v1/books/delete/:id
const deleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        await book.destroy();

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the book" });
    }
}

export { addBook, getBook, findBooks, putBook, deleteBook }

// put book for normal users need to have logged in