import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../_duck/loginSlice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { ButtonC } from '../../components/Button/ButtonC';
import { NotAccount } from './_components/NotAccount';
import { Navigate, useNavigate } from 'react-router-dom';
export interface ILoginPage {

}
export function LoginTemplate(props: ILoginPage) {
    const isUserLogin = localStorage.getItem('jira')
    const user = useSelector((state: RootState) => state.login)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [login, setLogin] = useState({
        email: '',
        passWord: '',
    })
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLogin({
            ...login,
            [name]: value,
        })
    }
    const handleOnsubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (login.email === '' || login.passWord === '') {
            alert('Vui lòng nhập liệu !')
            return
        }
        dispatch(loginUser({ data: login, navigate }))
    }
    if (isUserLogin) return <Navigate to='/' />

    return (
        <form onSubmit={(event) => {
            handleOnsubmit(event)
        }}
            className='container'>
            <div className='row justify-content-center '>
                <div className="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4 mt-5 border rounded py-5 mb-5 shadow">
                <i className="fa-solid fa-bug" style={{ fontSize: '60px', }} ></i>
                    <h1>Jira</h1>
                    <div className='d-flex justify-content-between'>
                        <div className='ml-5'>
                            <h4 className='mb-4 text-center d-inline'>Đăng nhập</h4><br />
                            <span className='ml-3'>Chào mừng bạn quay lại.</span>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div className="from-group">
                            <label htmlFor="email">Email</label>
                            <input className='form-control' type="text" name='email' disabled={user.loading} onChange={handleOnchange} />
                        </div>

                        <div className="from-group">
                            <label htmlFor="passWord">Mật khẩu</label>
                            <input className='form-control' type="password" name='passWord' disabled={user.loading} onChange={handleOnchange} />
                        </div>

                    </div>
                    <ButtonC
                        buttonClass='btn btn-block btn-primary mt-5'
                        btnName='Đăng nhập'
                        type='submit'
                        isLoading={user.loading} />
                    <NotAccount />
                </div>
            </div>
        </form>
    );
};