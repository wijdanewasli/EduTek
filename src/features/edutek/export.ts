export async function downloadReport(title:string, lines:string[]) {
 const {jsPDF}=await import('jspdf');
 const doc=new jsPDF(); doc.setFontSize(22);doc.text('EduTek',20,22);doc.setFontSize(14);doc.text(title,20,38);doc.setFontSize(10);doc.text('Document de demonstration - donnees locales',20,49);
 lines.forEach((line,i)=>{if(i>0 && i%32===0)doc.addPage();doc.text(line,20,65+(i%32)*7)});
 doc.save(`${title.replace(/[^a-z0-9]/gi,'-')}.pdf`);
}
export function downloadCsv(name:string,rows:string[][]) { const csv='\uFEFF'+rows.map(r=>r.map(v=>'"'+v.replaceAll('"','""')+'"').join(';')).join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); const link=document.createElement('a');link.href=url;link.download=name+'.csv';link.click();URL.revokeObjectURL(url); }
