import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import LayoutComponent from "../components/Layout";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Ebook.css";

const NotebookEbook = () => {
  const pages = [
    {
      title: "📖 หน้าที่ 1: แนะนำคู่มือการใช้งานโน้ตบุ๊ค",
      content: "คู่มือนี้จะช่วยให้คุณเข้าใจขั้นตอนสำคัญในการตั้งค่าและดูแลโน้ตบุ๊คของคุณ",
      imageSrc: "path/to/image1.png", // แทนที่ด้วย URL รูปภาพจริง
    },
    {
      title: "💾 หน้าที่ 2: วิธีติดตั้ง Windows",
      content: "1. ใส่ USB หรือแผ่นติดตั้ง Windows\n2. รีสตาร์ทเครื่องและบูตจาก USB\n3. ทำตามขั้นตอนการติดตั้งจนเสร็จสิ้น",
      imageSrc: "path/to/image2.png",
    },
    {
      title: "🌐 หน้าที่ 3: การเข้าร่วมโดเมน (Join Domain)",
      content: "1. เปิด Settings > System > About\n2. เลือก ‘Join a domain’ และป้อนข้อมูลที่จำเป็น",
      imageSrc: "path/to/image3.png",
    },
    {
      title: "🈸 หน้าที่ 4: การตั้งค่าภาษา (Language Settings)",
      content: "1. ไปที่ Settings > Time & Language\n2. เพิ่มหรือลบภาษาที่ต้องการ\n3. ตั้งค่าภาษาเริ่มต้น",
      imageSrc: "path/to/image4.png",
    },
    {
      title: "⏰ หน้าที่ 5: การตั้งค่าเวลา (Time Adjustment)",
      content: "1. ไปที่ Settings > Time & Language > Date & Time\n2. เปิด 'Set time automatically' หรือกำหนดเอง",
      imageSrc: "path/to/image5.png",
    },
    {
      title: "📦 หน้าที่ 6: การติดตั้งแอพเริ่มต้น (Initial App Installation)",
      content: "- Microsoft Office\n- Google Chrome\n- โปรแกรมสำคัญของบริษัท",
      imageSrc: "path/to/image6.png",
    },
    {
      title: "⚙️ หน้าที่ 7: การตั้งค่าตามนโยบายของ Turbo Finance",
      content: "1. ตั้งค่าความปลอดภัยและรหัสผ่าน\n2. ติดตั้งซอฟต์แวร์ที่ได้รับอนุญาต\n3. เปิดใช้งาน VPN และไฟร์วอลล์",
      imageSrc: "path/to/image7.png",
    },
    {
      title: "🛡️ หน้าที่ 8: การดูแลความปลอดภัยของโน้ตบุ๊ค",
      content: "- หลีกเลี่ยงการใช้ Wi-Fi สาธารณะ\n- ติดตั้ง Antivirus และอัปเดตเป็นประจำ",
      imageSrc: "path/to/image8.png",
    },
    {
      title: "🧹 หน้าที่ 9: วิธีทำความสะอาดโน้ตบุ๊ค",
      content: "- ใช้ผ้าไมโครไฟเบอร์เช็ดหน้าจอ\n- ใช้ลมเป่าในช่องระบายความร้อน\n- ทำความสะอาดแป้นพิมพ์ด้วยแปรงเล็กๆ",
      imageSrc: "path/to/image9.png",
    },
    {
      title: "📦 หน้าที่ 10: การเก็บรักษาโน้ตบุ๊คในระยะยาว",
      content: "- เก็บในที่แห้งและอุณหภูมิไม่สูงเกินไป\n- ปิดเครื่องหากไม่ได้ใช้เป็นเวลานาน\n- ชาร์จแบตเตอรี่ 50% ก่อนเก็บ",
      imageSrc: "path/to/image10.png",
    },
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

    pdf.save("Notebook_Manual.pdf");
  };

  const turnToPageWithAnimation = (pageIndex) => {
    if (!flipbookRef.current) {
      console.error("flipbookRef.current is null");
      return;
    }

    const book = flipbookRef.current.pageFlip();
    if (book) {
      book.turnToPage(pageIndex);
    } else {
      console.error("Could not access pageFlip instance");
    }
  };

  return (
    <LayoutComponent>
      <div className="ebook-container">
      <div className="sidebar">
          <h3>สารบัญ</h3>
          <ul>
            {pages.map((page, index) => (
              <li key={index}>
                <button
                  onClick={() =>turnToPageWithAnimation(index)}
                >
                  {page.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="content">
          <button className="download-btn" onClick={downloadPDF}>
            📥 Download PDF
          </button>

          <HTMLFlipBook width={400} height={600} className="flipbook" ref={flipbookRef}>
            {pages.map((page, index) => (
              <div key={index} className="page">
                <h2>{page.title}</h2>
                <p>{page.content}</p>
                {page.imageSrc && <img src={page.imageSrc} alt={`Page ${index + 1}`} />}
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default NotebookEbook;
