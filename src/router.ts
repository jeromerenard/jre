import * as $ from "jquery";

class Router {
    routeHandlers:(() => void)[] = [];

    on(path: string, handler: () => void) {
        this.routeHandlers[path] = handler;
        return this;
    }    

    private handle() {
        const url = location.hash.slice(1) || "/";
        console.log(url);
        const handler = this.routeHandlers[url];
        if (handler) handler();        
    }

    listen() {
        $(window).on("hashchange", () => this.handle()).trigger("hashchange");        
    }
}

export const router = new Router();