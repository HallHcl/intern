import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import LayoutComponent from "../components/Layout";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Ebook.css";

const NotebookEbook = () => {
  const pages = [
    {
      title: "💾 หน้าที่ 1: วิธีติดตั้ง Windows",
      content: `1.เสียบ USB Window หรือ Flash Drive เข้า Notebook ที่ต้องการจะลงวิโดว์
      2.รีสตาร์ทเครื่องและบูตจาก USB โดยการกด F10 ที่คีย์บอร์ดสำหรับโน๊ตบุ๊ค hp แล้วหาคำว่า Boot Option แล้วเลือก UEFI ตามด้วยชื่อ Flash Drive
      3.พอถึงหน้า Window Setup ให้เลือกเป็นภาษาอังกฤษให้หมดแล้วกด Next 
      4.หน้า Activate windows ให้กด I don't have a product key 
      5.ถึงหน้าเลือกเวอร์ชั่นวินโดว์ให้เลือเป็นตัว Pro (ไม่ว่าจะเป็น Window 10 หรือ Window 11) 
      6.การแบ่ง Partition ให้ลบทั้งหมด ให้เหลือ Drive เดียว แล้วกด Next`,
      imageSrc: "path/to/image2.png",
    },
    {
      title: "💾 หน้าที่ 2: วิธีติดตั้ง Windows",
      content: `7.พอถึงหัวข้อ Is this the right country or region ให้เลือก Thailand
      8.หัวข้อ Is this the right keyboard layout or input method ให้เลือก US แล้วกด Yes
      9.ให้กด เลือก Add layout แล้วเลือก Thailand ครั้งแรก แล้วเลือก Thai Kedmanee ครั้งที่สอง
      10.หัวข้อ Let's name your PC ให้ตั้งชื่อจริงและนามสกุล3ตัว เช่น chaiwat.suk
      11.หัวข้อ Privacy ให้เลือกแล้วแต่User`,
      imageSrc: "path/to/image2.png",
    },
    {
      title: "🌐 หน้าที่ 3: การเข้าร่วมโดเมน (Join Domain)",
      content: `1.ไปที่ช่อง Search แล้วเขียนคำว่า this pc จากนั้นคลิกขวาแล้วไปที่ Properties หรือไปที่ Setting > System > About
      2.กดไปที่หัวข้อ Rename this PC (Advanced)
      3.หัวข้อ Computer name ให้ใส่ชื่อ asset เครื่อง
      4.หัวข้อ Member of ให้เปลี่ยนเป็น Domain จากตอนแรกเป็น Workgroup แล้วใส่ Domain ของบริษัทลงไป`,
      imageSrc: "path/to/image3.png",
    },
    {
      title: "🈸 หน้าที่ 4: การตั้งค่าภาษา (Language Settings)",
      content: `สำหรับคนที่ต้องการเปลี่ยนภาษา Window
      1.ไปที่ช่อง Search แล้วพิมว่า Language Settings หรือไปที่ Setting > Time & Language
      2.ไปที่หัวข้อ Language แล้วหาหัวข้อที่ชื่อว่า Window Display Language แล้วเลือกภาษาที่ต้องการ
      สำหรับคนที่ต้องการให้คีย์บอร์ดเปลี่ยนภาษาได้
      1.ไปที่ช่อง Search แล้วพิมว่า Language Settings หรือไปที่ Setting > Time & Language
      2.ไปที่หัวข้อ Language แล้วหาคำว่า Spelling, typing, & keyboard settings
      3.หาหัวข้อ Advanced keyboard settings แล้วไปที่ Input language hot keys
      4.กดปุ่ม Change Key Sequence
      5.หัวข้อ Switch Input Language ให้เลือก Grave Accent (*)
      6.หัวข้อ Switch Keyboard Layout ให้เลือก Not Assigned`,
      imageSrc: "path/to/image4.png",
    },
    {
      title: "⏰ หน้าที่ 5: การตั้งค่าเวลา (Time Adjustment)",
      content: `1.คลิกขวาที่ นาฬิกา ด้านขวาล่างของหน้าจอ แล้วคลิก Adjust date/time หรือไปที่ Setting > Time & Language
      2.ให้ติ้กที่ Set Time Automatically
      3.หาหัวข้อ Time Zone แล้วเลือก Bangkok,Hanoi,Jarkarta`,
      imageSrc: "path/to/image5.png",
    },
    {
      title: "📦 หน้าที่ 6: การติดตั้งแอพเริ่มต้น (Initial App Installation)",
      content: `1.ไปที่ช่อง Search แล้วพิมคำว่า Default Apps
      2.หาคำว่า Web Browser ให้เปลี่ยน Microsoft Edge เป็น Google Chrome`,
      imageSrc: "path/to/image6.png",
    },
    {
      title: "⚙️ หน้าที่ 7: การตั้งค่าตามนโยบายของ Turbo Finance",
      content: "1. ตั้งค่าความปลอดภัยและรหัสผ่าน\n2. ติดตั้งซอฟต์แวร์ที่ได้รับอนุญาต\n3. เปิดใช้งาน VPN และไฟร์วอลล์",
      imageSrc: "path/to/image7.png",
    },
    {
      title: "🛡️ หน้าที่ 8: การดูแลความปลอดภัยของโน้ตบุ๊ค",
      content: `1.เก็บให้ปลอดภัย: อย่าทิ้งโน้ตบุ๊คไว้ในรถหรือสถานที่เสี่ยงต่อการถูกขโมย
      2.ตั้งรหัสผ่าน: ใช้รหัสผ่านที่คาดเดายาก และเปิดใช้งานการล็อกอินอัตโนมัติ
      3.ติดตั้ง Antivirus และ Firewall: ใช้ซอฟต์แวร์ป้องกันไวรัสที่เชื่อถือได้ เช่น Windows Defender
      4.อัปเดตซอฟต์แวร์สม่ำเสมอ: อัปเดตระบบปฏิบัติการและโปรแกรมต่าง ๆ เพื่อลดช่องโหว่
      5.อย่าคลิกลิงก์หรือดาวน์โหลดไฟล์ที่ไม่รู้จัก: ระวังอีเมลหลอกลวง (Phishing)`,
      imageSrc: "path/to/image8.png",
    },
    {
      title: "🧹 หน้าที่ 9: การบำรุงรักษาเพื่อความปลอดภัยและยืดอายุการใช้งาน",
      content: `1.ทำความสะอาดเครื่องและช่องระบายอากาศ: ป้องกันความร้อนสะสม
      2.ใช้กระเป๋าหรือเคสกันกระแทก: ลดความเสียหายจากการตกหล่น
      3.หลีกเลี่ยงการใช้บนเตียงหรือพื้นผ้านุ่ม ๆ: ช่วยป้องกันการอุดตันของระบบระบายความร้อน`,
      imageSrc: "path/to/image9.png",
    },
    {
      title: "📦 หน้าที่ 10: การเก็บรักษาโน้ตบุ๊คในระยะยาว",
      content: `1.ชาร์จแบตเตอรี่ให้อยู่ที่ 50-60% ก่อนเก็บ: การเก็บแบตเตอรี่ที่เต็ม 100% หรือเหลือน้อยเกินไปอาจทำให้เสื่อมเร็ว
      2.หลีกเลี่ยงการเก็บในที่ร้อนหรือเย็นเกินไป: อุณหภูมิที่เหมาะสมคือ 15-25°C
      3.ใช้ซองหรือกล่องปิดสนิท: ป้องกันฝุ่นและแมลงเข้าไปในพอร์ตหรือช่องระบายอากาศ
      4.อย่าวางโน้ตบุ๊คบนพื้นโดยตรง: ควรเก็บไว้บนชั้นหรือโต๊ะที่สะอาด
      5.สำรองข้อมูลก่อนเก็บ: คัดลอกไฟล์สำคัญลง External Hard Drive หรือ Cloud
      6.อัปเดตระบบและซอฟต์แวร์ก่อนเก็บ: ป้องกันปัญหาซอฟต์แวร์ล้าสมัยเมื่อนำกลับมาใช้งาน
      7.อย่าเก็บในที่มีแม่เหล็กแรงสูง: เช่น ใกล้ลำโพงขนาดใหญ่ หรือมอเตอร์ไฟฟ้า
      8.เสียบชาร์จแบตเตอรี่ก่อนใช้งาน: หากเก็บไว้นาน อาจต้องปล่อยให้ชาร์จทิ้งไว้ 30-60 นาที
      9.อัปเดตซอฟต์แวร์และตรวจสอบไวรัส: เพื่อให้ระบบทันสมัยและปลอดภัย
      10.เก็บในแนวนอน: ป้องกันแรงกดทับที่อาจทำให้หน้าจอหรือบานพับเสียหาย`,
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
