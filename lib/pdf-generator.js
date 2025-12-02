// Enhanced PDF generation with proper formatting
export const generateCertificatePDF = async (resultData, userName) => {
  // Create a more sophisticated certificate layout
  const certificateHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          background: #050505;
          color: white;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .certificate-container {
          padding: 40px;
          width: 100%;
          max-width: 1000px;
        }
        
        .certificate {
          background: #0a0a0c;
          border: 2px solid #333;
          border-radius: 30px;
          padding: 60px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 100px rgba(0,0,0,0.8);
        }

        /* Neon Border Effect */
        .certificate::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 30px;
          padding: 2px;
          background: linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.5;
        }
        
        /* Ambient Glow */
        .glow-orb {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.1;
          z-index: 0;
        }
        
        .orb-1 { top: -200px; left: -200px; background: #8b5cf6; }
        .orb-2 { bottom: -200px; right: -200px; background: #06b6d4; }
        
        .content {
          position: relative;
          z-index: 10;
          text-align: center;
        }
        
        .header {
          margin-bottom: 50px;
        }
        
        .logo {
          font-size: 64px;
          font-weight: 900;
          letter-spacing: -2px;
          background: linear-gradient(to right, #fff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
          text-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
        }
        
        .subtitle {
          font-size: 14px;
          color: #06b6d4;
          letter-spacing: 6px;
          text-transform: uppercase;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        
        .main-text {
          font-size: 24px;
          color: #94a3b8;
          font-weight: 300;
          margin-bottom: 20px;
        }
        
        .recipient-name {
          font-size: 56px;
          font-weight: 700;
          color: white;
          margin: 20px 0 50px;
          text-shadow: 0 0 20px rgba(255,255,255,0.2);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: inline-block;
          padding-bottom: 10px;
        }
        
        .score-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 40px;
        }
        
        .score-main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-right: 1px solid rgba(255,255,255,0.05);
        }
        
        .score-value {
          font-size: 96px;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(45deg, ${resultData.score >= 50 ? "#60a5fa, #8b5cf6" : "#f87171, #ef4444"});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        
        .score-label {
          font-size: 16px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .stats-list {
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 15px;
        }
        
        .stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .stat-label {
          color: #94a3b8;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .stat-bar-container {
          flex: 1;
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          margin: 0 15px;
          overflow: hidden;
        }
        
        .stat-bar {
          height: 100%;
          border-radius: 3px;
        }
        
        .stat-value {
          color: white;
          font-weight: 700;
          width: 30px;
          text-align: right;
        }
        
        .verdict-box {
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 50px;
        }
        
        .verdict-text {
          font-size: 20px;
          font-style: italic;
          color: #e2e8f0;
          font-weight: 300;
        }
        
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 30px;
        }
        
        .seal {
          width: 100px;
          height: 100px;
          border: 2px solid #06b6d4;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #06b6d4;
          font-weight: 900;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transform: rotate(-15deg);
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
          text-align: center;
        }
        
        .meta {
          text-align: right;
        }
        
        .date {
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .id {
          color: #475569;
          font-family: monospace;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="certificate-container">
        <div class="certificate">
          <div class="glow-orb orb-1"></div>
          <div class="glow-orb orb-2"></div>
          
          <div class="content">
            <div class="header">
              <div class="logo">MusicIQ</div>
              <div class="subtitle">Neural Music Intelligence</div>
            </div>
            
            <div class="main-text">This document certifies that the musical taste of</div>
            <div class="recipient-name">${userName}</div>
            <div class="main-text">has been analyzed by our advanced neural networks.</div>
            
            <div class="score-grid">
              <div class="score-main">
                <div class="score-value">${resultData.score}</div>
                <div class="score-label">Music IQ Score</div>
                <div style="margin-top: 10px; color: ${resultData.score >= 50 ? "#60a5fa" : "#f87171"}; font-weight: 600;">${resultData.title}</div>
              </div>
              
              <div class="stats-list">
                ${Object.entries(resultData.breakdown).map(([key, value]) => `
                  <div class="stat-row">
                    <div class="stat-label" style="width: 100px;">${key}</div>
                    <div class="stat-bar-container">
                      <div class="stat-bar" style="width: ${(value / 10) * 100}%; background: ${value >= 7 ? "#10b981" : value >= 4 ? "#f59e0b" : "#ef4444"};"></div>
                    </div>
                    <div class="stat-value">${value}</div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="verdict-box">
              <div class="verdict-text">"${resultData.verdict}"</div>
            </div>
            
            <div class="footer">
              <div class="seal">
                <div>
                  Official<br>Verified<br>Analysis
                </div>
              </div>
              <div class="meta">
                <div class="date">Certified on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                <div class="id">ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>
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
