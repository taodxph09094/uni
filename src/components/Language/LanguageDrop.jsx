import React, { useState } from 'react';
import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media } from 'reactstrap';
import AuthServices from 'services/authServices';
import { useTranslation } from 'react-i18next';
const LanguageDrop = (props) => {
  const { t, i18n } = useTranslation();
  const [selectFlag, setSelectFlag] = useState('vi');
  const _changeLanguage = (langSelected) => {
    AuthServices.setUserLanguage(langSelected);
    window.location.reload(false);
  };
  const flags = [
    { title: 'vi', img: require('assets/img/icons/flags/Vi_vn.png').default },
    { title: 'en', img: require('assets/img/icons/flags/En_us.png').default },
  ];

  const getSelectedFlag = () => {
    const flagSelect = AuthServices.getUserLanguage() ?? 'vi';
    const selectItem = flags.filter((flag) => {
      return flag.title === flagSelect;
    });
    return selectItem[0];
  };

  return (
    <UncontrolledDropdown>
      <DropdownToggle nav>
        <Media className="align-items-center">
          <span className="avatar avatar-sm rounded-circle">
            <img alt="..." src={getSelectedFlag().img} />
          </span>
        </Media>
      </DropdownToggle>
      <DropdownMenu className="flag-language-item">
        {flags.map((flag, keym) => {
          return (
            <li key={keym}>
              <DropdownItem
                onClick={() => {
                  _changeLanguage(flag.title);
                }}
                key={keym}
              >
                <img width="40" height="40" alt="..." src={flag.img} />
              </DropdownItem>
            </li>
          );
        })}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default LanguageDrop;
