import React from 'react';
export interface IPhotoConsumer {
    src: string;
    intro?: React.ReactNode;
    children?: React.ReactElement<any>;
}
declare const PhotoConsumer: React.FC<IPhotoConsumer>;
export default PhotoConsumer;
