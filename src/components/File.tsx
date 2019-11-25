import { css } from '@emotion/core';
import classNames from 'classnames';
import { useCallback } from 'react';
import Image from './Image';
import resolveAsset from '../lib/resolveAsset';

const previewFiles = ['png', 'jpg'];

interface Props {
    name: string;
    selected?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const getExtension = (fileName: string) =>
    /.*?\.([a-zA-Z0-9]+)/.exec(fileName)?.[1];

const style = css`
    background: 0;
    border-radius: 0;
    width: 90px;
    height: 90px;
    margin: 10px;
    overflow: hidden;
    padding: 15px 0;
    text-align: center;
    display: inline-block;
    border: dotted 1px transparent;
    cursor: pointer;
    outline: 0;
    vertical-align: top;

    &:hover {
        border-color: #ccc;
    }

    &.file_selected {
        border: solid 1px #d3e4ff;
        background: rgba(28, 97, 199, 0.04);
    }

    .file__icon {
        font-size: 0;
        margin-bottom: 6px;
    }

    .file__icon__default {
        font-size: 40px;
    }

    .file__title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }
`;

const File: React.FC<Props> = props => {
    const { onClick } = props;
    const className = classNames({
        file_selected: props.selected
    });

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (onClick) {
                onClick(e);
            }
        },
        [onClick]
    );

    const extension = getExtension(props.name);
    const showPreview = Boolean(
        extension && -1 !== previewFiles.indexOf(extension)
    );

    const defaultIcon = (
        <em
            className={classNames(
                'file__icon__default',
                'fiv-sqo',
                `fiv-icon-${getExtension(props.name)}`
            )}
        />
    );

    return (
        <button css={style} onClick={handleClick} className={className}>
            <div className="file__icon">
                {showPreview ? (
                    <Image
                        size={40}
                        src={resolveAsset(props.name)}
                        errorComponent={defaultIcon}
                    />
                ) : (
                    defaultIcon
                )}
            </div>
            <div className="file__title">{props.name}</div>
        </button>
    );
};

export default File;
