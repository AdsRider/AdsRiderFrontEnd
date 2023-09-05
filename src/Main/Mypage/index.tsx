import { MypageDiv, StatsDiv, Text, StyledRangePicker, StyledDatePicker } from './Styles';
import { Button, DatePicker, Descriptions } from 'antd';
import { useUserState } from '../../context/user';
import { dateConverter, UserBalance } from '../../Utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import Rider from './Rider';
import Advertiser from './Advertiser';
import Admin from './Admin';
import dayjs from 'dayjs';

function Mypage() {
  const user = useUserState();
  const [isFrom, setFrom] = useState('');
  const [isTo, setTo] = useState('');
  const [balance, setBalance] = useState<UserBalance[]>([]);
  const [userTypeComponent, setUserTypeComponent] = useState<JSX.Element | null>(null);
  const adsBalance = balance.find((b) => b.type === 'ADS')?.available || '0';

  // RangePicker 운영자, 광고주는 날짜 제한 X
  const rangePickerChange = (dates: any, dateStrings: [string, string]) => {
    const [from, to] = dateStrings;
    setFrom(from);
    setTo(to);
  };
  // DatePicker 라이더는 1주일 단위만 가능
  const datePickerChange = (date : dayjs.Dayjs | null) => {
    if (date) {
      const to = date.format('YYYY-MM-DD');
      const from = date.subtract(7, 'days').format('YYYY-MM-DD');
      setFrom(from);
      setTo(to);
    }
  };

  // 유저 잔액 확인
  useEffect(() => {
    axios.get<UserBalance[]>('/api/user/balance').then((res) => {
      if (res.data) {
        setBalance(res.data);
      }
    });
  }, []);


  // 통계 버튼 클릭 시
  // 유저 타입 별 처리
  function getStatistics(from: string, to: string) {
    if (from && to) {
      if (user.level === '라이더'){
        setUserTypeComponent(<Rider from={from} to={to}/>)
      } else if (user.level === '광고주'){
        setUserTypeComponent(<Advertiser from={from} to={to}/>)
      } else if (user.level === '운영자'){
        setUserTypeComponent(<Admin from={from} to={to}/>)
      } else { // 유저 타입이 null인 경우
        setUserTypeComponent(null)
      }
    }
  }

  return (
    <MypageDiv>
        <Descriptions bordered size="default">
          <Descriptions.Item label="유저 이름">{user.email}</Descriptions.Item>
          <Descriptions.Item label="유저 타입">{user.level == null ? 'null' : user.level}</Descriptions.Item>
          <Descriptions.Item label="보유 자산">{new BigNumber(adsBalance).toFormat()} ADS</Descriptions.Item>
          <Descriptions.Item label="가입 일자">{dateConverter(new Date(user.join_time))}</Descriptions.Item>
          <Descriptions.Item label="이용권 만료 기간">{dateConverter(new Date(user.expired_date))}</Descriptions.Item>
          <Descriptions.Item label="개인 지갑 주소">{user.address}</Descriptions.Item>
        </Descriptions>
        <StatsDiv>
          <Text>날짜 선택 </Text>
          {user.level === '라이더'
          ? <StyledDatePicker onChange={datePickerChange}/>
          : ''}
          <Button type="primary" onClick={() => getStatistics(isFrom, isTo)}>
            통계 보기
          </Button>
        </StatsDiv>
        {userTypeComponent}

    </MypageDiv>
  );
}

export default Mypage;