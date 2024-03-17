function rayniaProblemQuadrant(data: {manyScore: number; hardnessScore: number}): number {
    const { manyScore, hardnessScore } = data
    return manyScore > 4.5 ? hardnessScore > 4.5 ? 1: 2 : hardnessScore > 4.5 ? 4: 3
}

function rayniaHardness(data: {
    complexNumber: number;
    step: number;
    analyzeHardness: number;
    technicalTermDifficulty: number;
}): number {
    const { complexNumber, step, analyzeHardness, technicalTermDifficulty } = data
    return (complexNumber / 5) * 1.5
        + (step / 5) * 1.5
        + (analyzeHardness / 5) * 3
        + (technicalTermDifficulty / 5) * 3;
}

function rayniaContentQuadrant (data: {
    deptScore: number;
    completeScore: number;
}): number {
    const { deptScore, completeScore } = data
    return deptScore > 5 ? completeScore > 5 ? 1: 2 : completeScore > 5 ? 4: 3
}

function rayniaDeptScore (data: {
    length: number;
    example: number;
    explain: number;
    technic: number;
}): number {
    const { length, example, explain, technic} = data
    return ((length / 5) * 1) + ((explain / 5) * 3) + ((example / 5) * 4) + ((technic / 5) * 2);
}

function rayniaManyScore (data: {
    analyze: number;
    applied: number;
    knowledgeTest: number;
}): number {
    const {analyze, applied, knowledgeTest} = data
    return ((analyze ? 3 : 0) + (applied ? 3 : 0) + (knowledgeTest ? 3 : 0))
}

export { rayniaProblemQuadrant, rayniaHardness, rayniaContentQuadrant, rayniaDeptScore, rayniaManyScore }