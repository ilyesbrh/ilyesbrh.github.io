/**
 * Sequence Alignments Visualization
 * @license GPLv2
 * @version 0.1
 * @author Bourouh Ilies <ilies.bourouh@farmy.ai>
 * Copyright (C) 2020  University Mohamed El Bachir El Ibrahimi of Bordj Bou Arréridj.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.

 */

/* Clustal align */
var simple_chart_config = {

    chart: {
        container: '#visualizer-chart-container',
        connectors: {
            type: 'step'
        }
    },

    nodeStructure: {

    }
};

function showTree(tree, list, params) {

    createStructure(simple_chart_config.nodeStructure, tree, list, params);

    console.log(simple_chart_config.nodeStructure);

    new Treant(simple_chart_config);
}

/* modified version of N2N align so it can visualize result */
function createStructure(target, current, list, params) {

    let seq1 = [];

    target['children'] = [];

    if (typeof current['s1'] === 'string' || current['s1'] instanceof String) {

        target.children.push(createSimpleNode(current.s1, list));

        seq1.push(current.s1);
    } else {

        let node = {};
        target.children.push(node);

        seq1 = createStructure(node, current.s1, list, params);
    }


    let seq2 = [];

    if (typeof current['s2'] === 'string' || current['s2'] instanceof String) {

        target.children.push(createSimpleNode(current.s2, list));

        seq2.push(current.s2);

    } else {

        let node = {};
        target.children.push(node);

        seq2 = createStructure(node, current.s2, list, params);
    }

    let finalAlign = alignN2N(seq1, seq2, params);

    const container = document.createElement('DIV');
    container.classList.add('d-flex');
    container.classList.add('flex-column');
    container.classList.add('align-items-center');
    container.classList.add('justify-content-center');
    container.classList.add('p-1');
    container.style.letterSpacing = '0.5em';
    container.style.width = 'auto';


    finalAlign.forEach(align => {

        const el = document.createElement('div');
        el.classList.add('pb-2');
        el.classList.add('px-0');
        el.classList.add('m-0');
        el.classList.add('text-center');
        console.log((align.length * 20) + 'px');

        el.style.width = (align.length * 18) + 'px';
        el.style.height = '30px';
        el.innerText = align;
        container.appendChild(el);

    });

    target['innerHTML'] = container.outerHTML;

    return finalAlign;

}

function createSimpleNode(seq, list) {

    return {
        text: {
            name: 'S' + list.indexOf(seq),
            desc: list[list.indexOf(seq)]
        }
    }
}

/* Local Align */

function visualizeAlignLocalTable(AlignMatrix, dna2, dna1) {


    AlignMatrix = [
        ['#', ...dna1.split('')], ...AlignMatrix
    ];

    for (let i = 1; i < AlignMatrix.length; i++) {
        AlignMatrix[i] = [dna2[i - 1], ...AlignMatrix[i]];
    }

    for (let i = 0; i < AlignMatrix.length; i++) {
        for (let j = 0; j < AlignMatrix[i].length; j++) {
            AlignMatrix[i][j] = { bold: false, path: false, value: AlignMatrix[i][j] };
        }

    }

    return AlignMatrix;
}

function visualizeLocalPath(visualizationTable, current, color) {

    visualizationTable[current.i + 1][current.j + 1].path = color;
    for (let i = 0; i < current.precedent.length; i++) {
        visualizeLocalPath(visualizationTable, current.precedent[i], color);
    }

}

function drawLocalArray(array, id) {
    let table = document.getElementById(id);
    table.parentElement.parentElement.classList.remove('d-none');
    table.innerHTML = '';
    for (let I = 0; I < array.length; I++) {

        let row = document.createElement('tr');

        for (let J = 0; J < array[0].length; J++) {

            let cell = document.createElement('td');

            try {
                cell.className += array[I][J].bold ? 'font-weight-bold' : '';
                cell.innerText = array[I][J].value;
                if (array[I][J].path) {

                    cell.style.color = 'white';
                    cell.style.backgroundColor = array[I][J].path;

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
/* Utility */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}