import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '@components';
import error from '../../../public/error-default.svg';

console.log('error', error);

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Image> = {
  args: {
    src: '../../../public/ari.png',
    alt: 'test',
    width: 280,
  },
};

export const BaseErrorImage: StoryObj<typeof Image> = {
  args: {
    src: '',
    errorSrc: error,
    alt: 'test',
    width: 140,
    objectFit: 'contain',
  },
};
