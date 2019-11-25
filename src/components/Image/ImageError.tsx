import { css } from '@emotion/core';

const style = css`
    width: 100%;
    height: 100%;
    background: red;
`;

const ImageError: React.FC = () => <div css={style}>E</div>;

export default ImageError;
