import { PlayerKey } from "../models/enum";
import { IBrowser, IFade } from "../models/video";
import { IVideoUtils } from "../models/video-utils";
declare class VideoUtils implements IVideoUtils {
    private navigator;
    private event;
    constructor();
    get storeKey(): PlayerKey;
    fadeIn({ el, display, time, callback }: IFade): void;
    fadeOut({ el, time, callback }: IFade): void;
    fadeOutIN(showClassEl: HTMLElement, hideClassEl: HTMLElement, time: number, param?: {
        callback?: () => void;
        display?: string;
    }): void;
    userAgent: () => IBrowser;
    secondsToHms(d: number): {
        h: number;
        m: number;
        s: number;
        time: string;
    };
    eventStoreDispatch(): void;
    eventChangeStor(callback: (e: unknown) => void): void;
    eventRemoveStore(callback: (e: unknown) => void): void;
}
export default VideoUtils;
