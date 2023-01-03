import ReactDOM from "react-dom";
import { Groups } from "../parser/types";
import ViewerApp from "./app";

type ViewerConfig = {
    input: string,
    output: string
}

export class Viewer {
    public static init(config: ViewerConfig) {
        return new this(config)
    }

    private inputSelector: string;
    private outputSelector: string;

    private timetable: HTMLDivElement | null = null;
    private groups: Groups = {}

    constructor(config: ViewerConfig) {
        this.inputSelector = config.input;
        this.outputSelector = config.output;

        window.addEventListener('load', this.onLoad.bind(this));
    }

    private async onLoad() {
        this.timetable = document.querySelector(this.outputSelector)
        const rawJson = document.querySelector(this.inputSelector)?.textContent || null;

        if (!this.timetable) {
            console.error('Output selector is not found')
            return;
        }

        if (!rawJson) {
            console.error('Input selector is not found')
            return;
        }

        try {
            this.groups = JSON.parse(rawJson)
        } catch (e) {
            console.error('cannot parse json block', e)
            return;
        }

        ReactDOM.render(<ViewerApp groups={this.groups} />, this.timetable);
    }
}