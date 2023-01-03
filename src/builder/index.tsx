import React from "react";
import ReactDOM from "react-dom";
import BuilderApp from './app'

export class Builder {
    public static init() {
        return new this()
    }

    constructor() {
        window.addEventListener('load', this.onLoad.bind(this));
    }

    private onLoad() {
        ReactDOM.render(<BuilderApp />, document.getElementById("root"));
    }
}