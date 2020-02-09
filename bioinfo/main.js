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

/* Core */

function clustalAlign() {

    let indel = parseInt(document.getElementById('indel_Clustal').value, 10);
    let match = parseInt(document.getElementById('match_Clustal').value, 10);
    let mismatch = parseInt(document.getElementById('mismatch_Clustal').value, 10);

    /* first iteration */
    let iteration_0 = initIterationTable(series);

    const iteration_0_id = CreateIteration();

    for (let j = 1; j < iteration_0.length; j++) {

        for (let i = j + 1; i < iteration_0[0].length; i++) {

            const score = score_Clustal(series[j - 1].value, series[i - 1].value, match, mismatch, indel);
            console.log(score);

            iteration_0[j][i] = { value: score };
            iteration_0[i][j] = { value: score };

        }
    }


    drawArray(iteration_0, iteration_0_id);


}

function initIterationTable(s) {

    const array = [];

    array.push([{ value: '#', bold: true }]);

    for (let i = 0; i < s.length; i++) {

        array[0].push({ value: 'S' + (i + 1), bold: true });
        array.push([{ value: 'S' + (i + 1), bold: true }])

    }

    return array;

}

function score_Clustal(dna1, dna2, match, mismatch, indel) {

    let cpt = 0;
    for (let i = 0; i < dna1.length; i++) {

        const sim = simClustal(dna1[i], dna2[i], match, mismatch, indel);

        cpt += sim;

    }
    return cpt;
}

function simClustal(x, y, match, mismatch, indel) {

    if (x === '-')
        if (y === '-') return 0;
        else return indel;

    if (y === '-') return indel;

    if (y === x) return match;
    else return mismatch;

}