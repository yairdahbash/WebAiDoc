export const metadata = {
  title: "מכתב תלונה לחברת ביטוח | תבנית ודוגמה",
  description:
    "איך לכתוב מכתב תלונה לחברת ביטוח, מה לכלול בפנייה, ודוגמה לנוסח ברור ומקצועי.",
};

export default function InsuranceComplaintLetterPage() {
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
        איך לכתוב מכתב תלונה לחברת ביטוח
      </h1>

      <p style={{ fontSize: "18px", color: "#475569", marginBottom: "26px" }}>
        כאשר יש עיכוב בטיפול, דחייה לא ברורה, חוסר מענה או שירות לקוי מצד חברת
        ביטוח, מכתב תלונה מסודר יכול לעזור לרכז את העובדות ולהציג דרישה ברורה
        לטיפול בנושא.
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
        <p style={{ margin: 0, fontWeight: 700 }}>רוצים נוסח מוכן?</p>
        <p style={{ marginTop: "8px", marginBottom: "14px", color: "#334155" }}>
          אפשר ליצור מכתב תלונה לחברת ביטוח תוך פחות מדקה.
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
          צור מכתב עכשיו
        </a>
      </div>

      <h2 style={{ fontSize: "28px", marginBottom: "10px", fontWeight: 800 }}>
        מתי כדאי לשלוח תלונה?
      </h2>
      <ul style={{ paddingRight: "22px", marginBottom: "24px" }}>
        <li>כאשר לא קיבלתם מענה במשך זמן ממושך</li>
        <li>כאשר התביעה או הבקשה נדחתה ללא הסבר מספק</li>
        <li>כאשר נמסר מידע סותר</li>
        <li>כאשר יש תחושה שהטיפול בעניינכם לא היה תקין</li>
      </ul>

      <h2 style={{ fontSize: "28px", marginBottom: "10px", fontWeight: 800 }}>
        מה חשוב לכלול במכתב?
      </h2>
      <ul style={{ paddingRight: "22px", marginBottom: "24px" }}>
        <li>פרטי הפוליסה או מספר תביעה, אם יש</li>
        <li>תיאור תמציתי של מה שקרה</li>
        <li>תאריכים חשובים</li>
        <li>מה בדיוק חסר או מה לא טופל כראוי</li>
        <li>מה אתם דורשים עכשיו מחברת הביטוח</li>
      </ul>

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
{`לכבוד חברת הביטוח,

הנדון: תלונה על אופן הטיפול בענייני

שלום רב,

אני פונה אליכם על מנת להביא לידיעתכם את חוסר שביעות רצוני מאופן הטיפול בענייני, ובפרט בכל הנוגע למענה שניתן לי עד כה.

למיטב הבנתי, לא ניתן מענה מלא וברור לפנייתי, ולפיכך אבקש לבחון מחדש את המקרה ולמסור לי תשובה מסודרת בכתב.

אבקש כי נושא זה יטופל בהקדם האפשרי, תוך מתן התייחסות עניינית לפרטים שהועברו.

בכבוד רב,
שם מלא`}
      </div>

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
          רוצים מכתב תלונה ברור ורשמי?
        </h2>
        <p style={{ color: "#cbd5e1", marginBottom: "18px", fontSize: "17px" }}>
          מלאו כמה פרטים וקבלו נוסח מוכן לשליחה.
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
          צור מכתב לחברת ביטוח
        </a>
      </div>
    </main>
  );
}