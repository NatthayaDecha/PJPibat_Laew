import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/FloodPage.css";

interface FloodFeature {
  id: string;
  type: string;
  geometry: {
    tyoe: string;
    coordinates: number[][][][];
  };
  properties: {
    _area: number;
    _createdAt: string;
    _createdBy: string;
    // _id: string;
    // _updatedAt: string;
    // _updatedBy: string;
    ap_en: string;
    ap_idn: number;
    ap_tn: string;
    // building: number;
    // building_2: number;
    // cassava_area: number | null;
    // cassava_area_2: number | null;
    // f_area: number;
    // file_name: string;
    // h3_address: string;
    // hospital: number;
    // length_road: number;
    // maize_area: number | null;
    // maize_area_2: number | null;
    // mongo_id: string;
    // population: number;
    // population_2: number;
    pv_en: string;
    pv_idn: number;
    pv_tn: string;
    // re_royin: string;
    region: string;
    // rice_area: number;
    // rice_area_2: number;
    // school: number;
    // sugarcane_area: number | null;
    // sugarcane_area_2: number | null;
    tb_en: string;
    tb_idn: number;
    tb_tn: string;
  };
}

function FloodPage30day() {
  //ตัวแปร
  const [floodData, setFloodData] = useState<FloodFeature[]>([]);
  const [error, setError] = useState("");
  const provinces = [ 
    { idn: "10", name: "กรุงเทพมหานคร" },
    // { idn: "11", name: "กทม" },
    { idn: "12", name: "นนทบุรี" },
    { idn: "13", name: "ปทุมธานี" },
    { idn: "14", name: "พระนครศรีอยุธยา (อยุธยา)" },
    { idn: "15", name: "อ่างทอง" },
    { idn: "16", name: "ลพบุรี" },
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
    { idn: "34", name: "อุบลราชธานี" },
    { idn: "35", name: "ยโสธร" },
    { idn: "36", name: "ชัยภูมิ" },
    { idn: "37", name: "อำนาจเจริญ" },
    { idn: "38", name: "บึงกาฬ" },
    { idn: "39", name: "หนองบัวลำภู" },
    { idn: "40", name: "ขอนแก่น" },
    { idn: "41", name: "อุดรธานี" },
    // { idn: "42", name: "เลย" },
    { idn: "43", name: "หนองคาย" },
    { idn: "44", name: "มหาสารคาม" },
    { idn: "45", name: "ร้อยเอ็ด" },
    { idn: "46", name: "กาฬสินธุ์" },
    { idn: "47", name: "สกลนคร" },
    { idn: "48", name: "นครพนม" },
    // { idn: "49", name: "มุกดาหาร" },
    // { idn: "50", name: "เชียงใหม่" },
    // { idn: "51", name: "ลำพูน" },
    // { idn: "52", name: "ลำปาง" },
    { idn: "53", name: "อุตรดิถ์" },
    // { idn: "54", name: "Terst" },
    // { idn: "55", name: "Terst" },
    { idn: "56", name: "พะเยา" },
    // { idn: "57", name: "Terst" },
    { idn: "58", name: "แม่ฮ่องสอน" },
    // { idn: "59", name: "Terst" },
    // { idn: "70", name: "Terst" },
    // { idn: "71", name: "Terst" },
    { idn: "72", name: "สุพรรณบุรี" },
    { idn: "73", name: "นครปฐม" },
    // { idn: "74", name: "Terst" },
    // { idn: "75", name: "Terst" },
    // { idn: "76", name: "Terst" },
    // { idn: "77", name: "Terst" },
    // { idn: "78", name: "Terst" },
    // { idn: "79", name: "Terst" },
    // { idn: "80", name: "Terst" },
    // { idn: "81", name: "Terst" },
    // { idn: "82", name: "Terst" },
    // { idn: "83", name: "Terst" },
    // { idn: "84", name: "Terst" },
    // { idn: "85", name: "Terst" },
    // { idn: "86", name: "Terst" },
    // { idn: "87", name: "Terst" },
    // { idn: "88", name: "Terst" },
    // { idn: "89", name: "Terst" },
    { idn: "90", name: "สงขลา" },
    // { idn: "91", name: "Terst" },
    // { idn: "92", name: "Terst" },
    { idn: "93", name: "พัทลุง" },
    // { idn: "94", name: "Terst" },
    // { idn: "95", name: "Terst" },
    // { idn: "96", name: "Terst" },
  ];
  const [selectedProvinceIdn, setSelectedProvinceIdn] = useState<string>("14");
  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProvinceIdn(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    const fetchFloodData = async () => {
      try {
        setFloodData([]);
        const response = await axios.get(
          "https://api-gateway.gistda.or.th/api/2.0/resources/features/flood/30days?limit=5000&offset=0&pv_idn=" 
          + selectedProvinceIdn,
          {
            headers: {
              accept: "application/json",
              "API-Key":
                "ne87zBRj82586Rybub6iIwo5jVNxgE9JZ3MXMENDLOsgPXfqj96WbuX7dBvspfeY",
            },
          }
        );
        // setFloodData(response.data);
        setFloodData(response.data.features);
        console.log(response.data.features);
      } catch (err) {
        console.error(err);
        setError("ไม่สามารถดึงข้อมูลได้");
      }
    };

    fetchFloodData();
  }, [selectedProvinceIdn]);

  //   if (error) return <p style={{ color: "red" }}>{error}</p>;
  //   if (!floodData) return <p>Loading...</p>;
  
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

      {floodData.map((f, i) => (
        <div className="contentPage"  key={f.id}>
          <h4>พื้นที่ที่ {i + 1}</h4>
          <p>จังหวัด: {f.properties.pv_tn}</p>
          <p>อำเภอ: {f.properties.ap_tn}</p>
          <p>ตำบล: {f.properties.tb_tn}</p>
           <p>ตำบล: {f.properties.tb_en}</p>
          <p>ภูมิภาค: {f.properties.region}</p>
          <p>พื้นที่น้ำท่วม (ตร.ม.): {f.properties._area.toFixed(2)}</p>
          <p>
            วันที่ตรวจพบ:{" "}
            {new Date(f.properties._createdAt).toLocaleString("th-TH")}
          </p>
          <p>
            <a
              href={`https://www.google.com/maps/search/${f.geometry.coordinates[0][0][0][1]},${f.geometry.coordinates[0][0][0][0]}?sa=X&ved=1t:242&ictx=111`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ดูบนแผนที่ Google Maps  
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}

export default FloodPage30day;
