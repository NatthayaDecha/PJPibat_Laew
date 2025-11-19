import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Fire.css"; 

interface FireFeature {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][][];
  };
  properties: {
    _id: string;
    bright_ti4: number; // อุณหภูมิในหน่วย Kelvin
    ap_en: string;
    ap_tn: string; // อำเภอ (ไทย)
    latitude: number;
    longitude: number;
    pv_code: number;
    pv_en: string;
    pv_idn: string;
    pv_tn: string; // จังหวัด (ไทย)
    ct_tn: string; // เขต/ภาค
    re_royin: string; // ภูมิภาค
    tambol: string;
    tb_en: string;
    tb_tn: string; // ตำบล (ไทย)
    th_date: string; // วันที่ตรวจพบ
    th_time: number; // เวลาตรวจพบ (ไม่ค่อยได้ใช้ในโค้ดนี้)
    village: string;
    linkgmap: string;
  };
}

// ฟังก์ชันแปลง Kelvin เป็น Celsius

const kelvinToCelsius = (k: number) => (k - 273.15).toFixed(1);

// ฟังก์ชันกำหนดระดับความร้อนและการแจ้งเตือน (ล้อตาม Area ของ Flood)

const getAlertLevel = (k: number): { message: string; className: string } => {
  // bright_ti4 (Kelvin) เป็นตัววัดความร้อน

  if (k > 320) {
    return {
      message: "🔥 ร้อนผิดปกติ (มีโอกาสเป็นไฟจริง)",
      className: "fire-high-alert",
    };
  }

  if (k > 310 && k <= 320) {
    return { message: "⚠️ ร้อนมาก (อาจมีการเผา)", className: " fire-medium-alert" };
  }

  return { message: "✅ ปกติ/ความร้อนพื้นผิว", className: "fire-no-alert" };
};

function FirePage7day() {
  const [fireData, setFireData] = useState<FireFeature[]>([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับสถานะ loading

  const provinces = [
    // ... (รายชื่อจังหวัดที่ตัดมาจากโค้ดแม่)

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
    if (!selectedProvinceIdn) return;
    const fetchFireData = async () => {
      // 1. เริ่มโหลด
      setLoading(true);
      setFireData([]); // ล้างข้อมูลเก่าก่อน
      setError(""); // ล้าง error เก่า

      try {
        const response = await axios.get(
          "https://api-gateway.gistda.or.th/api/2.0/resources/features/viirs/7days?limit=100&offset=0&pv_idn=" +
            selectedProvinceIdn,
          {
            headers: {
              accept: "application/json",
              "API-Key":
                "ne87zBRj82586Rybub6iIwo5jVNxgE9JZ3MXMENDLOsgPXfqj96WbuX7dBvspfeY",
            },
          }
        );

        // 2. ตรวจสอบข้อมูลและตั้งค่า
        if (response.data && Array.isArray(response.data.features)) {
          setFireData(response.data.features);
        } else {
          setFireData([]); // ถ้าไม่มีข้อมูล features ให้ตั้งเป็นอาร์เรย์ว่าง
        }
      } catch (err) {
        console.error(err);
        setError("ไม่สามารถดึงข้อมูลไฟป่าได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        // 3. โหลดเสร็จสิ้น

        setLoading(false);
      }
    };
    fetchFireData();
  }, [selectedProvinceIdn]);
  return (
    <div className="fire-page">
      {/* แถบเลือกจังหวัด */}

      <div className="fire-provinceBar">
        <select
          id="province-select"
          className="fire-provinceSelect"
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
      {/* การ์ดข้อมูลไฟป่า*/}
      <div className="fire-contentGrid">
        {error && (
          <p
            style={{ color: "red", gridColumn: "1 / -1", textAlign: "center" }}
          >
            {error}
          </p>
        )}
        {/* 💡 เงื่อนไขการแสดงผล (Loading / No Data / Data) */}
        {loading ? (
          <div className="fire-loading-message">
            <div className="fire-spinner"></div>
            <h2>กำลังโหลดข้อมูล...</h2>
            <p>กรุณารอสักครู่</p>
          </div>
        ) : fireData.length === 0 && !error ? ( // แสดงเมื่อโหลดเสร็จ ไม่มี error และไม่มีข้อมูล
          <div className="fire-no-data-message">
            <h2>🔥 ยังไม่พบจุดความร้อนที่ผิดปกติ</h2>
            <p>
              ในพื้นที่ **
              {provinces.find((p) => p.idn === selectedProvinceIdn)?.name ||
                "จังหวัดที่เลือก"}
              ** ในช่วงวันที่7ผ่านมา
            </p>
            <p>กรุณาตรวจสอบจังหวัดอื่น ๆ หรือรอติดตามข้อมูลอยู่ตลอดเวลา</p>
          </div>
        ) : (
          // แสดงข้อมูลปกติเมื่อมีข้อมูล

          fireData.map((f, i) => {
            const alert = getAlertLevel(f.properties.bright_ti4);
            const celsius = kelvinToCelsius(f.properties.bright_ti4);
            const date = new Date(f.properties.th_date);
            // เนื่องจาก API ให้เวลาเป็นตัวเลข 'th_time' เช่น 1000, 1430 ต้องแปลงเป็น string ก่อน
            const timeString = f.properties.th_time.toString().padStart(4, "0");
            const hours = timeString.substring(0, 2);
            const minutes = timeString.substring(2, 4);
            return (
              <div className="fire-contentPage pretty-card" key={f.id}>
                {/* แถบแจ้งเตือนภัย *********************************** */}
                <div className={`fire-alert-indicator ${alert.className}`}>
                  {alert.message}
                </div>
                {/* สิ้นสุดแถบแจ้งเตือนภัย ****************************** */}
                {/* เลขลำดับในวงกลม */}
                <div className="fire-card-index">
                  <span>{i + 1}</span>
                </div>
                {/* จังหวัด */}
                <div className="fire-info-row">
                  <span className="fire-info-icon">🏛️</span>
                  <span className="fire-info-label">จังหวัด: </span>
                  <span className="fire-info-value">{f.properties.pv_tn}</span>
                </div>
                {/* อำเภอ */}
                  <div className="fire-info-row">
                  <span className="fire-info-icon">📍</span>
                  <span className="fire-info-label">อำเภอ:</span>
                  <span className="fire-info-value">{f.properties.ap_tn}</span>
                </div>
                {/* ตำบล */}
               <div className="fire-info-row">
                  <span className="fire-info-icon">🏘️</span>
                  <span className="fire-info-label">ตำบล: </span>
                  <span className="fire-info-value">{f.properties.tb_tn}</span>
                </div>
                {/* หมู่บ้าน */}
                <div className="fire-info-row">
                  <span className="fire-info-icon">🏡</span>
                  <span className="fire-info-label">หมู่บ้าน: </span>
                  <span className="fire-info-value">
                    {f.properties.village || "ไม่ระบุ"}
                  </span>
                </div>
                {/* อุณหภูมิ (แถวเน้น) */}
                <div className="fire-info-row fire-highlight-row">
                  <span className="fire-info-icon">🌡️</span>
                  <span className="fire-info-label">อุณหภูมิที่ตรวจพบ: </span>
                  <span className="fire-info-value fire-highlight-value">
                    {celsius} °C
                  </span>
                </div>
                {/* วันที่ตรวจพบ (ไทย) */}
                <div className="fire-info-row">
                  <span className="fire-info-icon">📅</span>
                  <span className="fire-info-label">วันที่ตรวจพบ: </span>
                  <span className="fire-info-value">
                    {date.toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* เวลา (ไทย) */}

                <div className="fire-info-row">
                  <span className="fire-info-icon">⏰</span>

                  <span className="fire-info-label">เวลาที่ตรวจพบ: </span>

                  <span className="fire-info-value">
                    {hours}:{minutes} น.
                  </span>
                </div>

                {/* ปุ่มไป Google Maps */}

                <div className="fire-info-row fire-map-row">
                  <a
                    className="fire-map-button"
                    href={f.properties.linkgmap}
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

export default FirePage7day;
