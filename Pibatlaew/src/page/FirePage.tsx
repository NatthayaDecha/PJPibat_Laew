import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/FirePage.css";

interface FireFeature {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][][];
  };
  properties: {
    _id: string;
    bright_ti4: number;
    ap_en: string;
    ap_tn: string;
    latitude: number;
    longitude: number;
    pv_code: number;
    pv_en: string;
    pv_idn: string;
    pv_tn: string;
    re_royin: string;
    tambol: string;
    tb_en: string;
    tb_tn: string;
    th_date: string; //วันไทยไม่ใช่utc
    th_time: number; //เวลาไทยไม่ใช่utc
    village: string;
    linkgmap: string;
  };
}

function FirePage() {
  const [fireData, setFireData] = useState<FireFeature[]>([]);
  const [error, setError] = useState("");
  const provinces = [
    { idn: "10", name: "กรุงเทพมหานคร" },
    { idn: "11", name: "สมุทรปราการ" },
    { idn: "12", name: "นนทบุรี" },
    { idn: "13", name: "ปทุมธานี" },
    { idn: "14", name: "พระนครศรีอยุธยา" },
    { idn: "15", name: "อ่างทอง" },
    { idn: "16", name: "ลพบุรี" },
    { idn: "17", name: "สิงห์บุรี" },
    { idn: "18", name: "ชัยนาท" },
    { idn: "19", name: "สระบุรี" },
    { idn: "20", name: "ชลบุรี" },
    { idn: "21", name: "ระยอง" },
    { idn: "22", name: "จันทบุรี" },
    { idn: "23", name: "ตราด" },
    { idn: "24", name: "ฉะเชิงเทรา" },
    { idn: "25", name: "ปราจีนบุรี" },
    { idn: "26", name: "นครนายก" },
    { idn: "27", name: "สระแก้ว" },
    { idn: "30", name: "นครราชสีมา" },
    { idn: "31", name: "บุรีรัมย์" },
    { idn: "32", name: "สุรินทร์" },
    { idn: "33", name: "ศรีสะเกษ" },
    { idn: "34", name: "อุบลราชธานี" },
    { idn: "35", name: "ยโสธร" },
    { idn: "36", name: "ชัยภูมิ" },
    { idn: "37", name: "อำนาจเจริญ" },
    { idn: "38", name: "บึงกาฬ" },
    { idn: "39", name: "หนองบัวลำภู" },
    { idn: "40", name: "ขอนแก่น" },
    { idn: "41", name: "อุดรธานี" },
    { idn: "42", name: "เลย" },
    { idn: "43", name: "หนองคาย" },
    { idn: "44", name: "มหาสารคาม" },
    { idn: "45", name: "ร้อยเอ็ด" },
    { idn: "46", name: "กาฬสินธุ์" },
    { idn: "47", name: "สกลนคร" },
    { idn: "48", name: "นครพนม" },
    { idn: "49", name: "มุกดาหาร" },
    { idn: "50", name: "เชียงใหม่" },
    { idn: "51", name: "ลำพูน" },
    { idn: "52", name: "ลำปาง" },
    { idn: "53", name: "อุตรดิตถ์" },
    { idn: "54", name: "แพร่" },
    { idn: "55", name: "น่าน" },
    { idn: "56", name: "พะเยา" },
    { idn: "57", name: "เชียงราย" },
    { idn: "58", name: "แม่ฮ่องสอน" },
    { idn: "60", name: "นครสวรรค์" },
    { idn: "61", name: "อุทัยธานี" },
    { idn: "62", name: "กำแพงเพชร" },
    { idn: "63", name: "ตาก" },
    { idn: "64", name: "สุโขทัย" },
    { idn: "65", name: "พิษณุโลก" },
    { idn: "66", name: "พิจิตร" },
    { idn: "67", name: "เพชรบูรณ์" },
    { idn: "70", name: "ราชบุรี" },
    { idn: "71", name: "กาญจนบุรี" },
    { idn: "72", name: "สุพรรณบุรี" },
    { idn: "73", name: "นครปฐม" },
    { idn: "74", name: "สมุทรสาคร" },
    { idn: "75", name: "สมุทรสงคราม" },
    { idn: "76", name: "เพชรบุรี" },
    { idn: "77", name: "ประจวบคีรีขันธ์" },
    { idn: "80", name: "นครศรีธรรมราช" },
    { idn: "81", name: "กระบี่" },
    { idn: "82", name: "พังงา" },
    { idn: "83", name: "ภูเก็ต" },
    { idn: "84", name: "สุราษฎร์ธานี" },
    { idn: "85", name: "ระนอง" },
    { idn: "86", name: "ชุมพร" },
    { idn: "90", name: "สงขลา" },
    { idn: "91", name: "สตูล" },
    { idn: "92", name: "ตรัง" },
    { idn: "93", name: "พัทลุง" },
    { idn: "94", name: "ปัตตานี" },
    { idn: "95", name: "ยะลา" },
    { idn: "96", name: "นราธิวาส" },
  ];

  const [selectedProvinceIdn, setSelectedProvinceIdn] = useState<string>("14");
  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProvinceIdn(event.target.value);
    console.log(event.target.value);
  };
  const kelvinToCelsius = (k: number) => (k - 273.15).toFixed(1);
  const heatLevel = (k: number): string => {
    if (k >= 280 && k <= 290) return "ปกติ (อุณหภูมิพื้นดินทั่วไป)";
    if (k >= 300 && k <= 310) return "เริ่มมีความร้อนสูง";
    if (k > 310 && k <= 320) return "ร้อนมาก (อาจเป็นการเผา)";
    if (k > 320) return "ร้อนผิดปกติ (มีโอกาสเป็นไฟจริง)";
    return "ข้อมูลไม่อยู่ในช่วงมาตรฐาน";
  };

  useEffect(() => {
    if (!selectedProvinceIdn) return;
    const fetchFloodData = async () => {
      try {
        setFireData([]);
        setError("");

        const response = await axios.get(
          "https://api-gateway.gistda.or.th/api/2.0/resources/features/viirs/30days?limit=500&offset=0&pv_idn=" +
            selectedProvinceIdn,
          {
            headers: {
              accept: "application/json",
              "API-Key":
                "ne87zBRj82586Rybub6iIwo5jVNxgE9JZ3MXMENDLOsgPXfqj96WbuX7dBvspfeY",
            },
          }
        );

        setFireData(response.data.features || []);
      } catch (err) {
        console.error(err);
        setError("ไม่สามารถดึงข้อมูลได้");
      }
    };

    fetchFloodData();
  }, [selectedProvinceIdn]);

  return (
    <div className="firepage">
      {/* การ์ดข้อมูลไฟป่า*/}
      <div className="contentGrid">
        <div className="provinceBar">
          <select
            id="province-select"
            className="provinceSelect"
            value={selectedProvinceIdn}
            onChange={handleProvinceChange}
          >
            {provinces.map((p) => (
              <option key={p.idn} value={p.idn}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p style={{ color: "red", gridColumn: "1 / -1" }}>{error}</p>}
        {fireData.map((f, i) => (
          <div className="contentPage" key={f.id}>
            <h4>พื้นที่ที่ {i + 1}</h4>
            <p>จังหวัด: {f.properties.pv_tn}</p>
            <p>อำเภอ: {f.properties.ap_tn}</p>
            <p>ตำบล: {f.properties.tb_tn}</p>
            <p>หมู่บ้าน: {f.properties.village}</p>
            <p>อุณหภูมิ: {kelvinToCelsius(f.properties.bright_ti4)}°C</p>
            <p>สภาพอากาศ: {heatLevel(f.properties.bright_ti4)}</p>
            <p>
              วันที่ตรวจพบ:{" "}
              {new Date(f.properties.th_date).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <a
                href={f.properties.linkgmap}
                target="_blank"
                rel="noopener noreferrer"
              >
                ดูบนแผนที่ Google Maps
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FirePage;
