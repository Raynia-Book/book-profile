import { RayniaI } from "../../interfaces/RayniaInterface";

// complete explainTypes

export function rayniaContent(data: RayniaI): {
    completeScore: number;
    deptScore: number;
    contentQuadrant: number;
} | undefined {
    if (data.length !== undefined && data.complete !== undefined && data.explain !== undefined && data.example !== undefined && data.technic !== undefined) {
        // dept
        let deptScore: number = ((data.length / 5) * 1) + ((data.explain / 5) * 3) + ((data.example / 5) * 4) + ((data.technic / 5) * 2);

        // complete
        let completeScore: number = data.complete;

        // quadrant
        let contentQuadrant: number = deptScore > 5 ? completeScore > 5 ? 1: 2 : completeScore > 5 ? 4: 3

        return {
            completeScore: completeScore,
            deptScore: deptScore,
            contentQuadrant: contentQuadrant,
        };
    }
}
