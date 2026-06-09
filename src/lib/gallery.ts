import { loadResource } from "./photoloader";

let galerie: any = null;

function load(): Promise<any> {
    return loadResource("/photos")
        .then(data => {
            galerie = data;
            return galerie;
        });
}

function next(): Promise<any> {
    return loadResource(galerie.links.next.href)
        .then(data => {
            galerie = data;
            return galerie;
        });
}

function prev(): Promise<any> {
    return loadResource(galerie.links.prev.href)
        .then(data => {
            galerie = data;
            return galerie;
        });
}

function first(): Promise<any> {
    return loadResource(galerie.links.first.href)
        .then(data => {
            galerie = data;
            return galerie;
        });
}

function last(): Promise<any> {
    return loadResource(galerie.links.last.href)
        .then(data => {
            galerie = data;
            return galerie;
        });
}

export { load, next, prev, first, last };