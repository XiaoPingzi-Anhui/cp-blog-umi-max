import { FloatButton } from 'antd';
import ContactWebmaster from '@/global/components/contactWebmaster';
import useDisableDebugger from '@/global/hooks/useDisableDebugger';
import MouseStar from '@/global/components/mouseStar';

export default function Global() {
  useDisableDebugger();
  return (
    <>
      <MouseStar />
      <ContactWebmaster />
      <FloatButton.BackTop style={{ bottom: 40 }} />
    </>
  );
}
