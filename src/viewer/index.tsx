import ReactDOM from "react-dom/client";
import { Groups } from "../parser/types";
import ViewerApp from "./app";

type ViewerConfig = {
    input: string,
    output: string
}

export class Viewer {
    public static init(config: ViewerConfig): Viewer {
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

    private async onLoad(): Promise<void> {
        this.timetable = document.querySelector(this.outputSelector)
        const rawJson: string | null = document.querySelector(this.inputSelector)?.textContent || null;

        if (!this.timetable) {
            console.error('Output selector is not found')
            return;
        }

        if (!rawJson) {
            console.error('Input selector is not found')
            return;
        }

        try {
            this.groups = JSON.parse(rawJson);
            (window as any).PAGE_GROUPS = this.groups;
        } catch (e) {
            console.error('cannot parse json block', e)
            return;
        }

        ReactDOM.createRoot(this.timetable).render(<ViewerApp />);
    }
}