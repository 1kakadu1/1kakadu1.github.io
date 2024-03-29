import VideoUtils from "./lib/utils";
import VideoPlayer from "./lib/video";
import VideoPlayerUI from "./lib/video-ui";
import { UiClasses } from "./models/enum";
import { IElementsReturn, IVideoPlayerUIParam, IVideoPlayerUI, IPlayerStoreTime, IVideoPlayer } from "./models/video";
import './styles/main.sass';
export { VideoUtils, VideoPlayer, VideoPlayerUI, UiClasses, IElementsReturn, IVideoPlayerUIParam, IVideoPlayerUI, IPlayerStoreTime, IVideoPlayer, };
declare const _default: {
    VideoUtils: typeof VideoUtils;
    VideoPlayer: typeof VideoPlayer;
    VideoPlayerUI: typeof VideoPlayerUI;
};
export default _default;
