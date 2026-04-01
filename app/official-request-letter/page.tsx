export const metadata = {
  title: "נוסח מכתב בקשה רשמי | תבנית ודוגמה",
  description:
    "איך לכתוב מכתב בקשה רשמי, מה צריך לכלול בו, ודוגמה לנוסח ברור ומקצועי.",
};

export default function OfficialRequestLetterPage() {
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
        איך לכתוב מכתב בקשה רשמי
      </h1>

      <p style={{ fontSize: "18px", color: "#475569", marginBottom: "26px" }}>
        מכתב בקשה רשמי נועד לפנות לגוף ציבורי, חברה, מוסד או רשות באופן ברור,
        מסודר ומקצועי. ככל שהמכתב בנוי טוב יותר, כך קל יותר להבין מה אתם מבקשים
        ומה הרקע לפנייה.
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
        <p style={{ margin: 0, fontWeight: 700 }}>צריכים נוסח מוכן?</p>
        <p style={{ marginTop: "8px", marginBottom: "14px", color: "#334155" }}>
          אפשר ליצור מכתב בקשה רשמי תוך פחות מדקה.
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
        מה צריך להופיע במכתב בקשה?
      </h2>
      <ul style={{ paddingRight: "22px", marginBottom: "24px" }}>
        <li>למי הפנייה מיועדת</li>
        <li>מהי הבקשה המדויקת</li>
        <li>מה הרקע לבקשה</li>
        <li>עובדות או נסיבות רלוונטיות</li>
        <li>בקשה לסיום: מה אתם מבקשים שייעשה</li>
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
{`לכבוד הגורם הרלוונטי,

הנדון: בקשה רשמית

שלום רב,

אני פונה אליכם בבקשה לשקול את פנייתי ולבחון את הנושא המתואר להלן.

אבקש לציין כי הבקשה מבוססת על הנסיבות והעובדות המפורטות, ולפיכך אודה להתייחסות עניינית ומסודרת.

אשמח לקבל את תשובתכם בהקדם האפשרי.

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
          רוצים מכתב בקשה מוכן לשליחה?
        </h2>
        <p style={{ color: "#cbd5e1", marginBottom: "18px", fontSize: "17px" }}>
          מלאו כמה פרטים וקבלו נוסח ברור, רשמי ומהיר.
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
          צור מכתב בקשה רשמי
        </a>
      </div>
    </main>
  );
}