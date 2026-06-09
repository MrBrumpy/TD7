import { loadPicture, loadResource } from "./lib/photoloader";
import { displayPicture, displayCategorie, displayComments } from "./lib/ui";
import { load, next, prev, first, last } from "./lib/gallery";
import { display_galerie } from "./lib/gallery_ui";

function loadCategorie(picture: any): Promise<any> {
    return loadResource(picture.links.categorie.href);
}

function loadComments(picture: any): Promise<any> {
    return loadResource(picture.links.comments.href);
}

function displayGallery(data: any): void {
    display_galerie(data);
}

function getPicture(id: number | string): void {
    loadPicture(id)
        .then(data => {
            displayPicture(data);

            loadCategorie(data)
                .then(categorie => {
                    displayCategorie(categorie);
                });

            loadComments(data)
                .then(comments => {
                    displayComments(comments);
                });
        });
}

function setupGallery(): void {
    const button = document.querySelector("#load_gallery");

    if (button) {
        button.addEventListener("click", () => {
            load()
                .then(galerie => {
                    display_galerie(galerie);
                });
        });
    }

    const nextButton = document.querySelector("#next");

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            next().then(displayGallery);
        });
    }

    const prevButton = document.querySelector("#prev");

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            prev().then(displayGallery);
        });
    }

    const firstButton = document.querySelector("#first");

    if (firstButton) {
        firstButton.addEventListener("click", () => {
            first().then(displayGallery);
        });
    }

    const lastButton = document.querySelector("#last");

    if (lastButton) {
        lastButton.addEventListener("click", () => {
            last().then(displayGallery);
        });
    }
}

const id = window.location.hash
    ? window.location.hash.substring(1)
    : 105;

getPicture(id);
setupGallery();