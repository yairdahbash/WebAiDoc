"use client";

import { useRouter } from "next/navigation";

export default function PayPage() {
  const router = useRouter();

  function fakePay() {
    localStorage.setItem("paid", "true");
    router.push("/");
  }

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          padding: "28px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "10px",
            color: "#1a2540",
            fontWeight: 800,
          }}
        >
          תשלום
        </h1>

        <p
          style={{
            color: "#6b7a99",
            fontSize: "15px",
            lineHeight: 1.8,
            marginBottom: "22px",
          }}
        >
          זהו כרגע מסך תשלום לדמו בלבד. בלחיצה על הכפתור למטה,
          המסמך המלא ייפתח כאילו בוצע תשלום.
        </p>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "18px",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "14px", color: "#6b7a99", marginBottom: "6px" }}>
            סכום לתשלום
          </div>
          <div style={{ fontSize: "30px", fontWeight: 800, color: "#1e3a6e" }}>
            ₪19
          </div>
        </div>

        <button
          onClick={fakePay}
          style={{
            width: "100%",
            background: "linear-gradient(135deg,#1e3a6e,#2a7ae2)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          שלם עכשיו (דמו)
        </button>

        <button
          onClick={() => router.push("/")}
          style={{
            width: "100%",
            background: "#fff",
            color: "#6b7a99",
            border: "1px solid #d8e2f0",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          חזרה לאתר
        </button>
      </div>
    </div>
  );
}