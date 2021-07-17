
function workSection(sec) {
    return `<article data-bind="contents" class="">
        <div class="col-sm-4 timetable-left marked">
            <a data-bind="organization_url" target="_blank" rel="nofollow"
                href="${sec.link}">
                <h4 data-bind="organization"><span class="undefined needsclick"
                    contenteditable="false" data-placeholder="Organization">
                    ${sec.org}</span></h4>
            </a>
            <h5 class="date-range"><span data-bind="start_date" class="empty"><span
                    class="undefined needsclick empty" contenteditable="false"
                    data-placeholder="YYYY"></span>${sec.start}</span><span data-bind="end_date"
                class="empty"><span class="undefined needsclick empty" contenteditable="false"
                    data-placeholder="YYYY"></span>${sec.end}</span>
            </h5>
        </div>
        <div class="col-sm-8 timetable-right">
            <div class="article-body">
                <h4 data-bind="title"><span class="undefined needsclick" contenteditable="false"
                    data-placeholder="Job title">${sec.title}</span></h4>
                <div id="react-tinymce-161" class="mce-content-body" spellcheck="true"
                    placeholder="Description"> ${sec.description}
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </article>`
}

function skillSection(skill) {
    return `
    <article data-bind="contents" class="">
        <div class="col-sm-4 timetable-left">
            <h4 data-bind="name"><span class="undefined needsclick" contenteditable="false"
                    data-placeholder="Name">${skill.title}</span></h4>
        </div>
        <div class="col-sm-8 timetable-right">
            <div class="article-body competency">
                <div class="competency-bar">
                    <div class="competency-level" data-bind="level" style="width: ${skill.strength}%;"></div>
                </div>
                <div id="react-tinymce-173" class="mce-content-body" spellcheck="true"
                    placeholder="Description">
                    <p>${skill.description}</p>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </article>
    `
}

function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

const work = [
    { link: 'https://farmy.ai', org: 'Farmy.ai', start: '2016', end: 'Now', title: 'Website', description: 'AI applied to make farming smart' },
    { link: 'https://expert.farmy.ai/', org: 'Farmy.ai', start: '2016', end: 'Now', title: 'Web platform', description: 'Created using Angular, Angular material & NGRX library' },
    { link: 'https://play.google.com/store/apps/details?id=ai.farmy.app', org: 'Farmy.ai', start: '2017', end: 'Now', title: 'Mobile application', description: 'Created using Angular and ionic' },
    { link: 'https://github.com/farmy-ai/covid-fighters', org: 'Covideep', start: '2020', end: '2020', title: 'Web application', description: 'Data collection and label tool for COVID-19 disease chest scans' },
    { link: 'https://springschoolskikda.github.io/', org: 'Spring school', start: '2020', end: '2020', title: 'Website', description: 'Website created for a spring school located at skikda, algeria' },
    { link: 'https://medicadz.herokuapp.com/', org: 'Medica DZ', start: '2018', end: '2018', title: 'Web application', description: 'The easiest way to lookup drug information' },
    { link: 'https://github.com/ilyesbrh/barber', org: 'Barber booking app', start: '2019', end: 'Now', title: 'Web application', description: 'Barbers appointment scheduling apps' },
    { link: 'https://github.com/ilyesbrh/Doctors-freelancing', org: 'Doctors booking app', start: '2020', end: '2020', title: 'Web application', description: 'Doctors appointment scheduling apps' },
    { link: 'https://github.com/ilyesbrh/cipher-frontend', org: 'Cipher', start: '2019', end: 'now', title: 'Web application', description: 'Practice management app for lawyers' },
    { link: 'https://github.com/ilyesbrh/barbehttps://github.com/ilyesbrh/Annotation-Tool', org: 'Annotation-Tool', start: '2017', end: '2018', title: 'Desktop software', description: 'A simple way to label images for professional scientific use created with JavaFX & Jfeonix' },
    { link: '#', org: 'Employee management', start: '2016', end: '2016', title: 'Desktop application', description: 'Employee management app created using c#' },
    { link: 'https://github.com/ilyesbrh/Wolfwere', org: 'Wolfwere', start: '2020', end: '2020', title: 'Discord BOT', description: 'Online bot (multi/role)player game called loup-garou' },
    { link: 'https://github.com/ilyesbrh/Ludo', org: 'Ludo game', start: '2019', end: '2019', title: 'C++ game', description: 'small ludo game created for a workshops' },
    { link: '#', org: 'ARKNOID', start: '2019', end: '2019', title: 'C game', description: 'Arknoid game clone created for a workshops' },

];

const skill = [
    { title: 'Angular', description: '', strength: 95 },
    { title: 'Ionic', description: '', strength: 90 },
    { title: 'Nodejs', description: '', strength: 90 },
    { title: 'Loopback.js', description: '', strength: 90 },
    { title: 'Vue', description: '', strength: 70 },
    { title: 'c#.net', description: '', strength: 60 },
    { title: 'Git', description: '', strength: 95 },
];

(() => {

    let w_el = document.getElementById('Work');
    work.forEach(w => {

        w_el.appendChild(htmlToElements(workSection(w))[0]);
    });

    let s_el = document.getElementById('strengths');
    skill.forEach(s => {

        let el = htmlToElements(skillSection(s))[1];

        let node = s_el.appendChild(el);
    });

})()
