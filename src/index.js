import { fetchCatApi, fetchCatByBreed } from "./JS/cat-api";
import { Informer } from "./JS/informer-api";
import SlimSelect from 'slim-select'

const refs = {
    list: document.querySelector('.breed-select'),
    info: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
}

const LoaderControl = new Informer(refs.loader);
const ErrorControl = new Informer(refs.error);
const SelectControl = new Informer(refs.list);


refs.list.addEventListener('change', createContent);
fetchAndRender();

function fetchAndRender() {
    ErrorControl.close();
    LoaderControl.show();

    fetchCatApi().then(data => {
        const markUp = data.map(({ id, name }) => {
            return `<option value="${id}">${name}</option>`
        }).join('');

        markupCreateOptions(markUp);
        SelectControl.show();

    }).catch(error => {
        ErrorControl.show();
        console.log(error);
    }).finally(() => LoaderControl.close())

}

function markupCreateOptions(markup) {
    refs.list.innerHTML = markup;

    new SlimSelect({
        select: refs.list,
        settings: {
            showSearch: false,
        },
    })
};

function createContent({ currentTarget: { value: breedId } }) {
    ErrorControl.close();
    LoaderControl.show();
    refs.info.innerHTML = '';

    fetchCatByBreed(breedId).then(([{ url, breeds: [{ name, temperament, description }] }]) => {
        const markup = `
          <img src="${url}" alt="${name}"  width="300" height="300"/>
      <div class="container">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><span>Temperament: </span>${temperament}</p>
      </div>`;

        refs.info.innerHTML = markup;

    }).catch(error => {
        ErrorControl.show();
        console.log(error);
    })
        .finally(() => LoaderControl.close())

}










