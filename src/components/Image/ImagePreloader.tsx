import { css } from '@emotion/core';
import Loader from 'react-loader-spinner';

const style = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImagePreloader: React.FC = () => (
    <div css={style}>
        <Loader type="Oval" color="#1b5bba" height={40} width={40} />
    </div>
);

export default ImagePreloader;
