import { store } from 'react-notifications-component';

export default function ({ title, message, type }) {
  const notification = {
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  };

  store.addNotification({ ...notification });
}
