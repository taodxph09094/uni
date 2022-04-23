import { cloneDeep, isArray, isEqual, isObject } from 'lodash';

export const copyToClipboard = (text = '') => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const filterQueryInHeaderField = (headerField = [], query = {}) => {
  const mapValHeaderField = headerField?.map((el) => el.value);
  const itemInHeaderField = {};
  const itemNotInHeaderField = {};
  Object.keys(query).forEach((key) => {
    if (mapValHeaderField.includes(query[key])) {
      itemInHeaderField[key] = query[key];
    } else {
      itemNotInHeaderField[key] = query[key];
    }
  });

  return { itemInHeaderField, itemNotInHeaderField };
};

export const findValueInOptions = (valueField = '', options = [], nameFieldOfOptions = 'value') => {
  return (
    options?.find((el) =>
      isEqual(
        (valueField || '').toString().toLocaleLowerCase(),
        (el[nameFieldOfOptions] || '').toString().toLocaleLowerCase(),
      ),
    ) || {
      label: '',
      value: '',
    }
  );
};

export const convertToFormSelect = (list, fieldForLabel = undefined, fieldForValue = undefined, noneOption = false) => {
  if (!fieldForLabel || !fieldForValue) {
    return [
      ...list.reduce((arr, el) => {
        return [...arr, { text: el, id: el }];
      }, []),
    ];
  }
  if (typeof list === 'object' && list) {
    const listReturn = [
      ...list.reduce((arr, el) => {
        return [...arr, { alldata: el, text: el[fieldForLabel] || 'None', id: el[fieldForValue] || '' }];
      }, []),
    ];

    if (noneOption) {
      return [{ text: 'None', id: '' }, ...listReturn];
    }
    return listReturn;
  }
  return [{ text: 'None', id: '' }, ...list];
};

export const correctBodyToRequest = (params = {}, removeNull = false) => {
  const values = cloneDeep(params || {});
  // convert object -> value when from selection
  return Object.keys(values).reduce((obj, key) => {
    obj = {
      ...obj,
      [key]: (values[key] || '').trim(),
    };

    if (isObject(values[key]) && values[key].hasOwnProperty('value')) {
      obj = {
        ...obj,
        [key]: values?.[key]?.value,
      };
    }

    if (isArray(values[key])) {
      obj = {
        ...obj,
        [key]: values[key]?.map((el) => el['value']),
      };
    }

    if (removeNull && values[key] === null) {
      delete obj[key];
    }

    return obj;
  }, {});
};

export const numberWithCommas = (x) => {
  const parts = x?.toString()?.split('.');
  if (parts && parts[0]) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return 0;
};

export const createParamsSearch = (obj) => {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
};

export const convertTreeArrayToFlat = (treeArr) => {
  const stack = [],
    array = [],
    hashMap = {};
  stack.push(treeArr);

  while (stack.length > 0) {
    const node = stack.pop();
    if (!node?.children) {
      visitNode(node, hashMap, array);
    } else {
      for (let i = node.children.length; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    }
  }

  return array;
};

export const visitNode = (node, hashMap, array) => {
  if (!hashMap[node.data]) {
    hashMap[node.data] = true;
    array.push(node);
  }
};
