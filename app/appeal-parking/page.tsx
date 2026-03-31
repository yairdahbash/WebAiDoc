export default function Page() {
  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto", direction: "rtl", fontFamily: "Arial" }}>
      
      <h1>ערעור על קנס חניה — תבנית מוכנה</h1>

      <p>
        קיבלת קנס חניה ואתה רוצה לערער?  
        כאן תוכל ליצור מכתב ערעור מקצועי תוך פחות מדקה.
      </p>

      <h2>איך זה עובד?</h2>
      <ul>
        <li>ממלאים פרטים בסיסיים</li>
        <li>המערכת יוצרת מכתב מקצועי</li>
        <li>שולחים לעירייה</li>
      </ul>

      <a href="/" style={{
        display: "inline-block",
        marginTop: "20px",
        padding: "12px 20px",
        background: "#1e3a6e",
        color: "#fff",
        borderRadius: "8px",
        textDecoration: "none"
      }}>
        צור ערעור עכשיו →
      </a>

    </div>
  );
}