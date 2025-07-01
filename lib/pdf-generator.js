// Enhanced PDF generation with proper formatting
export const generateCertificatePDF = async (resultData, userName) => {
  // Create a more sophisticated certificate layout
  const certificateHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 40px;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          min-height: 100vh;
        }
        
        .certificate {
          max-width: 800px;
          margin: 0 auto;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border: 3px solid ${resultData.score >= 50 ? "#3b82f6" : "#ef4444"};
          border-radius: 20px;
          padding: 60px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }
        
        .certificate::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .content {
          position: relative;
          z-index: 1;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .logo {
          font-size: 48px;
          font-weight: 300;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        
        .subtitle {
          font-size: 14px;
          color: #94a3b8;
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        
        .certificate-title {
          font-size: 32px;
          font-weight: 600;
          text-align: center;
          margin: 40px 0;
          color: ${resultData.score >= 50 ? "#3b82f6" : "#ef4444"};
        }
        
        .recipient {
          text-align: center;
          margin: 30px 0;
        }
        
        .recipient-label {
          font-size: 16px;
          color: #94a3b8;
          margin-bottom: 10px;
        }
        
        .recipient-name {
          font-size: 36px;
          font-weight: 700;
          color: white;
          border-bottom: 2px solid ${resultData.score >= 50 ? "#3b82f6" : "#ef4444"};
          display: inline-block;
          padding-bottom: 10px;
        }
        
        .score-section {
          text-align: center;
          margin: 50px 0;
          padding: 30px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          border: 1px solid ${resultData.score >= 50 ? "#3b82f6" : "#ef4444"};
        }
        
        .score {
          font-size: 72px;
          font-weight: 700;
          color: ${resultData.score >= 50 ? "#3b82f6" : "#ef4444"};
          margin-bottom: 10px;
        }
        
        .score-label {
          font-size: 18px;
          color: #94a3b8;
          margin-bottom: 20px;
        }
        
        .classification {
          font-size: 24px;
          font-weight: 600;
          color: white;
          background: ${resultData.score >= 50 ? "#3b82f6" : "#ef4444"};
          padding: 10px 20px;
          border-radius: 25px;
          display: inline-block;
        }
        
        .breakdown {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 40px 0;
        }
        
        .breakdown-item {
          background: rgba(0, 0, 0, 0.2);
          padding: 20px;
          border-radius: 10px;
          border-left: 4px solid ${resultData.score >= 50 ? "#3b82f6" : "#ef4444"};
        }
        
        .breakdown-label {
          font-size: 14px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        
        .breakdown-value {
          font-size: 24px;
          font-weight: 600;
          color: white;
        }
        
        .breakdown-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          margin-top: 10px;
          overflow: hidden;
        }
        
        .breakdown-fill {
          height: 100%;
          background: ${resultData.score >= 50 ? "#3b82f6" : "#ef4444"};
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .verdict {
          background: rgba(0, 0, 0, 0.4);
          padding: 30px;
          border-radius: 15px;
          margin: 40px 0;
          border-left: 5px solid ${resultData.score >= 50 ? "#3b82f6" : "#ef4444"};
        }
        
        .verdict-title {
          font-size: 20px;
          font-weight: 600;
          color: ${resultData.score >= 50 ? "#3b82f6" : "#ef4444"};
          margin-bottom: 15px;
        }
        
        .verdict-text {
          font-size: 16px;
          line-height: 1.6;
          color: #e2e8f0;
          font-style: italic;
        }
        
        .footer {
          text-align: center;
          margin-top: 50px;
          padding-top: 30px;
          border-top: 1px solid #334155;
        }
        
        .date {
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 10px;
        }
        
        .signature {
          font-size: 16px;
          color: #64748b;
        }
        
        .watermark {
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-size: 12px;
          color: #475569;
          opacity: 0.7;
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="content">
          <div class="header">
            <div class="logo">MusicIQ</div>
            <div class="subtitle">Neural Music Intelligence</div>
          </div>
          
          <div class="certificate-title">Official Musical Intelligence Certificate</div>
          
          <div class="recipient">
            <div class="recipient-label">This certifies that</div>
            <div class="recipient-name">${userName}</div>
          </div>
          
          <div class="score-section">
            <div class="score">${resultData.score}<span style="font-size: 36px;">/100</span></div>
            <div class="score-label">Musical Intelligence Quotient</div>
            <div class="classification">${resultData.title}</div>
          </div>
          
          <div class="breakdown">
            ${Object.entries(resultData.breakdown)
              .map(
                ([key, value]) => `
              <div class="breakdown-item">
                <div class="breakdown-label">${key.replace(/([A-Z])/g, " $1").toUpperCase()}</div>
                <div class="breakdown-value">${value}/10</div>
                <div class="breakdown-bar">
                  <div class="breakdown-fill" style="width: ${(value / 10) * 100}%"></div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
          
          <div class="verdict">
            <div class="verdict-title">Official AI Assessment</div>
            <div class="verdict-text">"${resultData.verdict}"</div>
          </div>
          
          <div class="footer">
            <div class="date">Certified on ${new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</div>
            <div class="signature">Authorized by MusicIQ Neural Networks</div>
          </div>
        </div>
        
        <div class="watermark">musiciq.ai</div>
      </div>
    </body>
    </html>
  `

  // Create a new window for printing/saving as PDF
  const printWindow = window.open("", "_blank")
  printWindow.document.write(certificateHTML)
  printWindow.document.close()

  // Wait for content to load then trigger print dialog
  setTimeout(() => {
    printWindow.print()
  }, 1000)

  // Also create a downloadable HTML file
  const blob = new Blob([certificateHTML], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `MusicIQ_Certificate_${userName.replace(/\s+/g, "_")}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
