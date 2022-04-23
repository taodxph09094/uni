import { useCallback, useEffect, useState } from 'react';

import * as httpServices from '../../services/httpServices';
import { createParamsSearch } from '../../helpers';

export const useGetData = (
  url,
  params = null,
  isNeedToken = true,
  isReload,
  isRunFirst = true,
  success = null,
  fail = null,
) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (isRunFirst) {
      _getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReload]);

  const _resetData = useCallback(() => {
    setData(null);
  }, []);

  const _getData = async (customUrl = null, customParam = null) => {
    let endpoint = '';
    if (customUrl) {
      endpoint = customUrl;
    } else {
      endpoint = url;
    }

    setIsLoading(true);
    try {
      const response = await httpServices.getData(
        endpoint,
        createParamsSearch(customParam) ?? createParamsSearch(params),
      );
      setIsLoading(false);
      setData(response.data);
      if (typeof success === 'function') {
      }
    } catch (err) {
      setError(err);
      setIsLoading(false);
      if (typeof fail === 'function') {
        fail(err);
      }
    }
  };

  return { isLoading, data, error, _getData, _resetData };
};
