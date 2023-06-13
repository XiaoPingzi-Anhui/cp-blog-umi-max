import { FloatButton, BackTopProps, Popover, Image } from 'antd';
import ContactWebmaster from '@/global/components/contactWebmaster';

export default function Global() {
  return (
    <>
      <ContactWebmaster />
      <FloatButton.BackTop style={{ bottom: 40 }} />
    </>
  );
}
