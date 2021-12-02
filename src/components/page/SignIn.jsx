import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/features/signInReducer";
import { NavLink, useNavigate } from "react-router-dom";

const SignIn = () => {

  const [personalData, setPersonalData] = useState({});

  const dispatch = useDispatch();

  const error = useSelector((state) => state.signIn.error);

  const token = useSelector((state) => state.signIn.token);

  const handlePersonalData = {
    login: (login) => {
      setPersonalData({ ...personalData, login });
    },
    password: (password) => {
      setPersonalData({ ...personalData, password });
    },
  };

  const navigate = useNavigate();

  const handleSabmit = async () => {
    await dispatch(auth(personalData));
  };

  {token && navigate('/')}
  return (
    <div>
      <div className="container">
        <div className="registar shadow p-5 rounded-3 mt-5 w-50 m-auto">
          <form className="row g-3">
            <div className="col- 12 md-6">
              <label htmlFor="inputLogin" className="form-label">
                Логин
              </label>
              <input
                onChange={(e) => handlePersonalData.login(e.target.value)}
                type="text"
                className="form-control"
                id="inputLogin"
              />
            </div>
            <div className="col-12 md-6">
              <label htmlFor="inputPassword" className="form-label">
                Пароль
              </label>
              <input
                onChange={(e) => handlePersonalData.password(e.target.value)}
                type="password"
                className="form-control"
                id="inputPassword"
              />
            </div>
            <div className="col-12">
              <NavLink to="/registry">Создать аккаунт</NavLink>
            </div>
            {error}
            <div className="col-12">
              <button
                onClick={handleSabmit}
                type="button"
                className="btn btn-primary"
              >
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default SignIn;
