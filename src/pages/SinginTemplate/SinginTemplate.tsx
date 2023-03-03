import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ButtonC } from '../../components/Button/ButtonC';
import Spiner from '../../components/Loading/Spiner/Spiner';
import { AppDispatch, RootState } from '../../store';
import { handleOnchange, handleOnError, handelOnSubmit, signupThunk } from '../_duck/signupSlice';
export interface ISinginTemplateProps {
}



export function SinginTemplate() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const signup = useSelector((state: RootState) => state.signup)
  React.useEffect(() => {
    if (signup.accept) {
      const { email, passWord, name, phoneNumber } = signup.signUp
      const data = {
        email,
        passWord,
        name,
        phoneNumber
      }
      dispatch(signupThunk({data,navigate}))
    }
  },[signup.accept])

  return (
    <div className='container'>
      <form onSubmit={(event) => {
        dispatch(handelOnSubmit({ dispatch: dispatch, event: event }))
      }
      }>
        <div className="row form-group justify-content-center">
          <div className="col-md-4 py-4 my-2 border rounded shadow">
            <i className="fa-solid fa-bug" style={{ fontSize: '60px', }} ></i>
            <h1>Jira</h1>
            <h1 className='mb-3'>Đăng ký</h1>
            <input disabled={signup.loading} name='email' onChange={(event) => dispatch(handleOnchange(event))
            } onBlur={(event) => dispatch(handleOnError(event))} className='form-control mt-2' placeholder="Nhập email" type="text" />
            <div className='text-danger'>{signup.error.email}</div>
            <input disabled={signup.loading} name='passWord' onChange={(event) => dispatch(handleOnchange(event))} onBlur={(event) => dispatch(handleOnError(event))} className='form-control mt-2' placeholder="Nhập password" type="password" />
            <div className='text-danger'>{signup.error.passWord}</div>
            <input disabled={signup.loading} name='passWordAgain' onChange={(event) => dispatch(handleOnchange(event))} onBlur={(event) => dispatch(handleOnError(event))} className='form-control mt-2' placeholder="Nhập lại password" type="password" />
            <div className='text-danger'>{signup.error.passWordAgain}</div>
            <input disabled={signup.loading} name='phoneNumber' onChange={(event) => dispatch(handleOnchange(event))} onBlur={(event) => dispatch(handleOnError(event))} className='form-control mt-2' placeholder="Nhập số điện thoại" type="number" />
            <div className='text-danger'>{signup.error.phoneNumber}</div>
            <input disabled={signup.loading} name='name' onChange={(event) => dispatch(handleOnchange(event))} onBlur={(event) => dispatch(handleOnError(event))} className='form-control mt-2' placeholder="Nhập tên" type="text" />
            <div className='text-danger'>{signup.error.name}</div>
            <div className="text-danger">{signup.fullFilled}</div>
            <div className='d-flex justify-content-end mt-5'>
              <Link to="/login" className="btn btn-outline-primary">Đăng nhập</Link>
              <ButtonC type='submit' buttonClass="btn btn-primary ml-2" btnName='Đăng ký' isLoading={signup.loading}/>
            </div>
          </div>

        </div>
      </form>
    </div>
  );

}
