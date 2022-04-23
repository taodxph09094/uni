import { useCallback, useEffect, useState } from 'react';
import * as httpServices from '../../services/httpServices';

export const usePostData = (
  url,
  isNeedToken = true,
  requestData = null,
  isReload,
  isRunFirst = true,
  success = null,
  fail = null,
) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (isRunFirst) {
      _postData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReload, isRunFirst]);

  const _resetData = useCallback(() => {
    setData(null);
  }, []);

  const _postData = async (customUrl = null, customData = null) => {
    let endpoint = '';

    if (customUrl) {
      endpoint = customUrl;
    } else {
      endpoint = url;
    }
    setIsLoading(true);
    try {
      const response = await httpServices.postData(endpoint, customData ? customData : requestData);
      setIsLoading(false);
      setData(response);
      if (typeof success === 'function') {
        success(response);
      }
    } catch (err) {
      setError(err);
      setIsLoading(false);
      if (typeof fail === 'function') {
        fail(err);
      }
    }
  };

  return { isLoading, data, error, _postData, _resetData };
};
