const player = document.querySelectorAll('.player')[0];

const players = [
    { name: 'Z.Amine', number: 9, x: '55%', y: '60%', team: false },
    { name: 'B.ilies', number: 10, x: '35%', y: '60%', team: false },
    { name: 'M.khairdine', number: 4, x: '80%', y: '70%', team: false },
    { name: 'B.Iqbal', number: 3, x: '45%', y: '80%', team: false },
    { name: 'M.Yassine', number: 5, x: '10%', y: '70%', team: false },

    { name: 'Z.Nadir', number: 5, x: '10%', y: '25%', team: true },
    { name: 'A.Rafik', number: 4, x: '80%', y: '25%', team: true },
    { name: 'A.Charef', number: 3, x: '45%', y: '10%', team: true },
    { name: 'O.Farid', number: 8, x: '45%', y: '25%', team: true },
    { name: 'M.Nazim', number: 10, x: '45%', y: '40%', team: true },
]

players.map(v => {

    const p = player.cloneNode(true);

    document.getElementById('container').appendChild(p);

    const text = p.querySelector('.player-text');
    const number = p.querySelector('.pos-text');

    p.classList.remove('d-none');
    if (v.team) p.classList.add('red');

    p.style.left = v.x;
    p.style.top = v.y;

    text.innerHTML = v.name;
    number.innerHTML = v.number;


})