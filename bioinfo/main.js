function initTable(dna1, dna2) {

    array = [];

    let cell0 = { // for the cell in 0,0
        value: '#',
        bold: true
    }
    array.push([cell0]);

    for (let j = 0; j < dna2.length; j++) {

        let cell = {
            value: dna2[j],
            element: '',
            bold: true
        }

        array.push([cell]);

    }

    for (let i = 0; i < dna1.length; i++) {

        let cell = {
            value: dna1[i],
            bold: true
        }

        array[0].push(cell);

    }

    return array;
}

function drawArray(array, id) {
    let table = document.getElementById(id);
    table.innerHTML = '';
    for (let iJdid = 0; iJdid < array.length; iJdid++) {

        let row = document.createElement('tr');

        for (let JJdid = 0; JJdid < array[0].length; JJdid++) {

            let cell = document.createElement('td');

            try {
                cell.className += array[iJdid][JJdid].bold ? 'font-weight-bold' : '';
                cell.innerText = array[iJdid][JJdid].value;
                if (array[iJdid][JJdid].path && (id === 'M' || id === 'N_Global')) {
                    console.log('color setting');

                    cell.classList.add('path');
                }
            } catch (error) {
                cell.innerText = 'X';
                cell.style.color = 'red';
            }
            row.appendChild(cell);
        }

        table.appendChild(row);

    }
}

function gapAffine() {

    let g0 = parseInt(document.getElementById('g0').value, 10);
    let ge = parseInt(document.getElementById('ge').value, 10);

    let dna1 = '-' + document.getElementById('DNA1').value;
    let dna2 = '-' + document.getElementById('DNA2').value;

    let mismatch = parseInt(document.getElementById('mismatch').value, 10);
    let match = parseInt(document.getElementById('match').value, 10);

    //Tables
    let M = initTable(dna1, dna2);
    let H = initTable(dna1, dna2);
    let V = initTable(dna1, dna2);
    let D = initTable(dna1, dna2);

    V[1][1] = D[1][1] = H[1][1] = M[1][1] = { value: 0 }

    for (let i = 2; i < M[0].length; i++) {

        let value = g0 + (i - 2) * ge;

        console.log(value);


        const cell = { value }

        H[1].push(cell);
        D[1].push(cell);
        M[1].push(cell);
        V[1].push({ value: 'X' });

    }

    for (let j = 2; j < M.length; j++) {

        let value = g0 + (j - 2) * ge;

        console.log(value);


        const cell = { value }

        V[j].push(cell);
        D[j].push(cell);
        M[j].push(cell);
        H[j].push({ value: 'X' });

    }

    // M[1,1]

    const Dvalue = D[1][1].value + sim(dna2[1], dna1[1], match, mismatch);
    D[2].push({ value: Dvalue });

    const Vvalue = V[2][1].value + g0;
    V[2].push({ value: Vvalue });

    const Hvalue = H[1][2].value + g0;
    H[2].push({ value: Hvalue });


    const value = max(Dvalue, Vvalue, Hvalue);

    console.log(value);

    M[2].push({ value });


    // M[i,1]

    for (let i = 3; i < M[0].length; i++) {

        const Dvi = D[1][i - 1].value + sim(dna2[1], dna1[i - 1], match, mismatch)
        D[2].push({ value: Dvi });

        const Hvi = H[1][i].value + g0;
        H[2].push({ value: Hvi });

        const Vvi = max(V[2][i - 1].value + ge, D[2][i - 1].value + g0, H[2][i - 1].value + g0)
        V[2].push({ value: Vvi });

        const Mvi = max(Dvi, Hvi, Vvi);
        M[2].push({ value: Mvi });


    }

    // M[1,j]

    for (let j = 3; j < M.length; j++) {

        const Dvi = D[j - 1][1].value + sim(dna2[j - 1], dna1[1], match, mismatch)
        D[j].push({ value: Dvi });

        const Vvi = V[j][1].value + g0;
        V[j].push({ value: Vvi });

        const Hvi = max(V[j - 1][2].value + g0, D[j - 1][2].value + g0, H[j - 1][2].value + ge)
        H[j].push({ value: Hvi });

        const Mvi = max(Dvi, Hvi, Vvi);
        M[j].push({ value: Mvi });

    }

    // M[i,j]

    for (let j = 3; j < M.length; j++) {

        for (let i = 3; i < M[0].length; i++) {

            const Dvi = M[j - 1][i - 1].value + sim(dna2[j - 1], dna1[i - 1], match, mismatch)
            D[j].push({ value: Dvi });

            const Hvi = max(V[j - 1][i].value + g0, D[j - 1][i].value + g0, H[j - 1][i].value + ge)
            H[j].push({ value: Hvi });

            const Vvi = max(V[j][i - 1].value + ge, D[j][i - 1].value + g0, H[j][i - 1].value + g0)
            V[j].push({ value: Vvi });

            const Mvi = max(Dvi, Hvi, Vvi);
            M[j].push({ value: Mvi });

        }

    }

    // find best path
    console.log(findPrecedent(M, M[0].length - 1, M.length - 1, match, mismatch));

    drawArray(M, 'M');
    drawArray(D, 'D');
    drawArray(H, 'H');
    drawArray(V, 'V');

    const elements = document.body.getElementsByClassName('gap');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('d-none');
    }
}


function findPrecedent(array, i, j, match, mismatch) {


    let g0 = parseInt(document.getElementById('g0').value, 10);
    let ge = parseInt(document.getElementById('ge').value, 10);

    let dna1 = '-' + document.getElementById('DNA1').value;
    let dna2 = '-' + document.getElementById('DNA2').value;


    array[j][i]["path"] = true;

    const up = array[j - 1][i];
    const diag = array[j - 1][i - 1];
    const left = array[j][i - 1];

    /* final case */
    if (i === 1 && j === 1) return 0;

    /* diagonal check */
    if ((diag.value + sim(dna1[i - 1], dna2[j - 1], match, mismatch)) === array[j][i].value) {

        array[j][i].value + ' ' + findPrecedent(array, i - 1, j - 1, match, mismatch);

    } else if ((left.value + g0) === array[j][i].value) {

        array[j][i].value + ' ' + findPrecedent(array, i - 1, j, match, mismatch);

    } else if ((up.value + g0) === array[j][i].value) {

        array[j][i].value + ' ' + findPrecedent(array, i, j - 1, match, mismatch);

    } else if ((left.value + ge) === array[j][i].value) {

        array[j][i].value + ' ' + findPrecedent(array, i - 1, j, match, mismatch);

    } else if ((up.value + ge) === array[j][i].value) {

        array[j][i].value + ' ' + findPrecedent(array, i, j - 1, match, mismatch);

    } else {
        console.log('Error :\')');
    }
}

function sim(x, y, match, mismatch) {

    if (x === y) {
        return match;
    } else {
        return mismatch;
    }
}

function max(v1, v2, v3) {
    return Math.max(v1, Math.max(v3, v2));
}

/* Needleman-Wunsch */
function globalAlign() {

    let indel = parseInt(document.getElementById('indel_Global').value, 10);
    let match = parseInt(document.getElementById('match_Global').value, 10);
    let mismatch = parseInt(document.getElementById('mismatch_Global').value, 10);

    let dna1 = '-' + document.getElementById('DNA1_Global').value;
    let dna2 = '-' + document.getElementById('DNA2_Global').value;

    //Tables
    let G = initTable(dna1, dna2);

    /* G[0,0] */
    G[1][1] = { value: 0 };
    /* G[i,0] */
    for (let i = 2; i < G[0].length; i++) {

        G[1][i] = { value: G[1][i - 1].value + indel };

    }
    /* G[0,j] */
    for (let j = 2; j < G.length; j++) {

        G[j][1] = { value: G[j - 1][1].value + indel };

    }

    /* complete algo */
    for (let j = 2; j < G.length; j++) {
        for (let i = 2; i < G[0].length; i++) {

            const value = findValue(G, i, j, /* not important => */ indel, match, mismatch, dna1, dna2);
            G[j][i] = { value };

        }

    }

    /* find best alignment */

    findPrecedentGlobal(G, G[0].length - 1, G.length - 1, match, mismatch, indel);

    drawArray(G, 'N_Global');

    document.body.getElementsByClassName('N_Global')[0].classList.remove('d-none');
}

function findValue(array, i, j, indel, match, mismatch, dna1, dna2) {

    const up = array[j - 1][i].value + indel;
    const left = array[j][i - 1].value + indel;
    const diag = array[j - 1][i - 1].value + sim(dna1[i - 1], dna2[j - 1], match, mismatch);
    return max(up, left, diag);

}

function findPrecedentGlobal(array, i, j, match, mismatch, indel) {

    console.log('find path');

    let dna1 = '-' + document.getElementById('DNA1_Global').value;
    let dna2 = '-' + document.getElementById('DNA2_Global').value;

    array[j][i]["path"] = true;

    const up = array[j - 1][i];
    const diag = array[j - 1][i - 1];
    const left = array[j][i - 1];

    /* final case */
    if (i === 1 && j === 1) return 0;

    if ((diag.value + sim(dna1[i - 1], dna2[j - 1], match, mismatch)) === array[j][i].value) {

        array[j][i].value + ' ' + findPrecedentGlobal(array, i - 1, j - 1, match, mismatch, indel);

    }
    if ((left.value + indel) === array[j][i].value) {

        array[j][i].value + ' ' + findPrecedentGlobal(array, i - 1, j, match, mismatch, indel);

    }
    if ((up.value + indel) === array[j][i].value) {

        array[j][i].value + ' ' + findPrecedentGlobal(array, i, j - 1, match, mismatch, indel);

    }

}

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

    /* create distance table */
    let DistanceMatrix = FillDistanceMatrix(list, params);
    console.log('Distance matrix');
    console.log(DistanceMatrix);

    /* fill matrix */
    //DistanceMatrix = createTreeMatrix(DistanceMatrix, list, params);



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

function DrawMatrix(array, id) {


}

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

function createTreeMatrix(DistanceMatrix, list, params) {

    for (let i = 0; i < DistanceMatrix.length; i++) {
        for (let j = 0; j < DistanceMatrix[0].length; j++) {

            const alignment = alignOne2One(list[i], list[j], params);
            const score = scoreAlignOne2One(alignment[0], alignment[1], params);
            DistanceMatrix[i][j] = score;
        }
    }

    return DistanceMatrix;
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

    console.log('DNA READY TO align');
    console.log(dna1List);
    console.log(dna2List);

    let AlignMatrix = CreateMatrix(dna1List[0].length, dna2List[0].length);

    AlignMatrix = FillAlignN2NMatrix(AlignMatrix, dna1List, dna2List, params);

    console.log('Matrix Filled');
    console.log(AlignMatrix);

    let startObj = { i: AlignMatrix.length - 1, j: AlignMatrix[0].length - 1, precedent: [] };

    let lastCase = findPrecedentAlignmentN2N(startObj, AlignMatrix, dna1List, dna2List, params);

    console.log('path');
    console.log(lastCase);

    let pathsList = extractAlignmentsN2N(lastCase, dna1List.length, dna2List.length);

    /* aligned sequences */
    pathsList.forEach(alignment => {
        alignment.seqI.forEach(seq => {
            console.log(seq);
        });
        alignment.seqJ.forEach(seq => {
            console.log(seq);
        });
        console.log('--------------------');

    });

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

            AlignMatrix[i][j] = max(up, left, diag);
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

            AlignMatrix[i][j] = max(up, left, diag);
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

    console.log(cpt);

    return cpt;

}