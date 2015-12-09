import {window} from 'vscode';
import {Mode} from './Modes/Mode';
import {ModeNormal} from './Modes/Normal';
import {ModeVisual} from './Modes/Visual';
import {ModeVisualBlock} from './Modes/VisualBlock';
import {ModeInsert} from './Modes/Insert';

export enum MODE {NORMAL, VISUAL, VISUAL_BLOCK, INSERT};

export class Dispatcher {

	private currentMode: Mode;
	private modes: {[k: number]: Mode} = {
		[MODE.NORMAL]: new ModeNormal(),
		[MODE.VISUAL]: new ModeVisual(),
		[MODE.VISUAL_BLOCK]: new ModeVisualBlock(),
		[MODE.INSERT]: new ModeInsert(),
	};

	constructor() {
		this.switchMode(MODE.NORMAL);
	}

	inputHandler(key: string): () => void {
		return () => {
			this.currentMode.input(key);
		};
	}

	switchMode(id: MODE): void {
		if (this.currentMode === this.modes[id]) {
			return;
		}

		this.currentMode = this.modes[id];
		this.currentMode.cleanup();

		window.setStatusBarMessage(`-- ${this.currentMode.name} --`);
	}

	dispose(): void {
		// Nothing to clear now.
	}
}