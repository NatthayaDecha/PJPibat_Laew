import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Flood.css";

interface FloodFeature {
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
    ap_en: string;
    ap_idn: number;
    ap_tn: string;
    pv_en: string;
    pv_idn: number;
    pv_tn: string;
    region: string;
    tb_en: string;
    tb_idn: number;
    tb_tn: string;
  };
}

const getAlertIcon = (area: number): string => {
  if (area > 100000) {
    return "🛑 ระดับอันตรายสูง";
  }
  if (area > 10000) {
    return "⚠️ ระดับเฝ้าระวัง";
  }
  return "✅ ระดับปกติ";
};

function FloodPage30day() {
  const [floodData, setFloodData] = useState<FloodFeature[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับสถานะ loading
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

  const [selectedProvinceIdn, setSelectedProvinceIdn] = useState<string>("10");

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProvinceIdn(event.target.value);
    console.log(event.target.value);
  };
  useEffect(() => {
    const fetchFloodData = async () => {

      setLoading(true);
      setFloodData([]); // ล้างข้อมูลเก่าก่อน

      setError(""); // ล้าง error เก่า

      try {
        const response = await axios.get(
          "https://api-gateway.gistda.or.th/api/2.0/resources/features/flood/30days?limit=5000&offset=0&pv_idn=" +
            selectedProvinceIdn,

          {
            headers: {
              accept: "application/json",

              "API-Key":
                "ne87zBRj82586Rybub6iIwo5jVNxgE9JZ3MXMENDLOsgPXfqj96WbuX7dBvspfeY",
            },
          }
        );

        if (response.data && Array.isArray(response.data.features)) {
          setFloodData(response.data.features);
        } else {
          setFloodData([]); // ถ้าไม่มีข้อมูล features ให้ตั้งเป็นอาร์เรย์ว่าง
        }
      } catch (err) {
        console.error("Error fetching flood data:", err);
        setError("ไม่สามารถดึงข้อมูลน้ำท่วมได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    };

    fetchFloodData();
  }, [selectedProvinceIdn]);

  return (
    <div className="floodPage">

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
      {/* การ์ดข้อมูลน้ำท่วม */}
      <div className="contentGrid">
        {error && (
          <p
            style={{ color: "red", gridColumn: "1 / -1", textAlign: "center" }}
          >
            {error}
          </p>
        )}

        {loading ? (
          <div className="loading-message">
            <div className="spinner"></div>
            <h2>กำลังโหลดข้อมูล...</h2>
            <p>กรุณารอสักครู่</p>
          </div>
        ) : floodData.length === 0 && !error ? ( // แสดงเมื่อโหลดเสร็จ ไม่มี error และไม่มีข้อมูล
          <div className="no-data-message">
            <h2>💧 ยังไม่มีเหตุการณ์น้ำท่วมที่ตรวจพบ</h2>
            <p>
              ในพื้นที่ **
              {provinces.find((p) => p.idn === selectedProvinceIdn)?.name ||
                "จังหวัดที่เลือก"}
              ** ในช่วงวันที่ผ่านมา30วัน
            </p>
            <p>กรุณาตรวจสอบจังหวัดอื่น ๆ หรือรอติดตามข้อมูลอยู่ตลอดเวลา</p>
          </div>
        ) : (
          // แสดงข้อมูลปกติเมื่อมีข้อมูล
          floodData.map((f, i) => {
            const createdAt = new Date(f.properties._createdAt);

            const alertMessage = getAlertIcon(f.properties._area);

            return (
              <div className="contentPage pretty-card" key={f.id}>
                {/* แถบแจ้งเตือนภัย */}

                <div
                  className={`alert-indicator ${
                    alertMessage.includes("🛑")
                      ? "high-alert"
                      : alertMessage.includes("⚠️")
                      ? "medium-alert"
                      : "no-alert"
                  }`}
                >
                  {alertMessage}
                </div>

                {/* สิ้นสุดแถบแจ้งเตือนภัย */}
                <div className="card-index">
                  <span>{i + 1}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">🏛️</span>
                  <span className="info-label">จังหวัด: </span>
                  <span className="info-value">{f.properties.pv_tn}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📍</span>
                  <span className="info-label">อำเภอ:</span>
                  <span className="info-value">{f.properties.ap_tn}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">🏘️</span>
                  <span className="info-label">ตำบล: </span>
                  <span className="info-value">{f.properties.tb_tn}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">🧭</span>
                  <span className="info-label">ภูมิภาค: </span>
                  <span className="info-value">{f.properties.region}</span>
                </div>
                <div className="info-row highlight-row">
                  <span className="info-icon">📏</span>
                  <span className="info-label">พื้นที่น้ำท่วม: </span>
                  <span className="info-value highlight-value">
                    {f.properties._area.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    ตร.ม.
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📅</span>
                  <span className="info-label">วันที่ตรวจพบ: </span>
                  <span className="info-value">
                    {createdAt.toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-icon">⏰</span>
                  <span className="info-label">เวลาที่ตรวจพบ: </span>
                  <span className="info-value">
                    {createdAt.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
                <div className="info-row map-row">
                  <a
                    className="map-button"
                    href={`https://www.google.com/maps/search/${f.geometry.coordinates[0][0][0][1]},${f.geometry.coordinates[0][0][0][0]}?sa=X&ved=1t:242&ictx=111`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🗺️ ดูบนแผนที่ Google Maps
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default FloodPage30day;
