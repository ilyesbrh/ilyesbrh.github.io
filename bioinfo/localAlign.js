/* Local Align */

function LocalAlign() {

    let params = {
        indel: parseInt(document.getElementById('indel_local').value, 10),
        match: parseInt(document.getElementById('match_local').value, 10),
        mismatch: parseInt(document.getElementById('mismatch_local').value, 10),
    };

    let dna1 = '-' + document.getElementById('DNA1_local').value;
    let dna2 = '-' + document.getElementById('DNA2_local').value;

    /* From clustal.js */
    let AlignMatrix = CreateMatrix(dna1.length, dna2.length);

    AlignMatrix = FillAlignLocalMatrix(AlignMatrix, dna1, dna2, params);

    let maxList = findLocalMaximums(AlignMatrix);

    console.log(maxList);

    let alignments = [];

    /* Visualizer.js */
    let visualizationTable = visualizeAlignLocalTable(AlignMatrix, dna2, dna1);

    console.log(visualizationTable);

    maxList.forEach(endPoint => {

        findPrecedentAlignmentLocal(endPoint, AlignMatrix, dna1, dna2, params);

        /* visualizer.js */
        visualizeLocalPath(visualizationTable, endPoint, getRandomColor());

        let startPoint = findStartPoint(endPoint);

        let ObjAlignments = extractLocalAlign(endPoint);

        ObjAlignments = setPrefix(dna1, dna2, startPoint, ObjAlignments);
        ObjAlignments = setSuffix(dna1, dna2, endPoint, ObjAlignments);

        alignments = [...alignments, ...ObjAlignments];

    });

    /* visualizer.js */
    drawLocalArray(visualizationTable, 'L');
}

function findStartPoint(current) {

    if (current.precedent.length > 0) return findStartPoint(current.precedent[0]);
    else return current;

}

function setPrefix(dna1, dna2, endObj, ObjAlignments) {

    let seqI = '';
    let seqJ = '';

    for (let i = 1; i < endObj.i + 1; i++) seqI += dna2[i];
    for (let j = 1; j < endObj.j + 1; j++) seqJ += dna1[j];

    ObjAlignments.forEach(alignment => {
        alignment.seqI = seqI + ' ' + alignment.seqI;
        alignment.seqJ = seqJ + ' ' + alignment.seqJ;
    });

    return ObjAlignments;

}

function setSuffix(dna1, dna2, startObj, ObjAlignments) {

    let seqI = '';
    let seqJ = '';

    for (let i = startObj.i + 1; i < dna2.length; i++) seqI += dna2[i];
    for (let j = startObj.j + 1; j < dna1.length; j++) seqJ += dna1[j];

    ObjAlignments.forEach(alignment => {
        alignment.seqI = alignment.seqI + ' ' + seqI;
        alignment.seqJ = alignment.seqJ + ' ' + seqJ;
    });

    return ObjAlignments;
}

function extractLocalAlign(current) {

    if (current.end) {

        return [{ seqI: '', seqJ: '' }];

    } else {

        let pastAlignments = [];

        current.precedent.forEach(precedent => {

            const pastAlignment = extractLocalAlign(precedent);

            pastAlignment.forEach(alignment => {

                if (precedent.i === current.i /* (right) deletion (letter i become a gap) */ ) {

                    alignment.seqI += '-';
                    alignment.seqJ += current.letterJ;

                } else if (precedent.j === current.j /* (top) insertion (letter j become a gap) */ ) {

                    alignment.seqJ += '-';
                    alignment.seqI += current.letterI;


                } else /* (diagonal) match/mismatch */ {

                    alignment.seqJ += current.letterJ;
                    alignment.seqI += current.letterI;

                }
            });

            pastAlignments = [...pastAlignments, ...pastAlignment];
        });

        return pastAlignments;
    }

}

function findPrecedentAlignmentLocal(current, AlignMatrix, dna1, dna2, params) {

    const i = current.i;
    const j = current.j;

    current['letterJ'] = dna1[j];
    current['letterI'] = dna2[i];
    current['end'] = false;



    /* final case */
    if (AlignMatrix[i][j] === 0) {

        current.end = true;
        return current;
    }

    /* if j = 0 then sure its ll go up */
    if (j === 0) {

        const Obj = { i: i - 1, j: j, precedent: [] };
        current.precedent.push(Obj);

        findPrecedentAlignmentLocal(Obj, AlignMatrix, dna1, dna2, params);

        return current;
    }

    /* if i = 0 then sure its ll go left */
    if (i === 0) {

        const Obj = { i: i, j: j - 1, precedent: [] };

        current.precedent.push(Obj);

        findPrecedentAlignmentLocal(Obj, AlignMatrix, dna1, dna2, params);

        return current;
    }


    let left = AlignMatrix[i][j - 1];
    /* if its equal then it mean that we got current value from left  */
    if ((left + params.indel) === AlignMatrix[i][j]) {

        const Obj = { i: i, j: j - 1, precedent: [] };

        current.precedent.push(Obj);

        findPrecedentAlignmentLocal(Obj, AlignMatrix, dna1, dna2, params);
    }


    /* if its equal then it mean that we got current value from up  */
    let up = AlignMatrix[i - 1][j];
    if ((up + params.indel) === AlignMatrix[i][j]) {

        const Obj = { i: i - 1, j: j, precedent: [] };
        current.precedent.push(Obj);

        findPrecedentAlignmentLocal(Obj, AlignMatrix, dna1, dna2, params);

    }

    /* if its equal then it mean that we got current value from diagonal  */
    let diag = AlignMatrix[i - 1][j - 1];
    if ((diag + simAlignOne2One(dna1[j], dna2[i], params)) === AlignMatrix[i][j]) {

        const Obj = { i: i - 1, j: j - 1, precedent: [] };
        current.precedent.push(Obj);

        findPrecedentAlignmentLocal(Obj, AlignMatrix, dna1, dna2, params);

    }

    return current;

}

function FillAlignLocalMatrix(AlignMatrix, dna1, dna2, params) {

    /* G[0,0] */
    AlignMatrix[0][0] = 0;

    /* G[i,0] */
    for (let i = 1; i < AlignMatrix.length; i++) {

        AlignMatrix[i][0] = Math.max(AlignMatrix[i - 1][0] + params.indel, 0);

    }
    /* G[0,j] */
    for (let j = 1; j < AlignMatrix[0].length; j++) {

        AlignMatrix[0][j] = Math.max(AlignMatrix[0][j - 1] + params.indel, 0);

    }

    /* G[i,j] */
    for (let i = 1; i < AlignMatrix.length; i++) {
        for (let j = 1; j < AlignMatrix[0].length; j++) {

            const up = AlignMatrix[i - 1][j] + params.indel;
            const left = AlignMatrix[i][j - 1] + params.indel;
            /* simAlignOne2One From clustal.js */
            const diag = AlignMatrix[i - 1][j - 1] + simAlignOne2One(dna1[j], dna2[i], params);

            /* maxClustal From clustal.js */
            AlignMatrix[i][j] = Math.max(maxClustal(up, left, diag), 0);
        }
    }

    return AlignMatrix;

}


function findLocalMaximums(AlignMatrix) {

    let max = 0;
    let list = [];

    for (let i = 0; i < AlignMatrix.length; i++) {
        for (let j = 0; j < AlignMatrix[0].length; j++) {

            if (AlignMatrix[i][j] > max) {

                list = [{ i, j, precedent: [] }];
                max = AlignMatrix[i][j];

            } else if (AlignMatrix[i][j] === max) {

                console.log('equal ' + max);

                list.push({ i, j, precedent: [] });
            }
        }
    }

    return list;

}