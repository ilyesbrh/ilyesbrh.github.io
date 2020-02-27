/* Clustal algo */
var series = [
    document.getElementById('DNA0_Clustal'),
    document.getElementById('DNA1_Clustal'),
    document.getElementById('DNA2_Clustal'),
    document.getElementById('DNA3_Clustal')
];

function clustalAlign() {

    params = {
        indel: parseInt(document.getElementById('indel_Clustal').value, 10),
        match: parseInt(document.getElementById('match_Clustal').value, 10),
        mismatch: parseInt(document.getElementById('mismatch_Clustal').value, 10),
        distanceParams: {
            indel: parseInt(document.getElementById('indel_Distance').value, 10),
            mismatch: parseInt(document.getElementById('mismatch_Distance').value, 10),
            match: parseInt(document.getElementById('match_Distance').value, 10)
        }
    };

    /* extract input values */
    const list = getDnaList(series);
    console.log('list of ADN\'s');
    console.log(list);

    /* create and fill distance table */
    let DistanceMatrix = FillDistanceMatrix(list, params);

    let tree = createTree(DistanceMatrix, list);

    console.log('final tree object');
    console.log(tree);

    const alignment = finalN2NAlignment({ s1: tree[0], s2: tree[1] }, params);

    /* aligned sequences */
    console.log('--------------------');
    console.log(alignment);
    console.log('--------------------');


}

function createTree(DistanceMatrix, list) {

    while (list.length > 2) {
        let pos = getMinValue(DistanceMatrix);

        let node = { s1: list[pos.i], s2: list[pos.j] };

        /* to delete always the biggest number first so order in array when deleting wont break */
        if (pos.i < pos.j) {
            const temp = pos.i;
            pos.i = pos.j;
            pos.j = temp;
        }

        list.splice(pos.i, 1);
        list.splice(pos.j, 1);


        list.push(node);

        DistanceMatrix = addElement(DistanceMatrix);

        DistanceMatrix = fillElement(DistanceMatrix, distanceBetween, pos, DistanceMatrix.length - 1);

        DistanceMatrix = deletePairOfElements(DistanceMatrix, pos);
    }

    return list;
}
/* ui */
function addInput() {

    let container = document.getElementById('clustal_series');
    const div = document.createElement('DIV');
    div.classList.add('mt-2');
    const label = document.createElement('LABEL');
    label.innerText = 'S' + container.children.length;
    const input = document.createElement('INPUT');
    input.classList.add('form-control');
    input.id = 'DNA' + container.children.length + '_Clustal';
    input.placeholder = 'GCCCATTCG-AG...';
    input.value = 'ACCGATGA';
    div.appendChild(label);
    div.appendChild(input);
    container.appendChild(div);

    series.push(input);
}

/* Draw score matrix */

function CreateIteration() {
    const container = document.getElementById('iterations');

    const iterationContainer = document.createElement('DIV');
    iterationContainer.id = 'iteration_' + container.children.length + '_container';
    iterationContainer.className = 'col-12 my-4';

    const title = document.createElement('DIV');
    title.className = 'h1 w-100 text-center';
    title.innerText = 'iteration ' + (container.children.length + 1);

    const table = document.createElement('TABLE');
    table.classList.add('table');

    const tbody = document.createElement('TBODY');
    tbody.id = 'iteration_' + container.children.length;

    container.appendChild(iterationContainer);
    iterationContainer.appendChild(title);
    iterationContainer.appendChild(table);
    table.appendChild(tbody);

    return tbody.id;

}

function getDnaList(series) {
    let array = [];
    series.forEach(element => {
        array.push(element.value);
    });
    return array;
}

function FillDistanceMatrix(list, params) {

    let M = CreateMatrix(list.length, list.length);

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {

            if (i === j) {
                M[i][j] === 0;
            }
            if (M[j][i] == {}) {
                M[i][j] = M[j][i];
            } else {
                M[i][j] = alignOne2One(list[i], list[j], params);
            }
        }
    }

    return M;
}

function getMinValue(matrix) {

    let I = 0,
        J = 1;
    let min = matrix[0][1];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {

            if (i === j) continue;
            if (matrix[i][j] < min) {
                min = matrix[i][j];
                I = i;
                J = j;
            }
        }
    }
    return { i: I, j: J };
}

function distanceBetween(matrix, pos, element) {
    return (matrix[pos.i][element] + matrix[pos.j][element] - matrix[pos.i][pos.j]) / 2;
}

function addElement(matrix) {

    matrix.push([]);

    for (let index = 0; index < matrix.length; index++) {
        matrix[matrix.length - 1].push({});
        if (index !== matrix.length - 1) {
            matrix[index].push({});
        }
    }

    return matrix;
}

function fillElement(matrix, valueFunction, pos /* {i,j} */ , target) {

    for (let index = 0; index < matrix.length; index++) {

        if (index === pos.i || index === pos.j) matrix[target][index] = 0;
        if (index === target) matrix[target][index] = 0;

        matrix[target][index] = valueFunction(matrix, pos, index);
    }

    for (let index = 0; index < matrix.length; index++) {
        matrix[index][target] = matrix[target][index];
    }

    matrix[matrix.length - 1][matrix.length - 1] = 0;

    return matrix;
}

function deletePairOfElements(matrix, pos /* {i,j} */ ) {

    matrix.splice(pos.i, 1);
    matrix.splice(pos.j, 1);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i].splice(pos.i, 1);
        matrix[i].splice(pos.j, 1);
    }
    return matrix;
}

function finalN2NAlignment(current, params) {

    let seq1 = [];
    if (typeof current.s1 === 'string' || current.s1 instanceof String) {
        seq1.push(current.s1);
    } else {
        seq1 = finalN2NAlignment(current.s1, params);
    }
    let seq2 = [];
    if (typeof current.s2 === 'string' || current.s2 instanceof String) {
        seq2.push(current.s2);
    } else {
        seq2 = finalN2NAlignment(current.s2, params);
    }

    return alignN2N(seq1, seq2, params);

}

/* Global Alignments 1 To 1 */
function alignOne2One(dna1, dna2, params) {

    dna1 = '-' + dna1;
    dna2 = '-' + dna2;

    let AlignMatrix = CreateMatrix(dna1.length, dna2.length);

    AlignMatrix = FillAlignOne2OneMatrix(AlignMatrix, dna1, dna2, params);

    let startObj = { i: AlignMatrix.length - 1, j: AlignMatrix[0].length - 1, precedent: [] };

    let lastCase = findPrecedentAlignmentOne2One(startObj, AlignMatrix, dna1, dna2, params);

    let pathsList = extractAlignmentsOne2One(lastCase);

    let bestAlignment = ExtractBestPath(pathsList, params.distanceParams);

    return bestAlignment;

}

/* Global Alignments N To N */
function alignN2N(dna1List, dna2List, params) {

    for (let index = 0; index < dna1List.length; index++) dna1List[index] = '-' + dna1List[index];
    for (let index = 0; index < dna2List.length; index++) dna2List[index] = '-' + dna2List[index];

    params['delSequence'] = [];
    params['insSequence'] = [];

    for (let index = 0; index < dna1List.length; index++) params.delSequence.push('-');
    for (let index = 0; index < dna2List.length; index++) params.insSequence.push('-');

    let AlignMatrix = CreateMatrix(dna1List[0].length, dna2List[0].length);

    AlignMatrix = FillAlignN2NMatrix(AlignMatrix, dna1List, dna2List, params);

    let startObj = { i: AlignMatrix.length - 1, j: AlignMatrix[0].length - 1, precedent: [] };

    let lastCase = findPrecedentAlignmentN2N(startObj, AlignMatrix, dna1List, dna2List, params);

    const alignment = extractAlignmentsN2N(lastCase, dna1List.length, dna2List.length)[0];

    return [...alignment.seqI, ...alignment.seqJ];



}


function CreateMatrix(SizeJ, SizeI) {

    let array = [];

    for (let i = 0; i < SizeI; i++) {
        const element = [];
        array.push(element);
        for (let j = 0; j < SizeJ; j++) {
            element.push({});
        }
    }

    return array;

}


function FillAlignOne2OneMatrix(AlignMatrix, dna1, dna2, params) {

    /* G[0,0] */
    AlignMatrix[0][0] = 0;

    /* G[i,0] */
    for (let i = 1; i < AlignMatrix.length; i++) {

        AlignMatrix[i][0] = AlignMatrix[i - 1][0] + params.indel;

    }
    /* G[0,j] */
    for (let j = 1; j < AlignMatrix[0].length; j++) {

        AlignMatrix[0][j] = AlignMatrix[0][j - 1] + params.indel;

    }

    /* G[i,j] */
    for (let i = 1; i < AlignMatrix.length; i++) {
        for (let j = 1; j < AlignMatrix[0].length; j++) {

            const up = AlignMatrix[i - 1][j] + params.indel;
            const left = AlignMatrix[i][j - 1] + params.indel;
            const diag = AlignMatrix[i - 1][j - 1] + simAlignOne2One(dna1[j], dna2[i], params);

            AlignMatrix[i][j] = maxClustal(up, left, diag);
        }
    }

    return AlignMatrix;

}

function FillAlignN2NMatrix(AlignMatrix, dna1List, dna2List, params) {

    /* G[0,0] */
    AlignMatrix[0][0] = 0;

    /* G[i,0] */
    for (let i = 1; i < AlignMatrix.length; i++)
    /* Deletion (Top gap) (dna1 = > gap) */
        AlignMatrix[i][0] = AlignMatrix[i - 1][0] + simAlignN2N(params.delSequence, 0, dna2List, i, params);

    /* G[0,j] */
    for (let j = 1; j < AlignMatrix[0].length; j++)
    /* Insertion (left gap) (dna2 = > gap) */
        AlignMatrix[0][j] = AlignMatrix[0][j - 1] + simAlignN2N(params.insSequence, 0, dna1List, j, params);


    /* G[i,j] */
    for (let i = 1; i < AlignMatrix.length; i++) {
        for (let j = 1; j < AlignMatrix[0].length; j++) {

            const up = AlignMatrix[i - 1][j] + simAlignN2N(params.delSequence, 0, dna2List, i, params);
            const left = AlignMatrix[i][j - 1] + simAlignN2N(params.insSequence, 0, dna1List, j, params);
            const diag = AlignMatrix[i - 1][j - 1] + simAlignN2N(dna1List, j, dna2List, i, params);

            AlignMatrix[i][j] = maxClustal(up, left, diag);
        }
    }

    return AlignMatrix;
}


function findPrecedentAlignmentOne2One(current, AlignMatrix, dna1, dna2, params) {

    const i = current.i;
    const j = current.j;

    current['letterJ'] = dna1[j];
    current['letterI'] = dna2[i];



    /* final case */
    if (i === 0 && j === 0) return current;


    /* if j = 0 then sure its ll go up */
    if (j === 0) {

        const Obj = { i: i - 1, j: j, precedent: [] };
        current.precedent.push(Obj);

        findPrecedentAlignmentOne2One(Obj, AlignMatrix, dna1, dna2, params);

        return current;
    }

    /* if i = 0 then sure its ll go left */
    if (i === 0) {

        const Obj = { i: i, j: j - 1, precedent: [] };

        current.precedent.push(Obj);

        findPrecedentAlignmentOne2One(Obj, AlignMatrix, dna1, dna2, params);

        return current;
    }


    let left = AlignMatrix[i][j - 1];
    /* if its equal then it mean that we got current value from left  */
    if ((left + params.indel) === AlignMatrix[i][j]) {

        const Obj = { i: i, j: j - 1, precedent: [] };

        current.precedent.push(Obj);

        findPrecedentAlignmentOne2One(Obj, AlignMatrix, dna1, dna2, params);
    }


    /* if its equal then it mean that we got current value from up  */
    let up = AlignMatrix[i - 1][j];
    if ((up + params.indel) === AlignMatrix[i][j]) {

        const Obj = { i: i - 1, j: j, precedent: [] };
        current.precedent.push(Obj);

        findPrecedentAlignmentOne2One(Obj, AlignMatrix, dna1, dna2, params);

    }

    /* if its equal then it mean that we got current value from diagonal  */
    let diag = AlignMatrix[i - 1][j - 1];
    if ((diag + simAlignOne2One(dna1[j], dna2[i], params)) === AlignMatrix[i][j]) {

        const Obj = { i: i - 1, j: j - 1, precedent: [] };
        current.precedent.push(Obj);

        findPrecedentAlignmentOne2One(Obj, AlignMatrix, dna1, dna2, params);

    }

    return current;

}

function findPrecedentAlignmentN2N(current, AlignMatrix, dna1List, dna2List, params) {

    const i = current.i;
    const j = current.j;
    current['letterJ'] = [];
    current['letterI'] = [];

    dna1List.forEach(seq => {
        current['letterJ'].push(seq[j]);
    });
    dna2List.forEach(seq => {
        current['letterI'].push(seq[i]);
    });

    /* final case */
    if (i === 0 && j === 0) return current;


    /* if j = 0 then sure its ll go up */
    if (j === 0) {

        const Obj = { i: i - 1, j: j, precedent: [] };
        current.precedent.push(Obj);

        findPrecedentAlignmentN2N(Obj, AlignMatrix, dna1List, dna2List, params);

        return current;
    }

    /* if i = 0 then sure its ll go left */
    if (i === 0) {

        const Obj = { i: i, j: j - 1, precedent: [] };

        current.precedent.push(Obj);

        findPrecedentAlignmentN2N(Obj, AlignMatrix, dna1List, dna2List, params);

        return current;
    }


    let left = AlignMatrix[i][j - 1];
    /* if its equal then it mean that we got current value from left  */
    if ((left + simAlignN2N(params.insSequence, 0, dna1List, j, params)) === AlignMatrix[i][j]) {

        const Obj = { i: i, j: j - 1, precedent: [] };

        current.precedent.push(Obj);

        findPrecedentAlignmentN2N(Obj, AlignMatrix, dna1List, dna2List, params);
    }


    /* if its equal then it mean that we got current value from up  */
    let up = AlignMatrix[i - 1][j];
    if ((up + simAlignN2N(params.delSequence, 0, dna2List, i, params)) === AlignMatrix[i][j]) {

        const Obj = { i: i - 1, j: j, precedent: [] };
        current.precedent.push(Obj);

        findPrecedentAlignmentN2N(Obj, AlignMatrix, dna1List, dna2List, params);

    }

    /* if its equal then it mean that we got current value from diagonal  */
    let diag = AlignMatrix[i - 1][j - 1];
    if ((diag + simAlignN2N(dna1List, j, dna2List, i, params)) === AlignMatrix[i][j]) {

        const Obj = { i: i - 1, j: j - 1, precedent: [] };
        current.precedent.push(Obj);

        findPrecedentAlignmentN2N(Obj, AlignMatrix, dna1List, dna2List, params);

    }

    return current;

}

function extractAlignmentsOne2One(current) {

    if (current.i === 0 && current.j === 0) {

        return [{ seqI: '', seqJ: '' }];

    } else {

        let pastAlignments = [];

        current.precedent.forEach(precedent => {

            const pastAlignment = extractAlignmentsOne2One(precedent);

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

function extractAlignmentsN2N(current, j, i) {

    if (current.i === 0 && current.j === 0) {

        let obj = { seqI: [], seqJ: [] };

        for (let index = 0; index < i; index++) obj.seqI.push('');
        for (let index = 0; index < j; index++) obj.seqJ.push('');

        return [obj];

    } else {

        let pastAlignments = [];

        current.precedent.forEach(precedent => {

            const pastAlignment = extractAlignmentsN2N(precedent, j, i);

            pastAlignment.forEach(alignment => {

                if (precedent.i === current.i /* (right) deletion (letter i become a gap) */ ) {

                    alignment.seqI.forEach((s, index) => alignment.seqI[index] += '-');
                    alignment.seqJ.map((s, index) => alignment.seqJ[index] += current.letterJ[index]);

                } else if (precedent.j === current.j /* (top) insertion (letter j become a gap) */ ) {

                    alignment.seqI.map((s, index) => alignment.seqI[index] += current.letterI[index]);
                    alignment.seqJ.map((s, index) => alignment.seqJ[index] += '-');

                } else /* (diagonal) match/mismatch */ {

                    alignment.seqI.map((s, index) => alignment.seqI[index] += current.letterI[index]);
                    alignment.seqJ.map((s, index) => alignment.seqJ[index] += current.letterJ[index]);

                }
            });

            pastAlignments = [...pastAlignments, ...pastAlignment];
        });

        return pastAlignments;
    }

}


function ExtractBestPath(pathsList, params) {

    let distance = -1;

    pathsList.forEach(alignment => {

        let somme = scoreAlignOne2One(alignment.seqI, alignment.seqJ, params);

        if (somme > distance) {
            distance = somme;
        }

    });
    return distance;

}


function scoreAlignOne2One(dna1, dna2, params) {

    let cpt = 0;
    for (let i = 0; i < dna1.length; i++) {

        const sim = simAlignOne2One(dna1[i], dna2[i], params);

        cpt += sim;

    }

    return cpt;
}


function simAlignOne2One(x, y, params) {


    if (x === '-')
        if (y === '-') return 0;
        else return params.indel;

    if (y === '-') return params.indel;

    if (y === x) return params.match;
    else return params.mismatch;

}
/*
    Example :
    -------

    ListX=[k,l,m] 
    ListY=[a,b,c] 

    simAlignN2N(ListX ,ListY) => { 
        simAlignOne2One(k,a) , simAlignOne2One(k,b) , simAlignOne2One(k,c) 
        simAlignOne2One(l,a) , simAlignOne2One(l,b) , simAlignOne2One(l,c) 
        simAlignOne2One(m,a) , simAlignOne2One(m,b) , simAlignOne2One(m,c) 
    }

*/
function simAlignN2N(ListX, i, ListY, j, params) {

    let cpt = 0;

    for (let x = 0; x < ListX.length; x++) {

        for (let y = 0; y < ListY.length; y++) {

            cpt += simAlignOne2One(ListX[x][i], ListY[y][j], params);
        }
    }

    return cpt;

}

function maxClustal(v1, v2, v3) {
    return Math.max(v1, Math.max(v3, v2));
}