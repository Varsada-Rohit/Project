import {useContext} from 'react';
import AuthContext from './Context';
import auth from '@react-native-firebase/auth';

export default useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const setToken = (token) => {
    setUser(token);
  };

  const removeToken = () => {
    auth().signOut();
    setUser('');
  };

  return {user, setUser, removeToken, setToken};
};
