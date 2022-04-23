import { CodeConstants } from '../../constants/ApiCode';
import { useEffect } from 'react';

export const useCheckStatusApi = (
  data,
  callbackFail = () => {},
  callbackSuccess = () => {},
  isShowAlertSuccess = false,
) => {
  useEffect(() => {
    if (data) {
      if (data?.status) {
        if (data?.status !== CodeConstants.success) {
          if (typeof callbackFail === 'function') {
            callbackFail();
          }
        } else {
          if (typeof callbackSuccess === 'function') {
            callbackSuccess();
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callbackFail, callbackSuccess, data]);

  return [];
};
