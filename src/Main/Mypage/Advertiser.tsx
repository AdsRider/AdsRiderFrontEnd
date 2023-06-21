import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Collapse, Descriptions } from "antd";
import Map from "./Map";

interface AdvertiserData {
  id: string;
  title: string;
  subtitle: string;
  reward: string;
  image_id: number;
  start_date: Date;
  end_date: Date;
  user_email: string;
  data: {
    id: string;
    ads_id: string;
    path: { latitude: string; longitude: string }[];
    meters: number;
    reward: string;
    hash: string;
    start_time: Date;
    end_time: Date;
  }[];
}
interface AdvertiserProps {
  from: string;
  to: string;
}

const Advertiser: React.FC<AdvertiserProps> = ({ from, to }) => {
  const [advertiserData, setAdvertiserData] = useState<AdvertiserData[]>([]);
  const [isNone, setNone] = useState(true);
  useEffect(() => {
    axios
      .get<AdvertiserData[]>("/api/statistics", {
        params: {
          from: from,
          to: to,
        },
      })
      .then((res) => {
        if(res.data)
          setNone(false)
        if (Array.isArray(res.data)) {
          setAdvertiserData(res.data);
        } else {
          setAdvertiserData([res.data]);
        }
      });
  }, []);

  return (
    <>
    {!isNone ?
      <Collapse accordion={true}>
      {advertiserData.map((data, index) => (
        <Collapse.Panel
          key={index}
          header={
            <div>
              <h4>광고 : {data.title}</h4>
              <Image width={500} height={300} src={'/api/image/' + data.image_id}/>
            </div>
          }
        >
          <Descriptions bordered size="default">
            <Descriptions.Item label="광고 번호">{data.id} 번</Descriptions.Item>
            <Descriptions.Item label="광고 이름">{data.title}</Descriptions.Item>
            <Descriptions.Item label="광고 내용">{data.subtitle}</Descriptions.Item>
            <Descriptions.Item label="리워드 지급">{data.reward} ADS</Descriptions.Item>
            <Descriptions.Item label="시작 날짜">{data.start_date.toString().slice(0, 10)}</Descriptions.Item>
            <Descriptions.Item label="종료 날짜">{data.end_date.toString().slice(0, 10)}</Descriptions.Item>
          </Descriptions> <br/>
          {data.data && <Map data={data.data} />}
        </Collapse.Panel>
      ))}
    </Collapse>
    : '통계 데이터가 없습니다.' }
    </>
  );
};

export default Advertiser;
