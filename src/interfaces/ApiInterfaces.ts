import { RayniaI } from "./RayniaInterface"

interface AddBookI {
    book: {
        name: string,
        price: number,
        description: string,
        minLevel: number,
        minTerm: number,
        maxLevel: number,
        maxTerm: number,
    },
    authorName: string,
    bookData: RayniaI,
    publisherName: string,
    bookTypes: string[],
    bookTags: string[],
    bookSubjects: string[],
    bookImages: string[]
}

interface PutBook {
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

interface findBooks {
    filter?: {
        subjects?: string[];
        level?: number;
        types?: string[];
        problemQuadrant?: number;
        contentQuadrant?: number;
        author?: string;
        publisher?: string;
    },
    orderBy?: {
        ascPrice?: boolean;
    }
}

export {AddBookI, PutBook, findBooks}