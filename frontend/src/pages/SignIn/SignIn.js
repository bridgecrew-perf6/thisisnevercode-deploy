import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer';
import { API_ENDPOINT } from '../../API/api';
import './SignIn.scss';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      showPw: false,
    };
  }

  handleSignIn = () => {
    const { email, password } = this.state;
    if (email === '') {
      return alert('이메일을 입력해주세요');
    } else if (password === '') {
      return alert('비밀번호를 입력해주세요');
    }

    fetch(`${API_ENDPOINT}/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      // credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.status === 'FAILED') {
          alert('잘못된 패스워드입니다');
        } else if (data.status === 'SUCCESS_LOGIN') {
          alert('로그인에 성공하였습니다');
          this.goToList();
        }
      });
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  changeIcon = () => {
    this.setState({
      showPw: !this.state.showPw,
    });
  };

  goToList = () => {
    const { email, password } = this.state;
    if (email.includes('@') && password.length >= 5) {
      this.props.history.push('./main');
    }
  };

  render() {
    const { showPw } = this.state;
    return (
      <section className='SignIn'>
        <Nav />
        <form action='' className='form'>
          <div className='signInBox'>
            <p className='email'>이메일</p>
            <input
              className='emailInput'
              type='email'
              placeholder='이메일'
              name='email'
              onChange={this.handleInput}
            />
            <p className='password'>비밀번호</p>
            <div className='passwordContainer'>
              <input
                className='passwordInput'
                type={showPw ? 'text' : 'password'}
                placeholder='비밀번호'
                name='password'
                onChange={this.handleInput}
              />
              <div className='onEye' onClick={this.changeIcon}>
                {showPw ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button
              className='signInButton'
              type='button'
              onClick={this.handleSignIn}
            >
              <p className='signInText'>LOGIN</p>
            </button>
            <div className='addFunction'>
              <Link className='signUp' to='/signup'>
                회원가입
              </Link>
              <Link className='findPassword' to=''>
                비밀번호 찾기
              </Link>
            </div>
            <button className='button'>LOGIN WITH KOKOA</button>
            <button className='button'>LOGIN WITH FACEKICK</button>
            <button className='button'>LOGIN WITH GARGLE</button>
          </div>
        </form>
        <Footer />
      </section>
    );
  }
}

export default SignIn;
