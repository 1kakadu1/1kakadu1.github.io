import { IElementsReturn, IEventsUI, IVideoPlayerElementsCreate, IVideoPlayerUI, IVideoPlayerUIParam, IVolumeClasses } from "../models/video";
declare class VideoPlayerUI implements IVideoPlayerUI {
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
    protected playbackRate({ btn }: {
        btn: string;
    }, events: IEventsUI): IElementsReturn;
    protected subtitles({ btn, cItem, listTrack, track, }: {
        btn: string;
        cItem: string;
        listTrack: string;
        track: NodeListOf<HTMLTrackElement> | null;
    }, events: IEventsUI): IElementsReturn;
    protected volume({ btn, volume, range }: IVolumeClasses, events: IEventsUI): {
        remove: () => void;
        dom_elements: {
            volume_container_node: HTMLDivElement;
            volume_range_node: HTMLDivElement;
            volume_button: HTMLButtonElement;
            volume_range_label: HTMLDivElement;
            volume_range_input: HTMLInputElement;
        };
    };
    protected fullscreen: (on: string, off: string, events: IEventsUI) => {
        remove: () => void;
        dom_elements: {
            fullscreen_container_node: HTMLDivElement;
            fullscreen_on: HTMLButtonElement;
            fullscreen_off: HTMLButtonElement;
        };
    };
    protected play(play: string, pause: string, events: IEventsUI): {
        remove: () => void;
        dom_elements: {
            buttons_pp_action: HTMLDivElement;
            button_pause: HTMLButtonElement;
            button_play: HTMLButtonElement;
        };
    };
    protected track(container: string, progress: string, buffer: string, time: string, timeFull: string, events: IEventsUI): {
        remove: () => void;
        dom_elements: {
            track_container_node: HTMLDivElement;
            track: HTMLDivElement;
            track_time: HTMLSpanElement;
            track_time_full: HTMLSpanElement;
            track_buffered_amount: HTMLSpanElement;
            track_buffered: HTMLDivElement;
            track_player: HTMLDivElement;
            track_progress: HTMLDivElement;
            track_progress_amount: HTMLSpanElement;
        };
    };
    protected doubleTap(events: IEventsUI): IElementsReturn;
    overlayPlay(events: IEventsUI): IElementsReturn;
    storeTimeBtn(events: IEventsUI): IElementsReturn;
    controls(container: HTMLDivElement | null, events: IEventsUI): IElementsReturn;
    createUI: (events: IEventsUI) => IVideoPlayerElementsCreate;
}
export default VideoPlayerUI;
