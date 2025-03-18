import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import LayoutComponent from "../components/Layout";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Ebook.css";

const PrinterEbook = () => {
  const pages = [
    "📖 หน้าที่ 1: แนะนำคู่มือการใช้งานเครื่องปริ้น\n\nคู่มือนี้จะช่วยให้คุณเข้าใจการใช้งานเครื่องปริ้น 2 รุ่นของบริษัท Turbo Finance Co., Ltd. พร้อมทั้งข้อดี-ข้อเสีย, วิธีการแก้ปัญหาต่างๆ และการดูแลรักษาเครื่องปริ้น",
    "💡 หน้าที่ 2: รุ่นที่ 1 ของเครื่องปริ้น\n\n- ข้อดี: ประหยัดพลังงาน, ความเร็วในการพิมพ์สูง\n- ข้อเสีย: เสียงดังระหว่างการทำงาน\n\nรายละเอียดเพิ่มเติมเกี่ยวกับวิธีการใช้งานและข้อจำกัดของรุ่นนี้",
    "🔧 หน้าที่ 3: รุ่นที่ 2 ของเครื่องปริ้น\n\n- ข้อดี: ประสิทธิภาพสูง, รองรับการพิมพ์หลายฟังก์ชัน\n- ข้อเสีย: ใช้หมึกเร็ว\n\nคำแนะนำในการเลือกใช้งานและการปรับตั้งค่า",
    "⚙️ หน้าที่ 4: รุ่นที่ 3 ของเครื่องปริ้น\n\n- ข้อดี: คุณภาพการพิมพ์เยี่ยม, เหมาะสำหรับพิมพ์สี\n- ข้อเสีย: ขนาดใหญ่, ราคาสูง\n\nการใช้งานและการแก้ไขปัญหาทั่วไป",
    "🖨️ หน้าที่ 5: วิธีการเปลี่ยนหมึก\n\n1. เปิดฝาครอบเครื่องปริ้น\n2. ถอดตลับหมึกที่หมดแล้ว\n3. ใส่ตลับหมึกใหม่ที่ตรงรุ่น\n4. ปิดฝาครอบและทดสอบการพิมพ์",
    "🔌 หน้าที่ 6: วิธีการเชื่อมต่อเครื่องปริ้นกับโน้ตบุ๊ค\n\n1. เชื่อมต่อผ่าน USB หรือ Wi-Fi\n2. ดาวน์โหลดและติดตั้งไดรเวอร์จากเว็บไซต์ของผู้ผลิต\n3. ตั้งค่าเครื่องปริ้นในระบบ Windows หรือ macOS",
    "🔍 หน้าที่ 7: โครงสร้างภายในเครื่องปริ้น\n\n- ส่วนของการพิมพ์\n- กลไกการส่งกระดาษ\n- ระบบการเชื่อมต่อ\n\nคำอธิบายเกี่ยวกับการทำงานภายในของเครื่องปริ้นและการตรวจสอบปัญหาที่อาจเกิดขึ้น",
    "🛠️ หน้าที่ 8: การแก้ปัญหากระดาษติด\n\n1. เปิดฝาเครื่องและตรวจสอบการติดขัดของกระดาษ\n2. หากกระดาษติดให้ดึงออกอย่างระมัดระวัง\n3. ทำความสะอาดตัวเครื่องเพื่อป้องกันปัญหากระดาษติดในอนาคต",
    "🧹 หน้าที่ 9: การล้างหัวหมึก\n\n1. ใช้ผ้าชุบน้ำหมาดๆ เช็ดหัวหมึกเบาๆ\n2. ตรวจสอบว่าหัวหมึกไม่มีรอยเปื้อนหรือฝุ่น\n3. ทดสอบการพิมพ์หลังจากทำความสะอาดแล้ว",
    "⚠️ หน้าที่ 10: ปัญหาปริ้นแล้วเป็นเส้น\n\n1. ตรวจสอบว่าหมึกไม่แห้งหรือหมด\n2. ล้างหัวพิมพ์หรือปรับปรุงคุณภาพการพิมพ์ในตัวเลือกการตั้งค่า\n3. หากยังมีปัญหา, ติดต่อฝ่ายบริการลูกค้าสำหรับการซ่อมแซมหรือเปลี่ยนอะไหล่"
  ];
  

  const flipbookRef = useRef();

  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    if (!flipbookRef.current) {
      console.error("flipbookRef.current เป็น null หรือ undefined");
      return;
    }

    const book = flipbookRef.current.pageFlip();

    for (let i = 0; i < pages.length; i++) {
      book.turnToPage(i);
      await new Promise((r) => setTimeout(r, 100)); // รอให้หน้าโหลดเสร็จ

      const page = book.getPage(i);
      if (!page || !page.element) {
        console.error(`ไม่พบองค์ประกอบของหน้าที่ ${i + 1}`);
        continue;
      }

      const canvas = await html2canvas(page.element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    }

    pdf.save("Printer_Manual.pdf");
  };

  return (
    <LayoutComponent>
      <div className="ebook-container">
        <button className="download-btn" onClick={downloadPDF}>
          📥 Download PDF
        </button>

        <HTMLFlipBook width={400} height={600} className="flipbook" ref={flipbookRef}>
          {pages.map((content, index) => (
            <div key={index} className="page">
              <h2>{content}</h2>
              <p>เนื้อหาของหน้า {index + 1}</p>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </LayoutComponent>
  );
};

export default PrinterEbook;
