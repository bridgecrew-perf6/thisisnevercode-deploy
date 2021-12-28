import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Nav from '../../components/Nav/Nav';
// import Footer from '../../components/Footer';
// import Modal from '../Account/components/Modal';
import { API_ENDPOINT } from '../../API/api';
import './Account.scss';

function Account() {
  const [userEmail, setUserEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const getUserInfo = () => {
    fetch(`${API_ENDPOINT}/account/login/auth`, {
      method: 'get',
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setUserEmail(data.decoded.account);
      });
  };

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <section className='Account'>
      <div className='accountWrapper'>
        <div className='accountBox'>
          <div className='accountEmailMenu'>
            <p className='menuTitle'>EMAIL</p>
            <p className='categoryDesc'>{userEmail}</p>
          </div>
          <div className='accountMilesMenu'>
            <p className='menuTitle'>스토어 적립금</p>
            <p className='categoryDesc'>
              제품 구매 시 결제 완료 후 7일 뒤에 구매 금액의 10%가 적립되며 쇼핑
              카트에서 적립금 사용하기 버튼을 클릭하여 사용하실 수 있습니다.
              적립금은 구매일로부터 1년 동안 사용 가능합니다.
            </p>
            <Link className='accountBtn' onClick={openModal}>
              보기
            </Link>
            {/* <Modal showModal={showModal} setShowModal={setShowModal} /> */}
          </div>
          <div className='accountWishListMenu'>
            <p className='menuTitle'>WISHLIST</p>
            <p className='categoryDesc'>
              위시리스트 페이지에서 내가 저장한 아이템들을 확인하고 카트에
              담아보세요.
            </p>
            <Link className='accountBtn' to={'/pages/wishlist'}>
              보기
            </Link>
          </div>
          <div className='accountAddressMenu'>
            <p className='menuTitle'>기본주소</p>
            <p className='categoryDesc'></p>
            <Link className='accountBtn' to={'/account/addresses'}>
              수정
            </Link>
          </div>
          <div className='accountOrderMenu'>
            <p className='menuTitle'>주문 기록</p>
            <p className='categoryDesc'>아직 주문하지 않았습니다.</p>
          </div>
          <button
            className='logoutButton'
            // onClick={this.handleClick}
          >
            <p className='logoutText'>LOGOUT</p>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Account;
