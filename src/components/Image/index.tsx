import { useState } from 'react';
import { css } from '@emotion/core';
import ImagePreloader from './ImagePreloader';
import ImageError from './ImageError';

interface Props {
    src: string;
    size?: number;
    preloaderComponent?: React.ReactNode;
    errorComponent?: React.ReactNode;
}

enum LoadState {
    Pending,
    Error,
    Loaded
}

const Image: React.FC<Props> = props => {
    const [state, setState] = useState(LoadState.Pending);

    const handleLoad = () => {
        setState(LoadState.Loaded);
    };

    const handleError = () => {
        setState(LoadState.Error);
    };

    const style = css`
        display: inline-block;
        width: ${props.size ? props.size + 'px' : '100%'};
        height: ${props.size ? props.size + 'px' : '100%'};

        .image__content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            > img {
                max-width: 100%;
                max-height: 100%;
                vertical-align: top;
            }
        }
    `;

    return (
        <div css={style}>
            {LoadState.Pending === state &&
                (props.preloaderComponent || <ImagePreloader />)}
            {LoadState.Error === state &&
                (props.errorComponent || <ImageError />)}
            <div className="image__content">
                <img
                    src={props.src}
                    onLoad={handleLoad}
                    onError={handleError}
                    style={{
                        display: LoadState.Loaded === state ? 'initial' : 'none'
                    }}
                />
            </div>
        </div>
    );
};

export default Image;
