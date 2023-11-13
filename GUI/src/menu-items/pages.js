// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: '',
  title: '',
  type: 'group',
  children: [
    {
      id: 'Articles',
      title: 'Mes Articles',
      type: 'item',
      url: '/articles',
      icon: icons.LoginOutlined
    },
    {
      id: 'SA',
      title: 'Soumettre un article',
      type: 'item',
      url: '/soumettre_un_article',
      icon: icons.ProfileOutlined
    }
  ]
};

export default pages;
