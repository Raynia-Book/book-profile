import { RayniaI } from "../../interfaces/RayniaInterface";

export function rayniaProblem(data: RayniaI): {
    manyScore: number;
    answerScore: number;
    hardnessScore: number;
    problemQuadrant: number;
} | undefined {
    if (data.answer !== undefined && data.analyze !== undefined && data.applied !== undefined && data.knowledgeTest !== undefined && data.complexNumber !== undefined && data.step !== undefined && data.analyzeHardness !== undefined && data.technicalTermDifficulty !== undefined) {
        const { answer, analyze, applied, knowledgeTest, complexNumber, step, analyzeHardness, technicalTermDifficulty } = data;

        // many
        let manyScore: number = (analyze ? 3 : 0) + (applied ? 3 : 0) + (knowledgeTest ? 3 : 0);

        // hardness
        let hardnessScore: number = (complexNumber / 5) * 1.5
            + (step / 5) * 1.5
            + (analyzeHardness / 5) * 3
            + (technicalTermDifficulty / 5) * 3;

        // answer
        let answerScore: number = answer * 3;

        // quadrant
        let problemQuadrant: number = manyScore > 4.5 ? hardnessScore > 4.5 ? 1: 2 : hardnessScore > 4.5 ? 4: 3

        return {
            manyScore: manyScore,
            answerScore: answerScore,
            hardnessScore: hardnessScore,
            problemQuadrant: problemQuadrant
        };
    }
}
