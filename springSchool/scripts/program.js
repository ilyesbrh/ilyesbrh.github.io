var days = [
    [
        ['Welcome & Introduction', 'Professor Fouad FERKOUS - University of Annaba', 'Fouad', ''],
        ['Computer Aided Drug Design', 'Youcef SAIHI – High School of Technological Education - Skikda', 'Youcef', ''],
        ['2D & 3D- QSAR: Applications and limitations', 'Khairedine KRAIM – High School of Technological Education – Skikda', 'Khairedine', ''],
        ['Workshops on 2D- QSAR', 'Ahmed Allali & Mohammed Brahim', 'Ahmed', 'Mohammed'],
        ['Workshops on 2D- QSAR', 'Ahmed Allali & Mohammed Brahim', 'Ahmed', 'Mohammed']
    ],
    [
        ['Introduction to Molecular Docking', 'Youcef SAIHI – High School of Technological Education - Skikda', 'Youcef', ''],
        ['Machine learning in drug design I', 'Mohammed BRAHIMI - University of Bordj Bou Arreridj', 'Mohammed', ''],
        ['Calculation methods in computational chemistry', 'Abdelmalek Khorief Nacereddine - High School of Technological Education - Skikda', 'Abdelmalek', ''],
        ['Workshops on molecular Docking - 1', 'Youcef SAIHI & Khairedine KRAIM', 'Youcef', 'Khairedine'],
        ['Workshops on molecular Docking - 1', 'Youcef SAIHI & Khairedine KRAIM', 'Youcef', 'Khairedine']
    ],
    [
        ['Molecular Docking: Search Algorithms and scoring functions', 'Khairedine KRAIM – High School of Technological Education - Skikda', 'Khairedine', ''],
        ['Machine learning in drug design II', 'Mohammed BRAHIMI - University of Bordj Bou Arreridj', 'Mohammed', ''],
        ['Introduction to Pharmacophore Hypothesis in drug design', 'Khairedine KRAIM – High School of Technological Education - Skikda', 'Khairedine', ''],
        ['Workshop on molecular docking -2', ' Youcef SAIHI & Khairedine KRAIM', 'Youcef', 'Khairedine'],
        ['Workshop on molecular docking -2', ' Youcef SAIHI & Khairedine KRAIM', 'Youcef', 'Khairedine']
    ],
    [
        ['Pharmacophore ligand/structure - based drug design', 'Khairedine KRAIM – High School of Technological Education - Skikda', 'Khairedine', ''],
        ['Machine learning in drug design III', 'Mohammed BRAHIMI - University of Bordj Bou Arreridj', 'Mohammed', ''],
        ['Workshop on Pharmacophore ligand - based', 'Youcef SAIHI & Khairedine KRAIM', 'Youcef', 'Khairedine'],
        ['Workshop on Pharmacophore ligand - based', 'Youcef SAIHI & Khairedine KRAIM', 'Youcef', 'Khairedine'],
        ['Workshop on Pharmacophore ligand - based', 'Youcef SAIHI & Khairedine KRAIM', 'Youcef', 'Khairedine']
    ],
    [
        ['Automating drug discovery', 'Ahmed Allali - University of El - Oued', 'Ahmed', ''],
        ['Workshop on Pharmacophore structure - based', 'Youcef SAIHI & Khairedine KRAIM', 'Youcef', 'Khairedine'],
        ['Workshop on Pharmacophore structure - based', 'Youcef SAIHI & Khairedine KRAIM', 'Youcef', 'Khairedine'],
        ['Workshop on Virtual screening based on Pharmacophore', 'Youcef SAIHI & Khairedine KRAIM', 'Youcef', 'Khairedine'],
        ['Close the spring school', '', '', ''],
    ],
];
var dates = [
    ['29', 'Sunday', 'Mach 2020'],
    ['30', 'Monday', 'Mach 2020'],
    ['31', 'Tuesday', 'Mach 2020'],
    ['01', 'Wednesday', 'April 2020'],
    ['02', 'Thursday', 'April 2020'],
]

var currentDay = 0;

function setSection(day) {

    if (currentDay > 4) currentDay = 0;
    if (currentDay < 0) currentDay = 4;

    document.querySelector("div.day-number").innerText = dates[currentDay][0];
    document.querySelector("div.day-name").innerText = dates[currentDay][1];
    document.querySelector("div.month").innerText = dates[currentDay][2];

    const sections = document.body.getElementsByClassName('section');
    for (let index = 0; index < sections.length; index++) {
        sections[index].childNodes[1].innerText = days[currentDay][index][0];
        sections[index].childNodes[3].innerText = days[currentDay][index][1];
        sections[index].childNodes[5].childNodes[1].src = '/img/ppl/' + days[currentDay][index][2] + '.jpg';
        sections[index].childNodes[5].childNodes[3].src = '/img/ppl/' + days[currentDay][index][3] + '.jpg';
    }

    if (currentDay > 0) {
        document.getElementsByClassName('registration')[0].style.display = 'none';
        document.querySelector("#content > div.timeline.container > ul > li:nth-child(2) > div.bullet.orange").classList = 'bullet green';
    } else {
        document.getElementsByClassName('registration')[0].style.display = 'block';
        document.querySelector("#content > div.timeline.container > ul > li:nth-child(2) > div.bullet.green").classList = 'bullet orange';
    }

}
setSection(0)