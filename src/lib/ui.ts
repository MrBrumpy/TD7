declare const Handlebars: any;

function displayPicture(data: any): void {
    const source = document.querySelector("#photoTemplate")?.innerHTML;

    if (source) {
        const template = Handlebars.compile(source);
        const html = template(data);

        const zone = document.querySelector("#la_photo");

        if (zone) {
            zone.innerHTML = html;
        }
    }
}

function displayCategorie(data: any): void {
    const zone = document.querySelector("#la_categorie");

    if (zone) {
        zone.innerHTML = `categorie : ${data.categorie.nom}`;
    }
}

function displayComments(data: any): void {
    const zone = document.querySelector("#les_commentaires");

    if (zone) {
        zone.innerHTML = "";

        data.comments.forEach((comment: any) => {
            zone.innerHTML += `<li>${comment.pseudo} : ${comment.content}</li>`;
        });
    }
}

export { displayPicture, displayCategorie, displayComments };