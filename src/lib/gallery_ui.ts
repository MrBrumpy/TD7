import { loadPicture, loadResource } from "./photoloader";
import { displayPicture, displayCategorie, displayComments } from "./ui";

declare const Handlebars: any;

function loadCategorie(picture: any): Promise<any> {
    return loadResource(picture.links.categorie.href);
}

function loadComments(picture: any): Promise<any> {
    return loadResource(picture.links.comments.href);
}

function displayOnePicture(id: string): void {
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

function display_galerie(galerie: any): void {
    const source = document.querySelector("#galleryTemplate")?.innerHTML;

    if (source) {
        const template = Handlebars.compile(source);
        const html = template(galerie);

        const zone = document.querySelector("#galerie");

        if (zone) {
            zone.innerHTML = html;

            const images = document.querySelectorAll(".vignette img");

            images.forEach(image => {
                image.addEventListener("click", () => {
                    const id = image.getAttribute("data-photoId");

                    if (id) {
                        displayOnePicture(id);
                    }
                });
            });
        }
    }
}

export { display_galerie };