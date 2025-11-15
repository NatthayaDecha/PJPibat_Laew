import React, { useEffect, useState } from "react";
import axios from "axios";

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

function FirePage1day() {
  //ตัวแปร
  const [fireData, setFireData] = useState<FireFeature[]>([]);
  const [error, setError] = useState("");
  const provinces = [
    { idn: "10", name: "กรุงเทพมหานคร" },
    { idn: "11", name: "กทม" },
    { idn: "12", name: "นนทบุรี" },
    { idn: "13", name: "ปทุมธานี" },
    { idn: "14", name: "พระนครศรีอยุธยา (อยุธยา)" },
    { idn: "15", name: "อ่างทอง" },
    { idn: "16", name: "ลพบุรี" }, //*
    { idn: "17", name: "สิงห์บุรี" },
    { idn: "18", name: "ชัยนาท" },
    { idn: "19", name: "สระบุรี" },
    { idn: "20", name: "Terst" },
    { idn: "21", name: "ระยอง" },
    { idn: "24", name: "ฉะเชิงเทรา" },
    { idn: "25", name: "ปราจีนบุรี" },
    { idn: "30", name: "นครราชสีมา" },
    { idn: "31", name: "บุรีรัมย์" },
    { idn: "32", name: "สุรินทร์" },
    { idn: "33", name: "ศรีสระเกษ" },
    { idn: "34", name: "อุบลราชธานี" }, //*
    { idn: "35", name: "ยโสธร" }, //*
    { idn: "36", name: "ชัยภูมิ" },
    { idn: "37", name: "อำนาจเจริญ" },
    { idn: "38", name: "บึงกาฬ" }, //*
    { idn: "39", name: "หนองบัวลำภู" },
    { idn: "40", name: "ขอนแก่น" },
    { idn: "41", name: "อุดรธานี" },
    { idn: "42", name: "เลย" },
    { idn: "43", name: "หนองคาย" },
    { idn: "44", name: "มหาสารคาม" },
    { idn: "45", name: "ร้อยเอ็ด" },
    { idn: "46", name: "กาฬสินธุ์" },
    { idn: "47", name: "สกลนคร" },
    { idn: "48", name: "นครพนม" }, //*
    { idn: "49", name: "มุกดาหาร" },
    { idn: "50", name: "เชียงใหม่" }, //*
    { idn: "51", name: "ลำพูน" },
    { idn: "52", name: "ลำปาง" },
    { idn: "53", name: "อุตรดิถ์" }, //*
    { idn: "54", name: "Terst" },
    { idn: "55", name: "Terst" },
    { idn: "56", name: "พะเยา" },
    { idn: "57", name: "Terst" },
    { idn: "58", name: "แม่ฮ่องสอน" },
    { idn: "59", name: "Terst" },
    { idn: "70", name: "Terst" },
    { idn: "71", name: "Terst" },
    { idn: "72", name: "สุพรรณบุรี" },
    { idn: "73", name: "นครปฐม" },
    { idn: "74", name: "Terst" },
    { idn: "75", name: "Terst" },
    { idn: "76", name: "Terst" },
    { idn: "77", name: "Terst" },
    { idn: "78", name: "Terst" },
    { idn: "79", name: "Terst" },
    { idn: "80", name: "Terst" },
    { idn: "81", name: "Terst" },
    { idn: "82", name: "Terst" },
    { idn: "83", name: "Terst" },
    { idn: "84", name: "Terst" },
    { idn: "85", name: "Terst" },
    { idn: "86", name: "Terst" },
    { idn: "87", name: "Terst" },
    { idn: "88", name: "Terst" },
    { idn: "89", name: "Terst" },
    { idn: "90", name: "สงขลา" },
    { idn: "91", name: "Terst" },
    { idn: "92", name: "Terst" },
    { idn: "93", name: "พัทลุง" },
    { idn: "94", name: "Terst" },
    { idn: "95", name: "Terst" },
    { idn: "96", name: "Terst" },
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
    const fetchFireData = async () => {
      try {
        setFireData([]);
        const response = await axios.get(
          "https://api-gateway.gistda.or.th/api/2.0/resources/features/viirs/1day?offset=0&pv_idn=" +
            selectedProvinceIdn,
          {
            headers: {
              accept: "application/json",
              "API-Key":
                "ne87zBRj82586Rybub6iIwo5jVNxgE9JZ3MXMENDLOsgPXfqj96WbuX7dBvspfeY",
            },
          }
        );
        // setFloodData(response.data);
        setFireData(response.data.features);
        console.log(response.data.features);
      } catch (err) {
        console.error(err);
        setError("ไม่สามารถดึงข้อมูลได้");
      }
    };

    fetchFireData();
  }, [selectedProvinceIdn]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!fireData) return <p>Loading...</p>;

  //html
  return (
    <div className="content">
      <select
        id="province-select"
        value={selectedProvinceIdn} // กำหนดค่าที่ถูกเลือกจาก state
        onChange={handleProvinceChange} // เรียกฟังก์ชันเมื่อมีการเปลี่ยนแปลง
        // style={{ padding: "10px", marginBottom: "20px", borderRadius: "5px" }}
      >
        {provinces.map((p) => (
          <option key={p.idn} value={p.idn}>
            {p.name}
          </option>
        ))}
      </select>
      {/* บอกว่าเหตถหาร์ยังไม่เกิดขึ้น */}
      {fireData.length === 0 ? (
        <p style={{ color: "gray", marginTop: "20px" }}>
          ยังไม่ได้มีเหตุการณ์ในจังหวัดนี้
        </p>
      ) : (
        /* บอกว่าถ้าเกิดเหตุการณ์ข้อความจะหายไปเองเพาราะว่า ใช้:(..) */
        fireData.map((f, i) => (
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
            <a href={f.properties.linkgmap} target="_blank" rel="noopener noreferrer">
              ดูบนแผนที่ Google Maps
            </a>
          </p>
          </div>
        ))
      )}
    </div>
  );
}

export default FirePage1day;
