import { useUpdate } from 'ahooks';
import { createVerificationCode } from '@/utils/format';

export default function useVerifyCode() {
  const update = useUpdate();
  const { code, dataURL } = createVerificationCode();
  return { code, dataURL, updateCode: update };
}
