import React, { useEffect, useState } from "react";
import axios from "axios";

export interface FloodFeature {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][][];
  };
  properties: {
    _area: number;
    _createdAt: string;
    _createdBy: string;
    _id: string;
    _updatedAt: string;
    _updatedBy: string;
    ap_en: string;
    ap_idn: number;
    ap_tn: string;
    building: number;
    building_2: number;
    cassava_area: number | null;
    cassava_area_2: number | null;
    f_area: number;
    file_name: string;
    h3_address: string;
    hospital: number;
    length_road: number;
    maize_area: number | null;
    maize_area_2: number | null;
    mongo_id: string;
    population: number;
    population_2: number;
    pv_en: string;
    pv_idn: number;
    pv_tn: string;
    re_royin: string;
    region: string;
    rice_area: number;
    rice_area_2: number;
    school: number;
    sugarcane_area: number | null;
    sugarcane_area_2: number | null;
    tb_en: string;
    tb_idn: number;
    tb_tn: string;
  };
}

export interface FloodResponse {
  type: string;
  numberMatched: number;
  numberReturned: number;
  timeStamp: string;
  features: FloodFeature[];
  links: {
    href: string;
    rel: string;
    title?: string;
    type?: string;
  }[];
}
export default function FloodPage() {
  //ตัวแปร
  const [floodData, setFloodData] = useState<FloodFeature[]>([]);
  const [error, setError] = useState("");
  const provinces = [
  { idn: "14", name: "พระนครศรีอยุธยา (อยุธยา)" },
  { idn: "15", name: "อ่างทอง" },
  { idn: "16", name: "ลบบุรี" },
  { idn: "17", name: "สิงห์บุรี" },
  {idn:"18",name:"ชัยนาท"},
  {idn: "19", name: "สระบุรี" },
  {idn:"21",name:"ระยอง"}
];
const [selectedProvinceIdn, setSelectedProvinceIdn] = useState<string>("14");
const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvinceIdn(event.target.value);
    console.log(event.target.value);
  };


  useEffect(() => {
    const fetchFloodData = async () => {
      try {
        setFloodData([]);
        const response = await axios.get(
          "https://api-gateway.gistda.or.th/api/2.0/resources/features/flood/30days?limit=&offset=0&pv_idn="+selectedProvinceIdn,
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
    <div style={{ padding: "20px" }}>
      <select
        id="province-select"
        value={selectedProvinceIdn} // กำหนดค่าที่ถูกเลือกจาก state
        onChange={handleProvinceChange} // เรียกฟังก์ชันเมื่อมีการเปลี่ยนแปลง
        style={{ padding: "10px", marginBottom: "20px", borderRadius: "5px" }}
      >
        {provinces.map((p) => (
          <option key={p.idn} value={p.idn}>
            {p.name}
          </option>
        ))}
      </select>

      {floodData.map((f, i) => (
        <div
          key={f.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h4>พื้นที่ที่ {i + 1}</h4>
          <p>จังหวัด: {f.properties.pv_tn}</p>
          <p>อำเภอ: {f.properties.ap_tn}</p>
          <p>ตำบล: {f.properties.tb_tn}</p>
          <p>ภูมิภาค: {f.properties.region}</p>
          <p>พื้นที่น้ำท่วม (ตร.ม.): {f.properties._area.toFixed(2)}</p>
          <p>
            วันที่ตรวจพบ:{" "}
            {new Date(f.properties._createdAt).toLocaleString("th-TH")}
          </p>
<p>
  <a href={`https://www.google.com/maps/search/${f.geometry.coordinates[0][0][0][1]},${f.geometry.coordinates[0][0][0][0]}?sa=X&ved=1t:242&ictx=111`} target="_blank" rel="noopener noreferrer">
    ดูบนแผนที่ Google Maps
  </a> 
</p>        </div>
      ))}
    </div>
  );
  
}
