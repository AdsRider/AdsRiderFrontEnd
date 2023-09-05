import { Breadcrumb, Descriptions } from "antd";
import { Div, MapContainer } from "./Styles";
import start from '../../src_assets/start.png'
import end from '../../src_assets/end.png'
import { useState } from "react";
import { useParams } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}
export interface AdsHistoryType{
    id : string,
    ads_id : number,
    path: {latitude: string, longitude: string}[],
    meters : number,
    hash : string,
    reward: string,
    start_time : Date,
    end_time : Date,
}
interface pointtype {
    La : number;
    Ma : number;
}

// 전역변수
let map:any;
const API_KEY = process.env.REACT_APP_MAP_API_KEY;

export default function Map( { data } : any ) {

  let index = useParams();
  const [adsHistory, setAdsHistory] = useState<AdsHistoryType>();

  // poly-line (latitude, longitude) 이차원 배열 생성
  const polyPath: { latitude: string; longitude: string }[][] = Array.from({ length: data.length }, () => []);

  // kakao map api
  window.scrollTo(0, 0);
  const mapScript = document.createElement("script");

  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`;
  document.head.appendChild(mapScript);

  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
    let i = 0;
    data.forEach((adsHistory : any) => {
        if(adsHistory) {
            for (const p of adsHistory.path){
              polyPath[i].push(new window.kakao.maps.LatLng(p.latitude, p.longitude));
            } };
        i += 1;
    })
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.3391167, 126.7370528), // 지도의 중심좌표
        level: 4,
      };
      map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 지도 타입 전환: 일반 지도, 스카이뷰
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      const zoomControl = new window.kakao.maps.ZoomControl();

      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      // 마커 옵션 ------------------------------------------------------------------
      const imageSrc1 = start,
      imageSize1 = new window.kakao.maps.Size(50, 45),
      imageOption1 = {offset: new window.kakao.maps.Point(15, 43)};

      const imageSrc2 = end,
      imageSize2 = new window.kakao.maps.Size(50, 45),
      imageOption2 = {offset: new window.kakao.maps.Point(15, 43)};

      // path 랜덤 색 지정
      const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
        const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
        const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
      };
      // -- 경로 표시 코드 (polyline) -------------------------------------------------------------
        polyPath.forEach((p)=> {
          const colorIndex = getRandomColor();
          const polyline = new window.kakao.maps.Polyline({
              map: map,
              path : p,
              strokeWeight: 4,
              strokeColor: colorIndex,
              strokeOpacity: 0.7,
              strokeStyle: 'solid'
            });

            const markerImage1 = new window.kakao.maps.MarkerImage(imageSrc1, imageSize1, imageOption1),
            markerPosition1 = new window.kakao.maps.LatLng(p[0].latitude,p[0].longitude);
            const markerImage2 = new window.kakao.maps.MarkerImage(imageSrc2, imageSize2, imageOption2),
            markerPosition2 = new window.kakao.maps.LatLng(p[p.length-1].latitude,p[p.length-1].longitude);
            // 마커 생성
            const marker1 = new window.kakao.maps.Marker({
                position: markerPosition1,
                image: markerImage1
            });
            const marker2 = new window.kakao.maps.Marker({
                position: markerPosition2,
                image: markerImage2
            });

            // ------------------------------------------------------------------------------
            polyline.setMap(map);
            marker1.setMap(map);
            marker2.setMap(map);
        })
    });
  };

  mapScript.addEventListener("load", onLoadKakaoMap);

  return (
    <>
      <Div>
        <MapContainer id="map"></MapContainer>
      </Div>
    </>
  );
}