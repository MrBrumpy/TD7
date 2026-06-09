import { API_ROOT } from "./config";

function makeUrl(uri: string): string {
    if (uri.indexOf("/www") === 0) {
        return `https://webetu.iutnc.univ-lorraine.fr${uri}`;
    }

    return `${API_ROOT}${uri}`;
}

function loadPicture(idPicture: number | string): Promise<any> {
    return fetch(
        `${API_ROOT}/photos/${idPicture}`,
        { credentials: "include" }
    )
        .then(response => {
            if (!response.ok) {
                throw new Error("photo introuvable");
            }

            return response.json();
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
}

function loadResource(uri: string): Promise<any> {
    return fetch(
        makeUrl(uri),
        { credentials: "include" }
    )
        .then(response => {
            if (!response.ok) {
                throw new Error("ressource introuvable");
            }

            return response.json();
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
}

export { loadPicture, loadResource };