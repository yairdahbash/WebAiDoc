export const metadata = {
  title: "ערעור על קנס חניה | נוסח מוכן ודוגמה",
  description:
    "איך לכתוב ערעור על קנס חניה, מה חשוב לכלול, ודוגמה לנוסח מסודר שאפשר להכין במהירות.",
};

export default function AppealParkingTicketPage() {
  return (
    <main
      dir="rtl"
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "48px 20px 80px",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.9,
        color: "#1a2540",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "18px", fontWeight: 800 }}>
        איך לכתוב ערעור על קנס חניה
      </h1>

      <p style={{ fontSize: "18px", color: "#475569", marginBottom: "26px" }}>
        קיבלתם דוח חניה ואתם חושבים שהוא לא מוצדק? במקרים רבים אפשר להגיש ערעור
        מסודר. ערעור טוב צריך להיות ענייני, קצר, ברור, ולהסביר למה לדעתכם הדוח
        הונפק שלא בצדק.
      </p>

      <div
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "14px",
          padding: "20px",
          marginBottom: "34px",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700 }}>
          רוצים לקצר תהליכים?
        </p>
        <p style={{ marginTop: "8px", marginBottom: "14px", color: "#334155" }}>
          אפשר ליצור נוסח לערעור על קנס חניה תוך פחות מדקה.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            background: "#1e3a6e",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "10px",
            padding: "12px 20px",
            fontWeight: 700,
          }}
        >
          צור ערעור עכשיו
        </a>
      </div>

      <h2 style={{ fontSize: "28px", marginBottom: "10px", fontWeight: 800 }}>
        מתי כדאי להגיש ערעור?
      </h2>
      <ul style={{ paddingRight: "22px", marginBottom: "24px" }}>
        <li>כאשר קיים שילוט מבלבל או לא ברור</li>
        <li>כאשר הרכב לא עמד במקום האסור בפועל</li>
        <li>כאשר מדובר בטעות ברישום פרטי הרכב או המקום</li>
        <li>כאשר יש נסיבות מיוחדות שכדאי לציין</li>
      </ul>

      <h2 style={{ fontSize: "28px", marginBottom: "10px", fontWeight: 800 }}>
        מה חשוב לכתוב בערעור?
      </h2>
      <ul style={{ paddingRight: "22px", marginBottom: "24px" }}>
        <li>מספר הדוח או פרטי הזיהוי</li>
        <li>תאריך ומיקום האירוע</li>
        <li>הסבר עובדתי ברור וקצר</li>
        <li>אם יש — אזכור צילום, מסמך או ראיה רלוונטית</li>
        <li>בקשה ברורה לביטול הדוח או בחינה מחדש</li>
      </ul>

      <h2 style={{ fontSize: "28px", marginBottom: "10px", fontWeight: 800 }}>
        דוגמה קצרה לנוסח ערעור
      </h2>

      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "20px",
          whiteSpace: "pre-wrap",
          marginBottom: "28px",
          fontSize: "16px",
        }}
      >
{`לכבוד הרשות המטפלת,

הנדון: בקשה לבחינה מחדש של דוח חניה

שלום רב,

אני פונה בבקשה לבחון מחדש את הדוח שנרשם לרכבי, מאחר שלדעתי קיימת טעות או נסיבה המצדיקה בדיקה נוספת.

במועד הרלוונטי, הרכב הועמד בהתאם להבנתי לתנאי המקום, ולמצער קיימת אי-בהירות אשר מצדיקה בדיקה מחודשת של נסיבות רישום הדוח.

אבקש כי פנייתי תיבחן באופן ענייני, ובהתאם לכך לשקול את ביטול הדוח או את תיקון ההחלטה.

בכבוד רב,
שם מלא`}
      </div>

      <h2 style={{ fontSize: "28px", marginBottom: "10px", fontWeight: 800 }}>
        טעויות נפוצות בערעור
      </h2>
      <ul style={{ paddingRight: "22px", marginBottom: "28px" }}>
        <li>לכתוב בכעס במקום בעובדות</li>
        <li>לא לציין את מספר הדוח</li>
        <li>לשלוח פנייה כללית מדי</li>
        <li>לא להסביר מה בדיוק מבקשים מהרשות</li>
      </ul>

      <div
        style={{
          background: "#1e293b",
          color: "#fff",
          borderRadius: "16px",
          padding: "28px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "30px", marginBottom: "10px", fontWeight: 800 }}>
          רוצים להגיש ערעור מסודר יותר?
        </h2>
        <p style={{ color: "#cbd5e1", marginBottom: "18px", fontSize: "17px" }}>
          מלאו כמה פרטים וקבלו נוסח ערעור ברור, רשמי ומוכן לשליחה.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            background: "#60a5fa",
            color: "#0f172a",
            textDecoration: "none",
            borderRadius: "10px",
            padding: "13px 22px",
            fontWeight: 800,
          }}
        >
          צור ערעור על קנס חניה
        </a>
      </div>
    </main>
  );
}