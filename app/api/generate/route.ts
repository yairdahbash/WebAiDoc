import { NextResponse } from "next/server";

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rewriteStory(text: string) {
  const clean = (text || "").trim();
  if (!clean) return "לא נמסר פירוט מלא של נסיבות המקרה.";

  const variants = [
    `אבקש להביא לידיעתכם כי ${clean}, דבר אשר מצריך את בחינת הנושא ומתן מענה הולם.`,
    `הריני לפנות אליכם בעקבות כך ש-${clean}, ועל כן נדרש טיפול ענייני במקרה.`,
    `בהמשך למקרה בו ${clean}, אבקש את התייחסותכם ואת בחינת הנושא מחדש.`,
    `אירע מקרה בו ${clean}, ולפיכך אבקש לבחון את העניין באופן יסודי ומעמיק.`,
  ];

  return pickRandom(variants);
}

function rewriteFacts(text: string) {
  const clean = (text || "").trim();
  if (!clean) return "לא צוינו פרטים נוספים מעבר לעובדות שתוארו לעיל.";

  const variants = [
    `להלן העובדות הרלוונטיות למקרה: ${clean}.`,
    `הפרטים המרכזיים הידועים לי נכון לעת הזו הינם: ${clean}.`,
    `אבקש להדגיש את הנתונים הבאים לצורך בחינת המקרה: ${clean}.`,
  ];

  return pickRandom(variants);
}

export async function POST(req: Request) {
  try {
    console.log("API_GENERATE_HIT");

    const body = await req.json();

    const docTypeMap: Record<string, string> = {
      appeal: "ערעור",
      request: "בקשה",
      complaint: "תלונה",
      official: "פנייה רשמית",
      custom: "מכתב חופשי",
    };

    const goal = (body.goal || "בקשה").trim();
    const recipient = (body.recipient || "הגורם הרלוונטי").trim();
    const fullName = (body.fullName || "שם הפונה").trim();
    const email = (body.email || "").trim();
    const docType = docTypeMap[body.docType] || "פנייה רשמית";

    const subjectOptions = [
      `הנדון: ${docType} בנושא ${goal}`,
      `הנדון: פנייה בעניין ${goal}`,
      `הנדון: ${docType} ל-${recipient}`,
      `הנדון: בקשה לטיפול בנושא ${goal}`,
    ];

    const openingOptions = [
      `אני פונה אליכם בזאת בנושא ${goal}.`,
      `ברצוני להביא בפניכם פנייה בעניין ${goal}.`,
      `אבקש את התייחסותכם הרשמית והעניינית לנושא ${goal}.`,
      `הנדון שלהלן נכתב לצורך טיפול במקרה הקשור ל-${goal}.`,
    ];

    const middleOptions = [
      `בהתאם לנסיבות המתוארות, אבקש לבחון את המקרה לעומקו ולתת לו מענה הולם.`,
      `לאור פרטי המקרה, אני סבור כי יש מקום לבדיקה מחודשת ולהפעלת שיקול דעת נוסף.`,
      `אבקש כי פנייתי תיבחן באופן יסודי, תוך מתן משקל לעובדות ולמידע הרלוונטי.`,
      `לנוכח הנתונים שהוצגו, אבקש לשקול מחדש את ההחלטה או את אופן הטיפול במקרה.`,
    ];

    const closingOptions = [
      `לאור האמור, אבקש את טיפולכם בהקדם האפשרי ואת מסירת תשובתכם בכתב.`,
      `אודה לבחינת פנייתי ולמענה מסודר מצדכם בהקדם האפשרי.`,
      `אשמח לקבל את תשובתכם בהקדם ולדעת כיצד בכוונתכם לפעול בנושא.`,
      `אבקש את התייחסותכם ואת טיפולכם במקרה ללא דיחוי מיותר.`,
    ];

    const subject = pickRandom(subjectOptions);
    const opening = pickRandom(openingOptions);
    const middle = pickRandom(middleOptions);
    const closing = pickRandom(closingOptions);

    const story = rewriteStory(body.story || "");
    const facts = rewriteFacts(body.facts || "");

    const result = `${subject}

לכבוד
${recipient}

שלום רב,

${opening}

${story}

${facts}

${middle}

${closing}

${email ? `ליצירת קשר: ${email}\n` : ""}בכבוד רב,

${fullName}`;

    console.log("DOCUMENT_CREATED", {
      recipient,
      goal,
      docType,
      time: new Date().toISOString(),
    });

    return NextResponse.json({
      full: result,
    });
  } catch (error) {
    console.error("GENERATE_ERROR", error);

    return NextResponse.json(
      { error: "שגיאה ביצירת המסמך" },
      { status: 500 }
    );
  }
}