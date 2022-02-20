export interface IElementsReturn {
    remove: () => void;
    class: string;
    ui: string[];
}
interface IUi {
    [key: string]: HTMLElement | null;
}
interface IVideoPlayerElementsCreate {
    [key: string]: IElementsReturn;
}
interface IVideoPlayerUI {
    unMount: () => void;
    controls: (container: HTMLDivElement | null) => IElementsReturn;
    createUI: () => IVideoPlayerElementsCreate;
}
declare global {
    interface Document {
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        webkitFullscreenElement?: Element;
    }
    interface HTMLDivElement {
        mozRequestFullScreen(): Promise<void>;
        webkitRequestFullscreen(): Promise<void>;
        mozRequestFullScreen(): Promise<void>;
        msRequestFullscreen(): Promise<void>;
    }
}
export declare enum UiClasses {
    play = "videoPlay",
    stop = "videoStop",
    pause = "videoPause",
    start = "videoStart",
    fullscreen = "videoFullscreen",
    fullscreenCancel = "videoFullscreenCancel",
    buffer = "playerBufferedAmount",
    progress = "playerProgressAmount",
    track = "playerTrack",
    volume = "videoVolume",
    rangeVolume = "videoVolumeRange",
    labelValue = "player-volume-label",
    volumeProgressContainer = "playerVolumeContainer",
    videoPlayerControls = "videoPlayerControls",
    videoContainerOverlay = "overlayVideoContainer",
    videoOverlayBtn = "overlayVideoBtn",
    trackTime = "palyertrackTime",
    trackTimeFull = "palyertrackTimeFull",
    subtitleBtn = "playerSubtitleBtn",
    subtitleItem = "playerSubtitleItem",
    subtitleList = "palyersubtitleList",
    video = "playerVideo",
    doubleTap = "doubleTap",
    doubleTapLeft = "doubleTapLeft",
    doubleTapRight = "doubleTapRight",
    playToTime = "playToTimeBtn",
    playToTimeContainer = "playToTimeContainer",
    qualityBtn = "playerQualityBtn",
    qualityItem = "playerQualityItem",
    qualityList = "playerQualityList"
}
interface IFade {
    el: HTMLElement;
    display?: string;
    time?: number;
    callback?: () => void;
}
interface IVolumeClasses {
    btn: string;
    volume: string;
    range: string;
}
export interface IVideoPlayerUIParam {
    volumeValue: number;
    icons: string;
    subtitles?: NodeListOf<HTMLTrackElement> | null;
    subtitlesInit?: boolean | undefined;
    timeTrackOffset?: number | undefined;
    timeStore: number;
}
interface IBrowser {
    browser: string;
    class: string;
}
declare enum PlayerKey {
    storeInfo = "player-info",
    dataset = "name",
    storeInfoPrev = "player-info-prev"
}
export interface IVideoPlayer {
    videoContainer: string;
    iconsFolder: string;
    subtitle?: boolean;
    volumeValue?: number;
    timeTrackOffset?: number;
    videoPlayerUI?: (videoContainer: HTMLDivElement | null, param: IVideoPlayerUIParam) => IVideoPlayerUI;
    storeTimeOffset?: number;
}
export declare enum IVideoPlayerDefaultConst {
    volume = 100,
    timeTrackOffset = 3
}
export declare class VideoPlayerUI implements IVideoPlayerUI {
    protected container: HTMLDivElement | null;
    protected volumeValue: number;
    protected subtitlesList: NodeListOf<HTMLTrackElement> | null;
    protected icons: string;
    protected subtitlesInit?: boolean | undefined;
    protected timeTrackOffset?: number | undefined;
    private storeTime;
    private utils;
    private unMountList;
    constructor(videoContainer: HTMLDivElement | null, param: IVideoPlayerUIParam);
    unMount: () => void;
    protected subtitles({ btn, cItem, listTrack, track, }: {
        btn: string;
        cItem: string;
        listTrack: string;
        track: NodeListOf<HTMLTrackElement> | null;
    }): string;
    protected volume({ btn, volume, range }: IVolumeClasses): string;
    protected fullscreen: (on: string, off: string) => string;
    protected play(play: string, pause: string): string;
    protected track(container: string, progress: string, buffer: string, time: string, timeFull: string): string;
    protected doubleTap(): IElementsReturn;
    protected overlayPlay(): IElementsReturn;
    protected storeTimeBtn(isUnmount?: boolean): IElementsReturn;
    controls(container: HTMLDivElement | null): IElementsReturn;
    createUI: () => IVideoPlayerElementsCreate;
}
export declare class VideoPlayer {
    private video;
    private videoContainer;
    private controlsUI;
    private isPlay;
    private isFullScreen;
    private isVolume;
    private navigator;
    private volumeValue;
    private iconsFolder;
    private subtitles;
    private subtitlesIndex;
    private isSubtitles;
    private isTrack;
    private ui?;
    private timeTrackOffset;
    private isMouseHover;
    private unMountObject;
    private tapedTwice;
    private browser;
    private name?;
    private timeStore;
    private timeStoreOffset;
    private mX;
    private mY;
    private utils;
    constructor({ videoContainer, iconsFolder, volumeValue, subtitle, timeTrackOffset: timeTrackOffset, videoPlayerUI, storeTimeOffset }: IVideoPlayer);
    get videoElement(): HTMLVideoElement | null;
    get controls(): IUi;
    get isVideoPlay(): boolean;
    unMountUI: () => void;
    unMountEvent: () => void;
    unMount: () => void;
    checkError: () => boolean;
    private _onTouch;
    private _onMouse;
    private _onClickControls;
    private _onChangePip;
    private _onChangeFullScreen;
    private _onChangeProgressVideo;
    private _onEventKeywords;
    private _onChangeVolume;
    private setStoreTime;
    private removeStoreTime;
    private getStoreTime;
    play: () => void;
    playTo: (time: number) => void;
    pause: () => void;
    stop: () => void;
    playerInit: () => void;
}
interface IVideoUtils {
    fadeIn: (value: IFade) => void;
    fadeOut: (value: IFade) => void;
    userAgent: () => IBrowser;
    fadeOutIN: (showClassEl: string, hideClassEl: string, time: number, controlsUI: IUi, param?: {
        callback?: () => void;
        display?: string;
    }) => void;
    secondsToHms: (d: number) => {
        h: number;
        m: number;
        s: number;
        time: string;
    };
    eventStoreDispatch: () => void;
    eventChangeStor: (callback: (e: any) => void) => void;
    eventRemoveStore: (callback: (e: any) => void) => void;
}
export declare class VideoUtils implements IVideoUtils {
    private navigator;
    private event;
    constructor();
    get storeKey(): PlayerKey;
    fadeIn({ el, display, time, callback }: IFade): void;
    fadeOut({ el, time, callback }: IFade): void;
    fadeOutIN(showClassEl: string, hideClassEl: string, time: number, controlsUI: IUi, param?: {
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
    eventChangeStor(callback: (e: any) => void): void;
    eventRemoveStore(callback: (e: any) => void): void;
}
export {};
