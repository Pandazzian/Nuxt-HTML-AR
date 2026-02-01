import { ref, computed } from 'vue';

const currentLanguage = ref('en');
let isInitialized = false;

// Translation data
const translations = {
  en: {
    // Common
    common: {
      locked: 'Locked',
      play: 'Play',
    },
    // Navbar
    navbar: {
      brand: 'BrandName',
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      language: 'Language',
    },
    // Index page
    index: {
      title: 'Level Up Your Web Dev Skills!',
      startButton: 'Start Learning',
      resetExp: 'reset EXP',
    },
    // Game page
    game: {
      lives: 'lives',
      howToPlay: 'How to Play',
      source: 'Source',
      htmlFile: 'HTML file',
      line: 'line',
      prev: 'Prev',
      next: 'Next',
      gotIt: 'Got it',
      gameOver: 'Game Over! Try again?',
      retry: 'Retry',
      quit: 'Quit',
      congratulations: 'Congratulations! You completed the level!',
      endlessMode: 'Endless Mode',
      round: 'Round',
      endlessComplete: 'Endless round {round} complete! +{reward} EXP',
      endlessLocked: 'Complete all levels to unlock Endless Mode.',
      continue: 'Continue',
      understood: 'Understood',
    },
    // Tutorial slides
    tutorials: {
      0: {
        slide1: {
          title: 'Basic HTML Structure',
          body: 'Learn the fundamental building blocks of HTML. You\'ll arrange the <strong>DOCTYPE</strong>, <strong>html</strong>, and closing tags in the correct order.'
        },
        slide2: {
          title: 'How to Play',
          body: 'Drag a tag from the <strong>Source</strong> column on the left and drop it onto the corresponding line in the <strong>HTML file</strong> column on the right. If correct, it will snap into place!'
        },
        slide3: {
          title: 'Tips',
          body: 'Remember: <strong>&lt;!DOCTYPE html&gt;</strong> comes first, then <strong>&lt;html&gt;</strong>, and finally <strong>&lt;/html&gt;</strong> at the end. Pay attention to the hints when you get it wrong!'
        }
      },
      1: {
        slide1: {
          title: 'Adding Head and Body',
          body: 'Now we\'re adding the two main sections of an HTML document: the <strong>&lt;head&gt;</strong> and <strong>&lt;body&gt;</strong> sections.'
        },
        slide2: {
          title: 'Structure Order',
          body: '<strong>&lt;head&gt;</strong> contains metadata and goes right after <strong>&lt;html&gt;</strong>. <strong>&lt;body&gt;</strong> contains all visible content and comes after <strong>&lt;/head&gt;</strong>.'
        },
        slide3: {
          title: 'How to Play',
          body: 'Drag each tag to its correct position. The <strong>Source</strong> column shows all the tags you need. Match them to the lines in the <strong>HTML file</strong> column.'
        }
      },
      2: {
        slide1: {
          title: 'Adding Content to Head',
          body: 'The <strong>&lt;head&gt;</strong> section contains important metadata like the page title, character encoding, and links to stylesheets.'
        },
        slide2: {
          title: 'Key Tags',
          body: 'Learn about <strong>&lt;title&gt;</strong> for the page title, <strong>&lt;meta&gt;</strong> tags for character encoding and viewport settings, and <strong>&lt;link&gt;</strong> for stylesheets.'
        },
        slide3: {
          title: 'Remember',
          body: 'All these tags go inside the <strong>&lt;head&gt;&lt;/head&gt;</strong> section. The user never sees these in the browser tab, except for the title!'
        }
      },
      3: {
        slide1: {
          title: 'Adding Content to Body',
          body: 'The <strong>&lt;body&gt;</strong> section contains all the visible content users see: headings, paragraphs, images, and links.'
        },
        slide2: {
          title: 'Common Tags',
          body: 'Learn about <strong>&lt;h1&gt;</strong> for headings, <strong>&lt;p&gt;</strong> for paragraphs, <strong>&lt;img&gt;</strong> for images, and <strong>&lt;a&gt;</strong> for links.'
        },
        slide3: {
          title: 'Pro Tip',
          body: 'Remember to close your tags! Every opening tag like <strong>&lt;h1&gt;</strong> needs a matching closing tag like <strong>&lt;/h1&gt;</strong>.'
        }
      },
      4: {
        slide1: {
          title: 'Adding Attributes and Styling',
          body: 'HTML elements can have <strong>attributes</strong> that provide additional information or styling. Learn how to use <strong>class</strong>, <strong>id</strong>, <strong>style</strong>, and <strong>target</strong> attributes.'
        },
        slide2: {
          title: 'Attributes',
          body: '<strong>class</strong> is for styling groups of elements, <strong>id</strong> is for unique elements, <strong>style</strong> adds inline CSS, and <strong>target</strong> controls link behavior.'
        },
        slide3: {
          title: 'Example',
          body: 'For instance: <strong>&lt;a href="url" target="_blank"&gt;</strong> opens a link in a new tab. <strong>&lt;img src="image.jpg" alt="description"&gt;</strong> displays an image with alternative text.'
        }
      }
    }
  },
  th: {
    // Common
    common: {
      locked: 'ล็อก',
      play: 'เล่น',
    },
    // Navbar
    navbar: {
      brand: 'ชื่อแบรนด์',
      home: 'หน้าแรก',
      about: 'เกี่ยวกับ',
      services: 'บริการ',
      contact: 'ติดต่อ',
      language: 'ภาษา',
    },
    // Index page
    index: {
      title: 'ยกระดับทักษะHTML!',
      startButton: 'เริ่มเรียน',
      resetExp: 'รีเซ็ต EXP',
    },
    // Game page
    game: {
      lives: 'ชีวิต',
      howToPlay: 'วิธีการเล่น',
      source: 'แหล่งที่มา',
      htmlFile: 'ไฟล์ HTML',
      line: 'บรรทัด',
      prev: 'ก่อนหน้า',
      next: 'ถัดไป',
      gotIt: 'เข้าใจแล้ว',
      gameOver: 'เกมโอเวอร์! ลองอีกครั้ง?',
      retry: 'ลองอีกครั้ง',
      quit: 'ออก',
      congratulations: 'ยินดีด้วย! คุณสิ้นสุดระดับแล้ว!',
      endlessMode: 'โหมดไม่สิ้นสุด',
      round: 'รอบ',
      endlessComplete: 'จบรอบที่ {round} แล้ว! ได้รับ EXP +{reward}',
      endlessLocked: 'เล่นครบทุกระดับเพื่อปลดล็อกโหมดไม่สิ้นสุด',
      continue: 'ดำเนินการต่อ',
      understood: 'เข้าใจแล้ว',
    },
    // Tutorial slides
    tutorials: {
      0: {
        slide1: {
          title: 'โครงสร้าง HTML พื้นฐาน',
          body: 'เรียนรู้การสร้างบล็อกของ HTML พื้นฐาน คุณจะจัดเรียง <strong>DOCTYPE</strong>, <strong>html</strong>, และแท็กปิด ตามลำดับที่ถูกต้อง'
        },
        slide2: {
          title: 'วิธีการเล่น',
          body: 'ลากแท็กจากคอลัมน์ <strong>แหล่งที่มา</strong> ทางด้านซ้ายและวางลงบนบรรทัดที่สอดคล้องในคอลัมน์ <strong>ไฟล์ HTML</strong> ทางด้านขวา หากถูกต้อง มันจะเข้าเป็นตำแหน่ง!'
        },
        slide3: {
          title: 'เคล็ดลับ',
          body: 'จำไว้: <strong>&lt;!DOCTYPE html&gt;</strong> มาก่อน จากนั้น <strong>&lt;html&gt;</strong> และสุดท้าย <strong>&lt;/html&gt;</strong> ที่ส่วนท้าย ให้ความสำคัญกับคำแนะนำเมื่อคุณทำผิด!'
        }
      },
      1: {
        slide1: {
          title: 'การเพิ่มหัว และเนื้อหา',
          body: 'ตอนนี้เรากำลังเพิ่มสองส่วนหลักของเอกสาร HTML: ส่วน <strong>&lt;head&gt;</strong> และส่วน <strong>&lt;body&gt;</strong>'
        },
        slide2: {
          title: 'ลำดับของโครงสร้าง',
          body: '<strong>&lt;head&gt;</strong> มีข้อมูลเมตาและไปหลังจาก <strong>&lt;html&gt;</strong> <strong>&lt;body&gt;</strong> มีเนื้อหาที่มองเห็นได้ทั้งหมดและมาหลังจาก <strong>&lt;/head&gt;</strong>'
        },
        slide3: {
          title: 'วิธีการเล่น',
          body: 'ลากแท็กแต่ละตัวไปยังตำแหน่งที่ถูกต้อง คอลัมน์ <strong>แหล่งที่มา</strong> แสดงแท็กทั้งหมดที่คุณต้องการ จับคู่พวกเขากับบรรทัดในคอลัมน์ <strong>ไฟล์ HTML</strong>'
        }
      },
      2: {
        slide1: {
          title: 'การเพิ่มเนื้อหาให้กับหัว',
          body: 'ส่วน <strong>&lt;head&gt;</strong> มีข้อมูลเมตาสำคัญ เช่น ชื่อหน้า การเข้ารหัสอักขระ และลิงค์ไปยังแผ่นสไตล์'
        },
        slide2: {
          title: 'แท็กหลัก',
          body: 'เรียนรู้เกี่ยวกับ <strong>&lt;title&gt;</strong> สำหรับชื่อหน้า แท็ก <strong>&lt;meta&gt;</strong> สำหรับการเข้ารหัสอักขระและการตั้งค่ามุมมอง และ <strong>&lt;link&gt;</strong> สำหรับแผ่นสไตล์'
        },
        slide3: {
          title: 'จำไว้',
          body: 'แท็กทั้งหมดนี้ไปภายในส่วน <strong>&lt;head&gt;&lt;/head&gt;</strong> ผู้ใช้ไม่เห็นสิ่งเหล่านี้ในแท็บเบราว์เซอร์ ยกเว้นชื่อ!'
        }
      },
      3: {
        slide1: {
          title: 'การเพิ่มเนื้อหาให้กับเนื้อหา',
          body: 'ส่วน <strong>&lt;body&gt;</strong> มีเนื้อหาที่มองเห็นได้ทั้งหมดที่ผู้ใช้เห็น: หัวเรื่อง ย่อหน้า รูปภาพ และลิงก์'
        },
        slide2: {
          title: 'แท็กทั่วไป',
          body: 'เรียนรู้เกี่ยวกับ <strong>&lt;h1&gt;</strong> สำหรับหัวเรื่อง <strong>&lt;p&gt;</strong> สำหรับย่อหน้า <strong>&lt;img&gt;</strong> สำหรับรูปภาพ และ <strong>&lt;a&gt;</strong> สำหรับลิงค์'
        },
        slide3: {
          title: 'เคล็ดลับ',
          body: 'จำไว้: ปิดแท็กของคุณ! แท็กเปิดทุกแท็กเช่น <strong>&lt;h1&gt;</strong> ต้องการแท็กปิดที่ตรงกัน เช่น <strong>&lt;/h1&gt;</strong>'
        }
      },
      4: {
        slide1: {
          title: 'การเพิ่มแอตทริบิวต์และการจัดแบบอักษร',
          body: 'องค์ประกอบ HTML สามารถมี <strong>แอตทริบิวต์</strong> ที่ให้ข้อมูลเพิ่มเติมหรือการจัดแบบอักษร เรียนรู้วิธีการใช้แอตทริบิวต์ <strong>class</strong>, <strong>id</strong>, <strong>style</strong> และ <strong>target</strong>'
        },
        slide2: {
          title: 'แอตทริบิวต์',
          body: '<strong>class</strong> สำหรับการจัดแบบอักษรกลุ่มองค์ประกอบ, <strong>id</strong> สำหรับองค์ประกอบที่ไม่ซ้ำใคร, <strong>style</strong> เพิ่มข้อมูล CSS แบบอินไลน์ และ <strong>target</strong> ควบคุมพฤติกรรมของลิงค์'
        },
        slide3: {
          title: 'ตัวอย่าง',
          body: 'ตัวอย่างเช่น: <strong>&lt;a href="url" target="_blank"&gt;</strong> เปิดลิงค์ในแท็บใหม่ <strong>&lt;img src="image.jpg" alt="description"&gt;</strong> แสดงรูปภาพพร้อมข้อความสำรอง'
        }
      }
    }
  }
};

export const useI18n = () => {
  // Initialize language from localStorage only once
  if (!isInitialized && typeof window !== 'undefined') {
    isInitialized = true;
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'en' || saved === 'th')) {
      currentLanguage.value = saved;
    }
  }
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage.value];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'th') {
      currentLanguage.value = lang;
      localStorage.setItem('language', lang);
    }
  };

  const getLanguage = () => currentLanguage.value;

  return {
    t,
    setLanguage,
    getLanguage,
    currentLanguage: computed(() => currentLanguage.value),
  };
};
