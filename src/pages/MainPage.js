import {elementBuilder} from '../utils/dom';
import {implementations} from '../fetcher/implementations';

export default class MainPage {

    constructor() {
        this.name = 'main';
    }

    start(pageContainer) {
        const linkTests = elementBuilder('div', 'mainPage-linkTests', {innerHTML: 'Run tests >', onclick: () => {
            document.querySelector('.mainPage-linkTests-token').style.display = 'inline-block';
        }}, pageContainer).build();

        const mainPage = elementBuilder('div', 'mainPage', null, pageContainer).build();

        elementBuilder('div', 'mainPage-linkTests-token', null, linkTests)
            .appendChild('input', 'mainPage-linkTests-token-input', {type: 'text', placeholder: 'token', value: localStorage.getItem('tokenTests')})
            .appendChild('button', 'mainPage-linkTests-token-btn', {innerHTML: '>', onclick: () => {
                const token = document.querySelector('.mainPage-linkTests-token-input').value;
                localStorage.setItem('tokenTests', token);
                window.location.href = `tests/tests.html?token=${token}`;
            }});
        [1, 2, 3, 4, 5].forEach(i => mainPage.appendChild(MainPage.buildFireworksLink(i)));

        pageContainer.appendChild(MainPage.buildImplementationsLink(implementations));
    }

    static buildFireworksLink(i) {
        return elementBuilder('a', 'mainPage-fireworksLink', {href: `#page=fireworks&nb=${i}`})
            .appendChild('img', 'mainPage-fireworksLink-img', {src: 'assets/fireworks-icon.png'})
            .appendChild('span', 'mainPage-fireworksLink-number', {innerHTML: i})
            .build();
    }

    static buildImplementationsLink(implementations) {
        const implementationsContainer = elementBuilder('ul', 'mainPage-implementationsLinks').build();
        implementations.forEach((implementation) => {
            elementBuilder('li', 'mainPage-implementationsLink', null, implementationsContainer)
                .appendChild('img', 'mainPage-implementationsLink-img', {src: implementation.avatar})
                .appendChild('a', 'mainPage-implementationsLink-link', {innerHTML: implementation.developer, href: implementation.git})
                .appendChild('span', 'mainPage-implementationsLink-span', {innerHTML: 'has made '})
                .appendChild('img', 'mainPage-implementationsLink-img', {src: implementation.image})
                .appendChild('span', 'mainPage-implementationsLink-span', {innerHTML: ' implementation'});
        });
        return implementationsContainer;
    }

}