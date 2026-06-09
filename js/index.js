(() => {
  // src/lib/config.ts
  var API_ROOT = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";

  // src/lib/photoloader.ts
  function makeUrl(uri) {
    if (uri.indexOf("/www") === 0) {
      return `https://webetu.iutnc.univ-lorraine.fr${uri}`;
    }
    return `${API_ROOT}${uri}`;
  }
  function loadPicture(idPicture) {
    return fetch(
      `${API_ROOT}/photos/${idPicture}`,
      { credentials: "include" }
    ).then((response) => {
      if (!response.ok) {
        throw new Error("photo introuvable");
      }
      return response.json();
    }).catch((error) => {
      console.log(error);
      throw error;
    });
  }
  function loadResource(uri) {
    return fetch(
      makeUrl(uri),
      { credentials: "include" }
    ).then((response) => {
      if (!response.ok) {
        throw new Error("ressource introuvable");
      }
      return response.json();
    }).catch((error) => {
      console.log(error);
      throw error;
    });
  }

  // src/lib/ui.ts
  function displayPicture(data) {
    var _a;
    const source = (_a = document.querySelector("#photoTemplate")) == null ? void 0 : _a.innerHTML;
    if (source) {
      const template = Handlebars.compile(source);
      const html = template(data);
      const zone = document.querySelector("#la_photo");
      if (zone) {
        zone.innerHTML = html;
      }
    }
  }
  function displayCategorie(data) {
    const zone = document.querySelector("#la_categorie");
    if (zone) {
      zone.innerHTML = `categorie : ${data.categorie.nom}`;
    }
  }
  function displayComments(data) {
    const zone = document.querySelector("#les_commentaires");
    if (zone) {
      zone.innerHTML = "";
      data.comments.forEach((comment) => {
        zone.innerHTML += `<li>${comment.pseudo} : ${comment.content}</li>`;
      });
    }
  }

  // src/lib/gallery.ts
  var galerie = null;
  function load() {
    return loadResource("/photos").then((data) => {
      galerie = data;
      return galerie;
    });
  }
  function next() {
    return loadResource(galerie.links.next.href).then((data) => {
      galerie = data;
      return galerie;
    });
  }
  function prev() {
    return loadResource(galerie.links.prev.href).then((data) => {
      galerie = data;
      return galerie;
    });
  }
  function first() {
    return loadResource(galerie.links.first.href).then((data) => {
      galerie = data;
      return galerie;
    });
  }
  function last() {
    return loadResource(galerie.links.last.href).then((data) => {
      galerie = data;
      return galerie;
    });
  }

  // src/lib/gallery_ui.ts
  function loadCategorie(picture) {
    return loadResource(picture.links.categorie.href);
  }
  function loadComments(picture) {
    return loadResource(picture.links.comments.href);
  }
  function displayOnePicture(id2) {
    loadPicture(id2).then((data) => {
      displayPicture(data);
      loadCategorie(data).then((categorie) => {
        displayCategorie(categorie);
      });
      loadComments(data).then((comments) => {
        displayComments(comments);
      });
    });
  }
  function display_galerie(galerie2) {
    var _a;
    const source = (_a = document.querySelector("#galleryTemplate")) == null ? void 0 : _a.innerHTML;
    if (source) {
      const template = Handlebars.compile(source);
      const html = template(galerie2);
      const zone = document.querySelector("#galerie");
      if (zone) {
        zone.innerHTML = html;
        const images = document.querySelectorAll(".vignette img");
        images.forEach((image) => {
          image.addEventListener("click", () => {
            const id2 = image.getAttribute("data-photoId");
            if (id2) {
              displayOnePicture(id2);
            }
          });
        });
      }
    }
  }

  // src/index.ts
  function loadCategorie2(picture) {
    return loadResource(picture.links.categorie.href);
  }
  function loadComments2(picture) {
    return loadResource(picture.links.comments.href);
  }
  function displayGallery(data) {
    display_galerie(data);
  }
  function getPicture(id2) {
    loadPicture(id2).then((data) => {
      displayPicture(data);
      loadCategorie2(data).then((categorie) => {
        displayCategorie(categorie);
      });
      loadComments2(data).then((comments) => {
        displayComments(comments);
      });
    });
  }
  function setupGallery() {
    const button = document.querySelector("#load_gallery");
    if (button) {
      button.addEventListener("click", () => {
        load().then((galerie2) => {
          display_galerie(galerie2);
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
  var id = window.location.hash ? window.location.hash.substring(1) : 105;
  getPicture(id);
  setupGallery();
})();
//# sourceMappingURL=index.js.map
