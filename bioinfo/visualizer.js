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