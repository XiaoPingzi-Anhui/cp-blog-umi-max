import { FloatButton } from 'antd';
import ContactWebmaster from '@/global/components/contactWebmaster';
import useDisableDebugger from '@/global/hooks/useDisableDebugger';

export default function Global() {
  useDisableDebugger();
  return (
    <>
      <ContactWebmaster />
      <FloatButton.BackTop style={{ bottom: 40 }} />
    </>
  );
}
