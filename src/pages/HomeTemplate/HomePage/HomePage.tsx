import * as React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export interface IHomePageProps {
}

export function HomePage (props: IHomePageProps) {
  return (
    <>
      <h1 className='text-success'>Chào mừng đăng nhập quay trở lại trang web!</h1>
    </>
  );
}
