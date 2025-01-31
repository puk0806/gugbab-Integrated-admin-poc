import type { Meta } from '@storybook/react';
import { Icon } from '@components';
import icons from '@icons';
import { StoryObj } from '@storybook/react';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render() {
    console.log('icons', icons);
    return (
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {icons.map(icon => (
          <div key={icon} title={icon}>
            {icon}
            <Icon irName={icon} name={icon} />
          </div>
        ))}
      </div>
    );
  },
};
