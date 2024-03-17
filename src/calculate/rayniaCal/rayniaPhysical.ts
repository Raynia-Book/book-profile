import { RayniaI } from "../../interfaces/RayniaInterface";

export function rayniaPhysical(data: RayniaI): {
    easyToReadScore: number;
    easyToUseScore: number;
} | undefined  {
    // physical //
    if (data.surfaceCmW !== undefined &&
        data.surfaceCmH !== undefined &&
        data.weightG !== undefined &&
        data.deepCm !== undefined &&
        data.threadSewing !== undefined &&
        data.glue !== undefined &&
        data.gram !== undefined &&
        data.cover !== undefined &&
        data.flexibleRidge !== undefined &&
        data.fontTyped !== undefined &&
        data.fontSize !== undefined &&
        data.eyeCare !== undefined &&
        data.blackWhite !== undefined &&
        data.oneCharLineSpacing !== undefined) {
            // easyToUse
            const { surfaceCmW, surfaceCmH, deepCm, weightG, gram, cover, glue, threadSewing, flexibleRidge, blackWhite, eyeCare, fontTyped, oneCharLineSpacing, fontSize} = data;
        
            let easyToPackScore: number = (surfaceCmW < 14.3 ? 1 : surfaceCmW === 14.3 ? 0.7 : 0.35)
                + (surfaceCmH < 21 ? 1 : surfaceCmH === 21 ? 0.7 : 0.35)
                + (weightG < 100 ? 1: weightG < 450 ? 0.75: weightG < 600 ? 0.25 : 0)
                + (deepCm < 1.5 ? 1 : deepCm === 1.5 ? 0.6 : deepCm < 4 ? 0.3 : 0)
                + (glue ? 0.25 : 0)
                + (threadSewing ? 0.25 : 0)
                + (gram < 100 ? 0.1 : gram === 100 ? 0.15 : 0.25)
                + (cover < 350 ? 0.1 : cover === 350 ? 0.15 : 0.25);
        
            let easyToOpenScore: number = threadSewing
                ? 5
                : flexibleRidge
                    ? 4
                    : gram > 100
                        ? 2
                        : (surfaceCmW <= 14.3 ? 0.5 : 1.5) + (surfaceCmH <= 21 ? 0.5 : 1.5);
        
            let easyToUseScore: number = easyToPackScore + easyToOpenScore;
        
            // easyToRead
            let easyToReadScore: number = (blackWhite ? 2 : 1) + (eyeCare ? 2 : 1) + (fontTyped ? 2 : 1) + (oneCharLineSpacing ? 2 : 1) + (fontSize >= 16 ? 2 : 1);
            
            return {
                easyToReadScore: easyToReadScore,
                easyToUseScore: easyToUseScore
            };
        }
}
