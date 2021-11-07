document.addEventListener('DOMContentLoaded', () => {
    getDatasAndRender();
})

getDatasAndRender = () => {
    const URL = 'http://localhost:3000/ourvision';
    const param = {
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        method: 'GET'
    }
    const response = fetch(URL, param);
    response
        .then(data => data.json())
        .then(resp => {
            const projects = resp;
            // console.log(projects);
            createCardList(projects);
        })
        .catch(err => console.log(err));
}

createCardList = (list) => {
    let main = document.querySelector('main');
    let imgSection = document.createElement('section');
    imgSection.className = 'card-content-section';
    let h1 = document.createElement('h1');
    h1.innerText = 'Our Visions are always under construction!';
    main.appendChild(h1);
    for (let i = 0; i < list.length; i++) {
        let project = list[i];
        let cardHolder = document.createElement('article');
        let imgHolder = document.createElement('div');
        let textHolder = document.createElement('div');
        let img = document.createElement('img');
        img.src = project.imageUrl;
        img.alt = 'project-picture';
        imgHolder.appendChild(img);
        let cityText = document.createElement('p');
        cityText.innerHTML = `Project name: <span>${project.name}</span>`;
        textHolder.appendChild(cityText);
        let yearText = document.createElement('p');
        yearText.innerHTML = `Planning date: <span>${project.year}</span>`;
        textHolder.appendChild(yearText);
        cardHolder.appendChild(imgHolder);
        cardHolder.appendChild(textHolder);
        cardHolder.className = 'card-holder';
        imgHolder.className = 'img-holder';
        textHolder.className = 'text-holder';
        cityText.className = 'city';
        yearText.className = 'year';
        imgSection.appendChild(cardHolder);
        main.appendChild(imgSection);
    }
}