import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function LoginGoogle() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const handleLogin = () => {
   window.location.href = 'http://localhost:3007/auth/logGoogle';
  };

  return (
    <div>
      <button onClick={handleLogin}>
        Continuar con Google
      </button>
      {user && (
        <div>
          <h2>Bienvenido, {user.nombre}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default LoginGoogle;