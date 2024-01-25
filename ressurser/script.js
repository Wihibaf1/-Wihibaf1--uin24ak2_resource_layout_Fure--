document.addEventListener('DOMContentLoaded', () => {
    const fanemeny = document.getElementById('fanemeny');
    const mainContent = document.getElementById('main-content');
    let activeCategory = '';

    // Opprett fanemenyen
    const ul = document.createElement('ul');
    resources.forEach((resource, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = resource.category;
        a.href = '#';
        a.addEventListener('click', (event) => {
            event.preventDefault();
            setActiveCategory(resource.category.toLowerCase());
        });

        li.appendChild(a);
        ul.appendChild(li);

        // Sett den første kategorien som aktiv ved første lasting
        if (index === 0) {
            activeCategory = resource.category.toLowerCase();
            a.classList.add('active');
        }
    });
    fanemeny.appendChild(ul);

    // Oppdater visningen basert på aktiv kategori
    function setActiveCategory(category) {
        // Oppdater aktiv link
        document.querySelectorAll('#fanemeny a').forEach((link) => {
            link.classList.remove('active');
            if (link.textContent.toLowerCase() === category) {
                link.classList.add('active');
            }
        });

        // Vis kun relevant innhold
        mainContent.innerHTML = ''; // Tømmer eksisterende innhold
        const categoryContent = resources.find((resource) => resource.category.toLowerCase() === category);

        if (categoryContent) {
            const article = document.createElement('article');
            const h1 = document.createElement('h1');
            h1.textContent = categoryContent.category;
            article.appendChild(h1);

            const p = document.createElement('p');
            p.textContent = categoryContent.text;
            article.appendChild(p);

            const ul = document.createElement('ul');
            categoryContent.sources.forEach((source) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = source.url;
                a.textContent = source.title;
                a.target = "_blank"; // Åpner lenken i en ny fane
                li.appendChild(a);
                ul.appendChild(li);
            });

            article.appendChild(ul);
            mainContent.appendChild(article);
        }
    }

    // Initialiser siden med innhold fra den første kategorien
    setActiveCategory(activeCategory);
});
